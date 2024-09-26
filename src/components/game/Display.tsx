import { styled } from "@linaria/react";
import { useEffect, useMemo, useState } from "react";

import DisplayBarGraph from "@/components/game/DisplayBarGraph";
import DisplayBase from "@/components/game/DisplayBase";
import { useStore, useIsSelecting, useSelectedWord } from "@/store";
import {
  Border,
  BorderRadius,
  Colors,
  Overline,
  TypeStyles,
} from "@/styles/core";
import { Center } from "@/styles/layout";
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
  white-space: nowrap;
`;

const SecondaryRowItem = styled(Center)<{
  color?: string;
}>`
  ${TypeStyles.OVERLINE}
  flex: 0 0 35%;
  padding: 0 6px;
  white-space: nowrap;
  background-color: ${({ color }) => color ?? Colors.WHITE};
  border-top: ${Border.THIN};
  border-right: ${Border.THIN};
  transition: background-color 0.2s;
`;

const SecondaryRowItemScore = styled(SecondaryRowItem)`
  ${TypeStyles.SCORE_SMALL}
`;

const Label = styled.div<{ color: string }>`
  ${TypeStyles.OVERLINE}
  display: inline-block;
  padding: 6px;
  color: ${Colors.BLACK};
  background-color: ${({ color }) => color};
  border: ${Border.THIN};
  border-radius: ${BorderRadius.SMALL};
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
    return `${remainingTilesCount} tiles left`;
  }, [remainingTilesCount]);
  const remainingRatio = remainingTilesCount / totalTilesCount;

  const bonusLabel = `${formatBonus(selectedWord)} bonus`;
  const bonusRatio = useMemo(() => {
    const bonus = calculateBonus(selectedWord);
    return (bonus - MIN_LETTER_BONUS) / (MAX_LETTER_BONUS - MIN_LETTER_BONUS);
  }, [selectedWord]);

  return isSelecting ? (
    <DisplayBase
      main={[
        <Word key="word">{selectedWord}</Word>,
        <Label
          key="valid"
          color={isSelectedValid ? Colors.GREEN_500 : Colors.RED_500}
        >
          {isSelectedValid ? "Valid" : "Invalid"}
        </Label>,
      ]}
      secondary={[
        <SecondaryRowItemScore key="score" color={Colors.GOLD_500}>
          {selectedPoints} pts
        </SecondaryRowItemScore>,
        <DisplayBarGraph
          key="bar"
          color={Colors.GOLD_500}
          label={bonusLabel}
          ratio={bonusRatio}
        />,
      ]}
    />
  ) : (
    <DisplayBase
      main={[
        <Score key="score">{score}</Score>,
        <Overline key="label">score</Overline>,
      ]}
      secondary={[
        <SecondaryRowItem key="placeholder" color={Colors.GREEN_500} />,
        <DisplayBarGraph
          key="bar"
          label={remainingLabel}
          ratio={1 - remainingRatio}
        />,
      ]}
    />
  );
}

export default Display;
