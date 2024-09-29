import { styled } from "@linaria/react";
import { useEffect, useMemo, useState } from "react";

import Text from "@/components/text";
import { useSelectedWord, useStore } from "@/store";
import { colors, borderRadius, border, type } from "@/styles/core";
import display from "@/styles/display";
import { Row, Column } from "@/styles/layout";
import { checkWord } from "@/utils/dictionary";
import {
  calculateBonus,
  formatBonus,
  getScore,
  MIN_LETTER_BONUS,
} from "@/utils/scoring";

const Display = styled(Column)`
  ${display.baseStyles}
  gap: 0;
  align-items: stretch;
`;

const WordRow = styled(Row)`
  flex: none;
  padding: 8px 12px;
`;

const Word = styled.div`
  ${type.headline2}
`;

const Label = styled.div<{ color: string }>`
  ${type.overlineSmall}
  display: inline-block;
  padding: 2px 4px;
  color: ${colors.black};
  background-color: ${({ color }) => color};
  border: ${border.thin};
  border-radius: ${borderRadius.small};
`;

const ScoreRow = styled(Row)`
  flex: auto;
  border-top: ${border.thin};
`;

const ScoreContainer = styled(Row)`
  flex: 1 1 auto;
  padding: 0 12px;
`;

const BonusContainer = styled(Row)`
  position: relative;
  flex: 0 0 180px;
  height: 100%;
  padding: 0 12px;
  background-color: ${colors.gold500};
  outline: ${border.thin};
`;

const BonusBarGraph = styled(Row)`
  position: absolute;
  top: -7px;
  left: 0;
  gap: 0;
  width: 100%;
  height: 6px;
  overflow: hidden;
  border-radius: 1000px 0 0;
  outline: ${border.thin};
`;

const BonusBarGraphItem = styled.div<{ active: boolean }>`
  flex: 1;
  height: 100%;
  background-color: ${({ active }) => (active ? colors.gold500 : colors.black)};
  outline: ${border.thin};
  transition: background-color 0.2s ease-in-out;
`;

function DisplayWord() {
  const [isValid, setIsValid] = useState(false);

  const selectedIndices = useStore((state) => state.selectedIndices);
  const bonusTile = useStore((state) => state.puzzle.bonusTiles[0]);
  const selectedWord = useSelectedWord();
  const score = useMemo(() => {
    const bonusIndex = selectedIndices.indexOf(bonusTile);
    return getScore(selectedWord, bonusIndex);
  }, [selectedWord, selectedIndices, bonusTile]);
  const bonus = useMemo(() => {
    return calculateBonus(selectedWord);
  }, [selectedWord]);

  useEffect(() => {
    checkWord(selectedWord).then((isValid) => setIsValid(isValid));
  }, [selectedWord]);

  const bonusRatio = useMemo(() => {
    return (bonus - MIN_LETTER_BONUS) * 2;
  }, [bonus]);

  return (
    <Display>
      <WordRow>
        <Word>{selectedWord ?? "&nbsp;"}</Word>
        {isValid ? (
          <Label color={colors.green500}>Valid</Label>
        ) : (
          <Label color={colors.red500}>Invalid</Label>
        )}
      </WordRow>

      <ScoreRow>
        <ScoreContainer>
          <Text style="overlineSmall">Score</Text>
          <Text style="scoreSmall">{score}</Text>
        </ScoreContainer>
        <BonusContainer>
          <BonusBarGraph>
            {Array.from({ length: 4 }).map((_, index) => (
              <BonusBarGraphItem key={index} active={index < bonusRatio} />
            ))}
          </BonusBarGraph>
          <Text style="overlineSmall">Bonus</Text>
          <Text style="scoreSmall">{formatBonus(bonus)}</Text>
        </BonusContainer>
      </ScoreRow>
    </Display>
  );
}

export default DisplayWord;
