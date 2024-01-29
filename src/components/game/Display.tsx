import { styled } from "@linaria/react";
import { useMemo } from "react";

import DisplayBase from "@/components/game/DisplayBase";
import { useGameStore } from "@/store/game";
import { Colors, TypeStyles } from "@/styles/core";
import { formatBonus } from "@/utils/scoring";

const Score = styled.h2`
  ${TypeStyles.SCORE}
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ScoreDot = styled.div`
  width: 8px;
  height: 8px;
  background: ${Colors.BLACK};
  border-radius: 8px;
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

function Display() {
  const score = useGameStore((state) => state.score);
  const selectedTiles = useGameStore((state) => state.selectedTiles);

  const isSelecting = useMemo(() => {
    return selectedTiles.length > 0;
  }, [selectedTiles]);

  const bonusPercentage = useMemo(() => {
    return formatBonus(selectedTiles);
  }, [selectedTiles]);

  return isSelecting ? (
    <DisplayBase color={Colors.GOLD} label="Bonus">
      <div>
        <BonusLength>{selectedTiles.length} letter word</BonusLength>
        <Bonus>{bonusPercentage}</Bonus>
      </div>
    </DisplayBase>
  ) : (
    <DisplayBase color={Colors.WHITE} label="Score">
      <Score>
        <ScoreDot /> {score} <ScoreDot />
      </Score>
    </DisplayBase>
  );
}

export default Display;
