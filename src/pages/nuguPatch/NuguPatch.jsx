import * as S from "./styled";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Layout } from "@components/common/layout/Layout";
import { ProgressBar } from "@components/progressBar/ProgreesBar";
import { SIGN_UP_FIELDS } from "@constants/signUp";
import { Input } from "@components/input/Input";
import { theme } from "@styles/theme";
import { signUpState } from "@atoms/signUpState";
import { usePatchChip } from "./_hooks/usePatchChip";
import { Chip } from "@components/chip/Chip";
import { CHIP_DATA } from "@constants/chip";
import { Button } from "@components/common/button/Button";
import { useNuguPatch } from "./_hooks/useNuguPatch";
import { getNugu } from "@apis/nuguPatch";
export const NuguPatch = () => {
  const [updateData, setUpdateData] = useRecoilState(signUpState);
  const { handleSubmit, isFormValid } = useNuguPatch();
  const { selectedChip, handleClickStatus, selectedCount } = usePatchChip();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getNugu();
        setUpdateData(userData);
      } catch (err) {
        console.error("Patch-user정보 가져오기 실패", err);
      }
    };

    fetchUserData();
  }, [setUpdateData]);

  const handleInputChange = (name, value) => {
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Layout
      $backgroundColor={"gray200"}
      $margin="0 0 0 0"
      $justifyContent="start"
    >
      <S.PatchWrapper>
        <S.TopWrapper>
          <ProgressBar title={"누구 수정하기"} $now={4} $total={4} />
          {[...SIGN_UP_FIELDS[1], ...SIGN_UP_FIELDS[2]].map((data, index) => (
            <Input
              title={data.title}
              key={index}
              value={updateData[data.name] || ""}
              onChange={(e) => handleInputChange(data.name, e.target.value)}
              type={data.type}
            />
          ))}

          <S.TitleWrapper>
            <S.Title>나를 표현하는 키워드</S.Title>
            <S.SubTitle>나와 어울리는 키워드 3개를 선택해주세요</S.SubTitle>
            <S.ChipWrapper>
              {CHIP_DATA.map((text, index) => (
                <Chip
                  key={index}
                  $index={index}
                  onClick={() => handleClickStatus(index)}
                  $backgroundColor={
                    selectedChip[index] ? theme.colors.blue200 : "white"
                  }
                >
                  {text}
                </Chip>
              ))}
            </S.ChipWrapper>
          </S.TitleWrapper>
        </S.TopWrapper>
        <Button
          disabled={selectedCount !== 3 || !isFormValid()}
          onClick={handleSubmit}
        >
          저장하기
        </Button>
      </S.PatchWrapper>
    </Layout>
  );
};
