import dayjs from "dayjs";
import { useEffect, useLayoutEffect, useState } from "react";
import iconCalendar from "../../../assets/icon-calendar.svg";
import DatePicker from "..";
import * as S from "./style";
import { useDispatch } from "react-redux";
import { setSingularDate } from "../../../store/reducer/datePickerSlice";

export default function SingularDatePicker({ initial, className }) {
  const [calendar, setCalendar] = useState({
    visible: false,
    top: 0,
    left: 0,
    date: dayjs().add(initial || 0, "days"),
  });

  const dispatch = useDispatch();

  const handleGetDatePicker = (e) => {
    const position = e.target.getBoundingClientRect();
    const top = position.top + position.height,
      left = position.left;
    setCalendar((prev) => ({
      ...prev,
      visible: true,
      top: top,
      left: left,
    }));
  };

  const handleSetMon = (num) => {
    setCalendar((prev) => ({
      ...prev,
      date: prev.date.add(num, "days"),
    }));
  };

  useLayoutEffect(() => {
    switch (calendar.date.day()) {
      case 5:
        handleSetMon(3);
        break;
      case 6:
        handleSetMon(2);
        break;
      case 0:
        handleSetMon(1);
        break;
      default:
        break;
    }
  }, []);


  useEffect(() => {
    dispatch(setSingularDate(dayjs(calendar.date).format("YYYY-MM-DD")));
  }, [calendar.date]);

  useEffect(() => {
    let date;

    switch (dayjs().day()) {
      case 5:
        date = dayjs().add(3, 'days')
        break;
      case 6:
        date = dayjs().add(2, 'days')
        break;
      case 0:
        date = dayjs().add(1, 'days')
        break;
      default:
        date = dayjs()
        break;
    }

    return () => {
      dispatch(setSingularDate(date.format("YYYY-MM-DD")));
    }
  }, []);

  return (
    <>
      <S.DateCont onClick={handleGetDatePicker}>
        <img src={iconCalendar} alt="" />
        <span>{calendar.date.format("M월 D일(dd)")}</span>
      </S.DateCont>
      {calendar && (
        <DatePicker
          className={className || "user"}
          initial={initial}
          calendar={calendar}
          setCalendar={setCalendar}
        />
      )}
    </>
  );
}
