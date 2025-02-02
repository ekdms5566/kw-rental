import Button from "../../modules/Button";
import * as S from "./style";
import iconShowPw from "../../assets/icon-showPassword.svg";
import iconBlockPw from "../../assets/icon-blockPassword.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userLogin } from "../../api/api";

export default function Login() {
  const [showPw, setShowPw] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const isValid =
    !!watch("id") && !!watch("password") && !errors.id && !errors.password;

  const handleLogin = async () => {
    const data = {
      memberNumber: watch("id"),
      password: watch("password"),
    };

    const res = await userLogin(JSON.stringify(data));
    res === 200 && navigate("/equipment");
  };

  // 쿠키 있을 경우 자동으로 로그인 처리
  // useEffect(() => {
  //   (async () => {
  //     const res = await getUserClassNum();
  //     !!res?.memberNumber && navigate('/equipment')
  //   })();
  // }, [])

  return (
    <>
      <S.Wrap>
        <h2>로그인</h2>
        <S.Form onKeyPress={e => e.key === 'Enter' && handleLogin()}>
          <input autoFocus type="text" placeholder="학번(아이디)" {...register("id", { required : true })} />
          <input
            type={showPw ? "password" : "text"}
            placeholder="비밀번호"
            {...register("password", { required : true })}
          />
          <S.PwImg
            bottom={showPw ? "16px" : "18px"}
            onClick={() => setShowPw(!showPw)}
            src={showPw ? iconBlockPw : iconShowPw}
            alt=""
          />
        </S.Form>
        <S.LoginDiv>
          {/* <S.CheckInp type="checkbox" id="check" /> */}
          {/* <label htmlFor="check">자동 로그인</label> */}
        </S.LoginDiv>
        <Button
          width="100%"
          text="로그인"
          className={isValid ? "main" : "gray"}
          padding="14px 0"
          borderRadius="10px"
          fontSize="16px"
          onClick={handleLogin}
        />
        <S.BtnDiv>
          <span onClick={() => navigate("/forgot")}>비밀번호 찾기</span>
          <span onClick={() => navigate("/signup")}>회원가입</span>
        </S.BtnDiv>
      </S.Wrap>
      <S.Policy>개인정보처리방침</S.Policy>
    </>
  );
}
