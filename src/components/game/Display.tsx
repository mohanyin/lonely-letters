import { styled } from "@linaria/react";

import { useGameStore } from "@/store/game";
import { Colors, TypeStyles, BorderRadius, Border } from "@/styles/core";
import { ROW, ROW_RIGHT } from "@/styles/layout";

const Header = styled.div`
  ${TypeStyles.OVERLINE}
  margin-bottom: 6px;
`;

const DisplayContainer = styled.div`
  background: ${Colors.WHITE};
  border: ${Border.THIN};
  border-radius: 0 0 ${BorderRadius.LARGE} ${BorderRadius.LARGE};
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
  display: inline-block;
  padding: 6px 16px;
  color: ${Colors.WHITE};
  background: ${Colors.BLACK};
  border-radius: ${BorderRadius.SMALL};
`;

const LettersRemainingRow = styled.div`
  ${ROW_RIGHT}
`;

const LettersRemaining = styled.div`
  display: inline-block;
  padding: 6px 32px;
  font-style: italic;
  border-top: ${Border.THIN};
  border-left: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE} 0 ${BorderRadius.LARGE};
`;

function Display() {
  const score = useGameStore((state) => state.score);
  const id = useGameStore((state) => state.id);
  const totalTilesCount = useGameStore((state) => state.totalTilesCount);
  const remainingTilesCount = useGameStore(
    (state) => state.remainingTiles.length,
  );

  return (
    <div>
      <Header>Puzzle {id} - 01/01/2024</Header>
      <DisplayContainer>
        <ScoreRow>
          <Score>{score}</Score>
          <TypeLabel>Score</TypeLabel>
        </ScoreRow>
        <LettersRemainingRow>
          <LettersRemaining>
            {remainingTilesCount} / {totalTilesCount} letters remaining
          </LettersRemaining>
        </LettersRemainingRow>
      </DisplayContainer>
    </div>
  );
}

export default Display;
