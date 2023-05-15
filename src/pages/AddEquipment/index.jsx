import * as S from "./style";
import { Wrapper, DetailWrapper, SubTitle } from "../EquipmentDetail/style";
import Button from "../../modules/Button";
import IconFileImg from "../../assets/icon-fileImg.svg";
import DetailDescInput from "../../components/DetailDesc/DetailDescInput";
import ItemListWrap from "../../components/ItemListWrap";
import iconFileImgWhite from "../../assets/icon-fileImg-white.svg";
import Textarea from "../../modules/Textarea";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Image from "../../modules/Image";
import {
  addEquipment,
  getProductDetail,
  postImage,
  modifyEquipment,
  changeItems,
} from "../../api/api";
import useModal from "../../hook/useModal";
import useToggle from "../../hook/useToggle";
import { useDispatch, useSelector } from "react-redux";
import { resetEquip } from "../../store/reducer/modifyEquipSlice";

export default function AddEquipment() {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [imgFile, setImgFile] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const { Modal, open, close } = useModal();
  const addEqRef = useRef([]);
  const { Toggle, state } = useToggle();
  const [data, setData] = useState([]);
  const product = useSelector((state) => state.modifyEquip.equip);
  const item = useSelector((state) => state.modifyEquip.itemList);
  const dispatch = useDispatch();

  const handleGetProduct = async (id) => {
    const response = await getProductDetail(id);

    setImgFile(response.imgUrl);
    setIsEdit(true);
  };

  const handleImgFile = async (e) => {
    const image = e.target.files[0];
    setImgPreview(URL.createObjectURL(image));

    const formData = new FormData();
    formData.append("file", image);

    const response = await postImage(formData);
    setImgFile(response);
  };

  const handleAddEquipment = async () => {
    // description과 purpose components는 빈값이어도 된다. -> 수정
    // if(addEqRef.current.filter(eq => eq.value === '' || eq.value === 'default').length) alert('빈 값이 있습니다.')
    // else {
    const item = [];
    data.map((i) => item.push({ propertyNumber: i.propertyNumber }));

    const sendData = {
      equipment: {
        imgUrl: imgFile,
      },
      items: item,
    };

    addEqRef.current.map((eq) => (sendData.equipment[eq.name] = eq.value));
    if (state) sendData.equipment.totalQuantity = data.length;

    const response = await addEquipment(JSON.stringify(sendData));
    response && navigate(`/${response.split("/")[3]}`);
    // }
  };

  const handleModifyEquipment = async () => {
    // if (addEqRef.current.filter(eq => eq.value === '').length) alert('빈 값이 있습니다.')
    // else {
    const sendItem = [];
    data.map((i) =>
      sendItem.push({
        id: i.id,
        propertyNumber: i.propertyNumber,
      })
    );

    const itemData = {
      items: sendItem,
    };

    const sendData = {
      imgUrl: imgFile,
      totalQuantity: data.length,
    };

    addEqRef.current.map((eq) => (sendData[eq.name] = eq.value));

    if (
      !item.items.every((item) =>
        itemData.items.some(
          (otherItem) => otherItem.propertyNumber === item.propertyNumber
        )
      )
    ) {
      const itemRes = await changeItems(params.id, JSON.stringify(itemData));
      const eqRes = await modifyEquipment(params.id, JSON.stringify(sendData));

      itemRes === 204 && eqRes && navigate(`/${eqRes.split("/")[3]}`);
    } else {
      const eqRes = await modifyEquipment(params.id, JSON.stringify(sendData));
      eqRes && navigate(`/${eqRes.split("/")[3]}`);
    }
    // }
  };

  useEffect(() => {
    if (location.pathname.includes("edit")) handleGetProduct(params.id);
    else if (location.pathname.includes("add")) dispatch(resetEquip());
  }, []);

  return (
    <Wrapper>
      {isEdit ? (
        <></>
      ) : (
        <S.Div>
          <Toggle on="기자재" off="소모품" />
        </S.Div>
      )}
      <DetailWrapper>
        {isEdit || imgPreview ? (
          <>
            <Image
              width="300px"
              height="300px"
              borderRadius={(props) => props.theme.borderRadius.lv2}
              src={imgPreview || product?.imgUrl}
              alt=""
            />
            <S.FileBtn>
              <img src={iconFileImgWhite} alt="" />
              <p>사진 변경</p>
              <input type="file" accept="image/*" onChange={handleImgFile} />
            </S.FileBtn>
          </>
        ) : (
          <S.FileLabel>
            <img src={IconFileImg} alt="" />
            <p>사진 추가</p>
            <input type="file" accept="image/*" onChange={handleImgFile} />
          </S.FileLabel>
        )}
        <DetailDescInput
          state={state}
          isEdit={isEdit}
          itemLength={data.length}
          product={product}
          ref={addEqRef}
        />
      </DetailWrapper>
      <SubTitle>안내사항</SubTitle>
      <Textarea
        maxLen="500"
        className="detailDesc"
        placeholder="안내사항을 작성해주세요."
        name="description"
        id=""
        rows="6"
        count="500"
        defaultValue={product?.description}
        ref={(el) => (addEqRef.current[7] = el)}
      />
      {state && item ? (
        isEdit ? (
          <>
            <SubTitle>품목 추가 및 삭제</SubTitle>
            {item ? (
              <ItemListWrap
                data={data}
                setData={setData}
                item={item.items}
                isEdit={isEdit}
                isAdd={false}
              />
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <SubTitle>품목관리</SubTitle>
            <ItemListWrap
              data={data}
              setData={setData}
              isEdit={isEdit}
              isAdd={true}
            />
          </>
        )
      ) : (
        <></>
      )}

      <S.BtnWrap>
        <Button
          onClick={isEdit ? handleModifyEquipment : handleAddEquipment}
          className="main"
          text={isEdit ? "저장하기" : "기자재 추가"}
          padding="15px 31px"
          borderRadius="10px"
          fontSize="15px"
          margin="0 13px 0 0"
        />
        <Button
          className="sub"
          text="취소하기"
          padding="15px 31px"
          borderRadius="10px"
          fontSize="15px"
          onClick={open}
        />
      </S.BtnWrap>
      <Modal>
        <p>작성중인 내용이 있습니다. 나가시겠습니까?</p>
        <div>
          <Button
            text="취소"
            className="sub"
            padding="11px 30px"
            borderRadius="5px"
            fontSize="14px"
            onClick={close}
          />
          <Button
            text="나가기"
            className="main"
            padding="11px 24px"
            borderRadius="5px"
            fontSize="14px"
            onClick={() => {
              navigate("/");
              close();
            }}
          />
        </div>
      </Modal>
    </Wrapper>
  );
}
