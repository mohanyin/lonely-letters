import { styled } from "@linaria/react";
import { useMemo } from "react";

import { useGameStore } from "@/store/game";
import { Colors, TypeStyles, BorderRadius, Border } from "@/styles/core";
import { ROW, ROW_RIGHT } from "@/styles/layout";
import { formatBonus } from "@/utils/scoring";

const DisplayContainer = styled.div<{ isSelecting?: boolean }>`
  position: relative;
  background: ${({ isSelecting }) =>
    !isSelecting ? Colors.WHITE : Colors.GOLD};
  border: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE} 0 ${BorderRadius.LARGE};
`;

const ScoreRow = styled.div`
  ${ROW}
  height: 72px;
  padding: 0 16px;
`;

const Score = styled.h2`
  ${TypeStyles.SCORE}
`;

const Bonus = styled.h2`
  ${TypeStyles.SCORE}
  font-size: 2em;
`;

const BonusLength = styled.div`
  ${TypeStyles.OVERLINE}
  margin-bottom: 4px;
  color: ${Colors.BLACK};
`;

const TypeLabel = styled.div<{ isSelecting?: boolean }>`
  ${TypeStyles.OVERLINE}
  display: inline-block;
  padding: 6px 16px;
  color: ${({ isSelecting }) => (!isSelecting ? Colors.WHITE : Colors.GOLD)};
  background: ${Colors.BLACK};
  border-radius: ${BorderRadius.SMALL};
`;

const LettersRemainingRow = styled.div`
  ${ROW_RIGHT}
`;

const LettersRemaining = styled.div<{ inverse?: boolean; absolute?: boolean }>`
  position: ${({ absolute }) => (absolute ? "absolute" : "relative")};
  right: 0;
  bottom: 0;
  display: inline-block;
  padding: 6px 32px;
  color: ${({ inverse }) => (inverse ? Colors.WHITE : Colors.BLACK)};
  font-style: italic;
  white-space: nowrap;
  background: ${({ inverse }) => (inverse ? Colors.BLACK : Colors.WHITE)};
  border-top: ${Border.THIN};
  border-left: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE} 0 ${BorderRadius.LARGE};
`;

const LettersRemainingOverlay = styled.div<{ width?: string }>`
  position: absolute;
  right: 0;
  bottom: 0;
  width: ${({ width }) => width ?? "100%"};
  height: 100%;
  overflow: hidden;
`;

function Display() {
  const score = useGameStore((state) => state.score);
  const totalTilesCount = useGameStore((state) => state.totalTilesCount);
  const remainingTilesCount = useGameStore(
    (state) => state.remainingTiles.length,
  );
  const selectedTiles = useGameStore((state) => state.selectedTiles);

  const isSelecting = useMemo(() => {
    return selectedTiles.length > 0;
  }, [selectedTiles]);

  const bonusPercentage = useMemo(() => {
    return formatBonus(selectedTiles);
  }, [selectedTiles]);

  return (
    <div>
      <DisplayContainer isSelecting={isSelecting}>
        {isSelecting ? (
          <ScoreRow>
            <div>
              <BonusLength>{selectedTiles.length} letter word</BonusLength>
              <Bonus>{bonusPercentage}</Bonus>
            </div>
            <TypeLabel isSelecting={isSelecting}>Bonus</TypeLabel>
          </ScoreRow>
        ) : (
          <ScoreRow>
            <Score>{score}</Score>
            <TypeLabel>Score</TypeLabel>
          </ScoreRow>
        )}
        <LettersRemainingRow>
          <LettersRemaining>
            {remainingTilesCount} / {totalTilesCount} letters remaining
            <LettersRemainingOverlay
              aria-hidden
              width={`${(remainingTilesCount / totalTilesCount) * 100}%`}
            >
              <LettersRemaining inverse absolute>
                {remainingTilesCount} / {totalTilesCount} letters remaining
              </LettersRemaining>
            </LettersRemainingOverlay>
          </LettersRemaining>
        </LettersRemainingRow>
      </DisplayContainer>
    </div>
  );
}

export default Display;
