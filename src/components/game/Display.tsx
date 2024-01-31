import { styled } from "@linaria/react";
import { useMemo } from "react";

import DisplayBase from "@/components/game/DisplayBase";
import { useStore, useIsSelecting } from "@/store";
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
  const score = useStore((state) => state.game.score);
  const selectedIndices = useStore((state) => state.selectedIndices);

  const isSelecting = useIsSelecting();
  const bonusPercentage = useMemo(() => {
    return formatBonus(selectedIndices);
  }, [selectedIndices]);

  return isSelecting ? (
    <DisplayBase color={Colors.GOLD} label="Bonus">
      <div>
        <BonusLength>{selectedIndices.length} letter word</BonusLength>
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
