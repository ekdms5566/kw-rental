import ListItem from "./ListItem";
import { ListLi } from "./ListItem/style";
import * as S from "./style";

export default function EquipCartList({ cartList }) {
  return (
    cartList && (
      <S.ListUl>
        <ListLi>
          <p>사진</p>
          <p>기자재</p>
          <p>개수</p>
          <p>수령일</p>
          <p>반납일</p>
          <p> </p>
        </ListLi>
        {cartList.map((cart) => (
          <ListItem
            cart={cart}
            key={cart.id}
          />
        ))}
      </S.ListUl>
    )
  );
}
