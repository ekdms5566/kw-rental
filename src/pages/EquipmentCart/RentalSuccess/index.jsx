import { useLocation, useNavigate } from "react-router-dom";
import iconCheck from "../../../assets/icon-check-fill.svg";
import useTitle from "../../../hook/useTitle";
import Button from "../../../modules/Button";
import * as S from "./style";

export default function RentalSuccess() {
  const navigate = useNavigate();
  const location = useLocation()
  useTitle(`${location.pathname.includes('lab')? '랩실' : '기자재'} 대여 완료`)

  return (
    <S.Div>
      <img src={iconCheck} alt="" />
      <p>대여 완료</p>
      <p>{location.pathname.includes('lab') ? 
      '랩실' : '기자재'} 대여가 완료되었습니다.</p>
      <div>
        <Button
          text="내 대여정보로 이동"
          onClick={() => navigate(location.pathname.includes('lab') ? "/history/lab" : "/history/equipment")}
          className="main"
          borderRadius="10px"
          padding="16px 16px"
        />
        <Button
          text="목록 보기"
          onClick={() => navigate(location.pathname.includes('lab') ? "/lab/status" : "/equipment")}
          className="sub"
          borderRadius="10px"
          padding="16px 37px"
        />
      </div>
    </S.Div>
  );
}
