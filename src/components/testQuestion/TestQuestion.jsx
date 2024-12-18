import React from "react";
import * as S from "./styled";
import { BottomBtn } from "@components/common/button/BottomBtn";
export const TestQuestion = ({
  currentQuestion,
  selectedAnswer,
  handleAnswerSelect,
  handleNextQuestion,
  TEST_QUESTION,
  isAnswerinCorrect, //정답이 맞는지-접속자
  isAnswerSelected, //선택되었는지 - 소유자
}) => {
  return (
    <S.Container>
      <S.TestQuestionWrapper>
        <div>{TEST_QUESTION[currentQuestion].Num}/10</div>
        <div>{TEST_QUESTION[currentQuestion].Question}</div>
      </S.TestQuestionWrapper>
      <S.AnswerContainer>
        {TEST_QUESTION[currentQuestion].Ans.map((answer, index) => {
          return (
            <S.AnswerBox
              key={index}
              onClick={() => handleAnswerSelect(index)}
              $isSelected={selectedAnswer[currentQuestion] === index}
              $isAnswerinCorrect={isAnswerinCorrect} // 정답 여부 처리
            >
              {answer}
            </S.AnswerBox>
          );
        })}
      </S.AnswerContainer>
      <BottomBtn disabled={!isAnswerSelected} onClick={handleNextQuestion}>
        {TEST_QUESTION[currentQuestion].Num === 10 ? "완료하기" : "다음으로"}
      </BottomBtn>
    </S.Container>
  );
};
