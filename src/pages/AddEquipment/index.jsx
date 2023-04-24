import * as S from "./style"
import { Wrapper, DetailWrapper, SubTitle } from "../EquipmentDetail/style"
import Button from "../../modules/Button"
import IconFileImg from "../../assets/icon-fileImg.svg"
import DetailDescInput from "../../components/DetailDesc/DetailDescInput"
import ItemListWrap from "../../components/ItemListWrap"
import iconFileImgWhite from "../../assets/icon-fileImg-white.svg"
import Textarea from "../../modules/Textarea"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import Image from "../../modules/Image"
import { addEquipment, getProductDetail, postImage, getItemList, modifyEquipment } from "../../api/api"
import useModal from "../../hook/useModal"
import useToggle from "../../hook/useToggle"

export default function AddEquipment() {
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()
  const [isEdit, setIsEdit] = useState(false)
  const [product, setProduct] = useState(null)
  const [imgFile, setImgFile] = useState('')
  const [imgPreview, setImgPreview] = useState('')
  const [item, setItem] = useState(null)
  const { Modal, open, close } = useModal()
  const addEqRef = useRef([])
  const { Toggle, state } = useToggle()
  const [data, setData] = useState([])

  const handleGetProduct = async (id) => {
    const response = await getProductDetail(id);
    const responseId = await getItemList(id);

    setProduct(response)
    setItem(responseId)

    setIsEdit(true)
  }

  const handleImgFile = async e => {
    const image = e.target.files[0]
    setImgPreview(URL.createObjectURL(image));

    const formData = new FormData()
    formData.append('file', image);

    const response = await postImage(formData)
    setImgFile(response)
  }

  const handleAddEquipment = async () => {
    const sendData = {
       equipment : { 
        imgUrl: imgFile, 
        totalQuantity: data.length
      }, "items": data
    }

    
    //  수정수정수정
    console.log(sendData);
    addEqRef.current.map(eq => sendData.equipment[eq.name] = eq.value)

    const response = await addEquipment(JSON.stringify(sendData));
    response && navigate(`/equipment/${response.split("/")[3]}`)
  }

  const handleModifyItems = async () => {
    const sendData = {
      "items" : data
    }

    const response = await modifyEquipment(JSON.stringify(sendData));
    response === 204 && navigate(`/equipment/${params.id}`)
  }
    
  useEffect(() => {
    if (location.pathname.includes('edit')) handleGetProduct(params.id)
  }, [])

  return (
    <Wrapper>
      {
        isEdit ? <></> :
          <S.Div>
            <Toggle on='기자재' off='소모품' />
          </S.Div>
      }
      <DetailWrapper>
        {
          isEdit || imgPreview ?
            <>
              <Image width="300px" height="300px" borderRadius={props => props.theme.borderRadius.lv2} src={product?.imgUrl ?? imgPreview} alt="" />
              <S.FileBtn>
                <img src={iconFileImgWhite} alt="" />
                <p>사진 변경</p>
                <input type="file" accept="image/*" onChange={handleImgFile}/>
              </S.FileBtn>
            </>
            : <S.FileLabel>
              <img src={IconFileImg} alt="" />
              <p>사진 추가</p>
              <input type="file" accept="image/*" onChange={handleImgFile} />
          </S.FileLabel>
        }
        <DetailDescInput itemLength={data.length} product={product} ref={addEqRef} />
      </DetailWrapper>
      <SubTitle>안내사항</SubTitle>
      <Textarea maxLen="500" className="detailDesc" placeholder="안내사항을 작성해주세요." name="description" id="" rows="6" count="500" defaultValue={product?.description} ref={el => addEqRef.current[7] = el} />
      {
        state || item ? 
          isEdit ?
            <>
              <SubTitle>품목 수정 및 추가</SubTitle>
              { item ? <ItemListWrap data={data} setData={setData} item={item.items} isEdit={isEdit} isAdd={false} /> : <></> }
            </>
            :
            <>
              <SubTitle>품목관리</SubTitle>
              <ItemListWrap data={data} setData={setData}
                // item={[{ id: null, propertyNumber: null }]}
                isEdit={isEdit} isAdd={true} />
            </>
          : <></>
      }

      <S.BtnWrap>
        <Button onClick={isEdit ? handleModifyItems : handleAddEquipment} className="main" text={isEdit ? "저장하기" : "기자재 추가"} padding="15px 31px" borderRadius="10px" fontSize="15px" margin="0 13px 0 0"/>
        <Button className="sub" text="취소하기" padding="15px 31px" borderRadius="10px" fontSize="15px" onClick={open}/>
      </S.BtnWrap>
      <Modal>
        <p>작성중인 내용이 있습니다. 나가시겠습니까?</p>
        <div>
          <Button text='취소' className='sub' padding="11px 30px" borderRadius="5px" fontSize="14px" onClick={close} />
          <Button text='나가기'className='main' padding="11px 24px" borderRadius="5px" fontSize="14px" onClick={() => navigate('/equipment')} />
        </div>
      </Modal>
    </Wrapper>
  )
}
