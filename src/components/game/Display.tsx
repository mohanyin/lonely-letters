import { styled } from "@linaria/react";
import { useEffect, useMemo, useState } from "react";

import DisplayBase from "@/components/game/DisplayBase";
import DisplaySecondaryRow from "@/components/game/DisplaySecondaryRow";
import { useStore, useIsSelecting, useSelectedWord } from "@/store";
import { Border, Colors, TypeStyles } from "@/styles/core";
import { checkWord } from "@/utils/dictionary";
import {
  formatBonus,
  getScore,
  calculateBonus,
  MAX_LETTER_BONUS,
  MIN_LETTER_BONUS,
} from "@/utils/scoring";

const Score = styled.h2`
  ${TypeStyles.SCORE}
  display: flex;
  gap: 12px;
  align-items: center;
  white-space: nowrap;
`;

const Word = styled.h2`
  ${TypeStyles.HEADLINE_3}
  margin-bottom: 6px;
  padding-bottom: 6px;
  white-space: nowrap;
  border-bottom: ${Border.THIN};
`;

const WordScore = styled.div`
  ${TypeStyles.SCORE_SMALL}
  color: ${Colors.BLACK};
  white-space: nowrap;
`;

function Display() {
  const [isSelectedValid, setIsSelectedValid] = useState(false);

  const score = useStore((state) => state.game.score);
  const selectedIndices = useStore((state) => state.selectedIndices);
  const bonusTile = useStore((state) => state.puzzle.bonusTiles[0]);
  const selectedWord = useSelectedWord();
  const selectedPoints = useMemo(() => {
    const bonusIndex = selectedIndices.indexOf(bonusTile);
    return getScore(selectedWord, bonusIndex);
  }, [selectedWord, selectedIndices, bonusTile]);

  useEffect(() => {
    checkWord(selectedWord).then((isValid) => setIsSelectedValid(isValid));
  }, [selectedWord]);

  const isSelecting = useIsSelecting();

  const totalTilesCount = useStore((state) => state.puzzle?.numTiles ?? 0);
  const remainingTilesCount = useStore(
    (state) => state.game.remainingTiles.length,
  );

  const remainingLabel = useMemo(() => {
    return `${remainingTilesCount} / ${totalTilesCount} letters remaining`;
  }, [remainingTilesCount, totalTilesCount]);
  const remainingRatio = remainingTilesCount / totalTilesCount;

  const bonusLabel = `${formatBonus(selectedWord)} bonus`;
  const bonusRatio = useMemo(() => {
    const bonus = calculateBonus(selectedWord);
    return (bonus - MIN_LETTER_BONUS) / (MAX_LETTER_BONUS - MIN_LETTER_BONUS);
  }, [selectedWord]);

  return isSelecting ? (
    <DisplayBase
      color={isSelectedValid ? Colors.GOLD : Colors.RED}
      label={isSelectedValid ? "Valid" : "Invalid"}
      secondary={
        <DisplaySecondaryRow
          color={Colors.GOLD}
          label={bonusLabel}
          ratio={bonusRatio}
        />
      }
    >
      <div>
        <Word>{selectedWord}</Word>
        <WordScore>{selectedPoints} pts</WordScore>
      </div>
    </DisplayBase>
  ) : (
    <DisplayBase
      label="Score"
      secondary={
        <DisplaySecondaryRow
          label={remainingLabel}
          ratio={1 - remainingRatio}
        />
      }
    >
      <Score>{score}</Score>
    </DisplayBase>
  );
}

export default Display;
