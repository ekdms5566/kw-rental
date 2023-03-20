import * as S from "./style"
import iconSearch from "../../assets/icon-search.svg"
import iconCalendar from "../../assets/icon-calendar.svg"
import iconGalOn from "../../assets/icon-gal-on.svg"
import iconGal from "../../assets/icon-gal.svg"
import iconListOn from "../../assets/icon-list-on.svg"
import iconList from "../../assets/icon-list.svg"
import Button from "../../modules/Button"
import EquipListWrap from "../../components/EquipListWrap"
import iconPageArrow from "../../assets/icon-pageArrow.svg"
import { useState } from "react"

// 임시 데이터
const data = [
  {
    "id": 7,
    "category": "CAMERA",
    "maker": "sony",
    "modelName": "modelName",
    "rentalQuantity": {
        "totalQuantity": 2,
        "remainingQuantity": 1
    },
    "imgUrl": "https://cdn.pixabay.com/photo/2018/01/28/21/14/lens-3114729_1280.jpg"
  },
  {
      "id": 5,
      "category": "CAMERA",
      "maker": "sony",
      "modelName": "modelName",
      "rentalQuantity": {
          "totalQuantity": 2,
          "remainingQuantity": 1
      },
      "imgUrl": "https://cdn.pixabay.com/photo/2018/01/28/21/14/lens-3114729_1280.jpg"
  },
  {
      "id": 6,
      "category": "CAMERA",
      "maker": "sony",
      "modelName": "modelName",
      "rentalQuantity": {
          "totalQuantity": 2,
          "remainingQuantity": 1
      },
      "imgUrl": "https://cdn.pixabay.com/photo/2018/01/28/21/14/lens-3114729_1280.jpg"
  },
  {
      "id": 62,
      "category": "CAMERA",
      "maker": "sony",
      "modelName": "modelName",
      "rentalQuantity": {
          "totalQuantity": 2,
          "remainingQuantity": 1
      },
      "imgUrl": "https://cdn.pixabay.com/photo/2018/01/28/21/14/lens-3114729_1280.jpg"
  },
  {
      "id": 6232,
      "category": "CAMERA",
      "maker": "sony",
      "modelName": "modelName",
      "rentalQuantity": {
          "totalQuantity": 2,
          "remainingQuantity": 1
      },
      "imgUrl": "https://cdn.pixabay.com/photo/2018/01/28/21/14/lens-3114729_1280.jpg"
  },
  {
      "id": 12,
      "category": "CAMERA",
      "maker": "sony",
      "modelName": "modelName",
      "rentalQuantity": {
          "totalQuantity": 2,
          "remainingQuantity": 1
      },
      "imgUrl": "https://cdn.pixabay.com/photo/2018/01/28/21/14/lens-3114729_1280.jpg"
  }
]

export default function EquipmentList() {
  const [viewMode, setViewMode] = useState('gal')

  const handleNextDay = (days) => {
    let today = new Date();
    today.setDate(today.getDate() + days)
    return today.toISOString().split('T')[0];
  }
  
  return (
    <S.Wrapper>
      <S.FilterWrap>
        <S.FilterWrap>
          <S.SearchCont>
            <S.SearchInp type="text" placeholder="카테고리, 기자재 명을 입력해주세요."/>
            <S.SearchImg src={iconSearch} alt="" />
          </S.SearchCont>
          <S.DateCont>
            <img src={iconCalendar} alt="" />
            <span>3월 12일(화)</span>
            <S.DateInp type="date"
              min={handleNextDay(1)}
              max={handleNextDay(31)}
            />
          </S.DateCont>
        </S.FilterWrap>

        <S.FilterWrap>
          <S.TypeBtn onClick={() => setViewMode('gal')}>
            <img src={viewMode==='gal' ? iconGalOn : iconGal} alt="" />
          </S.TypeBtn>
          <S.TypeBtn onClick={() => setViewMode('list')}>
            <img src={viewMode==='list' ? iconListOn : iconList} alt="" />
          </S.TypeBtn>
        </S.FilterWrap>
      </S.FilterWrap>

      <S.FilterWrap className="mode">
        <Button className="main shadow" text="전체" padding="10px 21px" borderRadius="20px" />
        <Button className="disable shadow" text="카메라" padding="10px 21px" borderRadius="20px"/>
        <Button className="disable shadow" text="녹음 장비" padding="10px 21px" borderRadius="20px"/>
        <Button className="disable shadow" text="촬영보조 장비" padding="10px 21px" borderRadius="20px"/>
        <Button className="disable shadow" text="VR 장비" padding="10px 21px" borderRadius="20px" />
        <Button className="disable shadow" text="기타" padding="10px 21px" borderRadius="20px"/>
      </S.FilterWrap>

      <EquipListWrap type={viewMode} data={data} />

      <S.PageBtnWrap>
        <button>
          <img src={iconPageArrow} alt="이전 페이지" />
        </button>
        <button className="on">1</button>
        <button>2</button>
        <button>
          <img src={iconPageArrow} alt="다음 페이지" />
        </button>
      </S.PageBtnWrap>
      
    </S.Wrapper>
  )
}
