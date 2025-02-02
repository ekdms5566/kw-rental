import Button from "../../modules/Button";
import * as S from "./style";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addCartEquip, getProductAmountFromDate } from "../../api/api";
import useModal from "../../hook/useModal";
import { useSelector } from "react-redux";
import DualDatePicker from "../DatePicker/DualDatePicker";
import dayjs from "dayjs";

export default function AddCartEquip({ modify, setModal }) {
  const amountRef = useRef();
  const navigate = useNavigate();
  const params = useParams();
  const { Modal, open, close } = useModal();
  const productCount = useSelector(
    (state) => state.modifyEquip.equip.totalQuantity
    );
  const selectDate = useSelector((state) => state.datePicker.dualDate);
  const [rentalAmount, setRentalAmount] = useState(productCount)

  const handleGetProductAmount = async () => {
    const id = params.id 
    const res = await getProductAmountFromDate(id, selectDate.firstDate, dayjs(selectDate.firstDate).add(1, 'days').format('YYYY-MM-DD'))
    res.remainQuantities.length && setRentalAmount(res.remainQuantities[0].remainQuantity);
  }

  const handleAddCart = async () => {
    const data = {
      equipmentId: parseInt(params.id),
      rentalStartDate: selectDate.firstDate.split("-").map((i) => parseInt(i)),
      rentalEndDate: selectDate.lastDate.split("-").map((i) => parseInt(i)),
      amount: parseInt(amountRef.current.value),
    };

    const response = await addCartEquip(JSON.stringify(data));
    response.includes("/inventories") && open();
  };

  useEffect(() => {
    if (selectDate.firstDate) handleGetProductAmount()
  }, [selectDate])

  return (
    <S.Wrapper>
      <S.Form>
        <S.DescCont>기자재 수령일 ~ 반납일</S.DescCont>
        <S.InpWrapper>
          <DualDatePicker
            firstInitial={1}
            lastInitial={2}
            className="user"
          />
        </S.InpWrapper>
        <S.DescCont>대여 기자재 개수</S.DescCont>
        <S.InpWrapper>
        {
            rentalAmount ?
              <>
                <S.Select name="equipCount" id="" ref={amountRef}>
                  {Array(rentalAmount)
                    .fill()
                    .map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                </S.Select> 대
              </>
              : <S.WarnDesc>대여 가능 수량이 0개입니다.</S.WarnDesc>
            }
        </S.InpWrapper>
      </S.Form>
      <Button
        onClick={handleAddCart}
        className="main"
        text="기자재 담기"
        padding="15px 23px"
        borderRadius="10px"
        fontSize="15px"
        margin="0 13px 0 0"
      />
      <Button
        onClick={() => navigate(-1)}
        className="sub"
        text="뒤로 가기"
        padding="15px 23px"
        borderRadius="10px"
        fontSize="15px"
      />
      <Modal>
        <p>기자재가 ‘담은 기자재’에 담겼습니다.</p>
        <Button
          text="담은 기자재 페이지로 이동하기 >"
          borderRadius="5px"
          padding="10px 16px"
          className="main"
          margin="0 0 10px 0"
          onClick={() => {
            close();
            navigate("/equipment/inventory");
          }}
        />
      </Modal>
    </S.Wrapper>
  );
}
