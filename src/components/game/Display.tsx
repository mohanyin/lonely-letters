import { useState } from "react";
import { styled } from "@linaria/react";
import { Colors, TypeStyles, BorderRadius, Border } from "@/styles/core";
import { ROW, ROW_RIGHT } from "@/styles/layout";

const Header = styled.div`
  ${TypeStyles.OVERLINE}
  margin-bottom: 6px;
`;

const DisplayContainer = styled.div`
  border: ${Border.THIN};
  border-radius: 0 0 ${BorderRadius.LARGE} ${BorderRadius.LARGE};
  background: ${Colors.WHITE};
`;

const ScoreRow = styled.div`
  ${ROW}
  height: 72px;
  padding: 0 16px;
`;

const Score = styled.h2`
  ${TypeStyles.SCORE}
`;

const TypeLabel = styled.div`
  ${TypeStyles.OVERLINE}
  color: ${Colors.WHITE};
  background: ${Colors.BLACK};
  border-radius: ${BorderRadius.SMALL};
  padding: 6px 16px;
  display: inline-block;
`;

const LettersRemainingRow = styled.div`
  ${ROW_RIGHT}
`;

const LettersRemaining = styled.div`
  display: inline-block;
  font-style: italic;
  border-top: ${Border.THIN};
  border-left: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE} 0 ${BorderRadius.LARGE} 0;
  padding: 6px 32px;
`;

function Display() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header>Puzzle ### - 01/01/2024</Header>
      <DisplayContainer>
        <ScoreRow>
          <Score>32,355</Score>
          <TypeLabel>Score</TypeLabel>
        </ScoreRow>
        <LettersRemainingRow>
          <LettersRemaining>XX / XX letters remaining</LettersRemaining>
        </LettersRemainingRow>
      </DisplayContainer>
    </div>
  );
}

export default Display;
