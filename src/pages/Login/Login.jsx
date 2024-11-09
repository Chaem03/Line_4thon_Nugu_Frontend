import * as S from "./styled";

import { Logo } from "@components/common/Logo/Logo";
import { Button } from "@components/common/button/button";
import { Input } from "@components/input/Input";
import { useForm } from "@hooks/useForm";
import { LoginState } from "@atoms/LoginState";

import NuguLogo from "@assets/small_logo.svg";
import StarNugu from "@assets/nugu-star.svg";
export const Login = () => {
  const { form, handleChange, isValid } = useForm(LoginState);

  const handleLogin = () => {
    console.log("버튼눌림");
  };
  return (
    <S.Wrapper>
      <Logo logo={NuguLogo} />
      <S.imgWrapper>
        <img src={StarNugu} alt="starnugu" />
        <S.BtnContainer>
          <Input
            title={"아이디"}
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder={"아이디를 입력해 주세요"}
          />
          <Input
            title={"비밀번호"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder={"비밀번호를 입력해 주세요"}
          />
        </S.BtnContainer>
        <Button disabled={!isValid} onClick={handleLogin}>
          로그인
        </Button>
      </S.imgWrapper>
    </S.Wrapper>
  );
};
