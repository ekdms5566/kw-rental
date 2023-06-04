import { useContext } from "react";
import LabCalendar from "../../../components/LabCalendar";
import LabPenalty from "../../../components/LabPenalty";
import LabReserveWrap from "../../../components/LabReserveWrap";
import { AuthContext } from "../../../context/Context";
import useTitle from "../../../hook/useTitle";
import useToggle from "../../../hook/useToggle";
import * as S from "./style";

export default function LabRentalSched() {
  const { isAuth } = useContext(AuthContext);
  const { Toggle, state, changeInitial } = useToggle();
  useTitle(isAuth ? '랩실 관리' : '랩실 대여 현황')

  return (
    <>
      {isAuth && (
        <S.OnOff>
          <S.SecTitle>대여 ON/OFF</S.SecTitle>
          <Toggle on="대여 가능" off="대여 불가" className="rental" />
        </S.OnOff>
      )}
      {isAuth && <S.SecTitle>대여 현황</S.SecTitle>}
      <S.Section isAuth={isAuth}>
        <LabCalendar />
        <LabReserveWrap />
      </S.Section>
      {
        isAuth &&
        <>
          <S.PenaltyTitle>페널티 관리</S.PenaltyTitle>
          <LabPenalty />
        </>
      }
    </>
  );
}
