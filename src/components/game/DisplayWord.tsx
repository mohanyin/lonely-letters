import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import NumberFlow from "@number-flow/react";
import { useEffect, useMemo, useState } from "react";

import Text from "@/components/text";
import { useSelectedWord, useStore } from "@/store";
import { colors, borderRadius, border, type } from "@/styles/core";
import display from "@/styles/display";
import { Row, Column } from "@/styles/layout";
import { checkWord } from "@/utils/dictionary";
import { calculateBonus, getScore, MIN_LETTER_BONUS } from "@/utils/scoring";

const Display = styled(Column)`
  ${display.baseStyles}
  gap: 0;
  align-items: stretch;
`;

const WordRow = styled(Row)`
  flex: none;
  padding: 12px 8px 8px 12px;
`;

const Word = styled.div`
  ${type.headline2}
`;

const Label = styled.div<{ color: string }>`
  ${type.overlineSmall}
  display: inline-block;
  margin-top: -8px;
  padding: 4px;
  color: ${colors.black};
  background-color: ${({ color }) => color};
  border: ${border.thin};
  border-radius: ${borderRadius.small};
`;

const ScoreRow = styled(Row)`
  flex: auto;
  gap: 0;
  border-top: ${border.thin};
`;

const ScoreContainer = styled(Row)`
  flex: 1 1 auto;
  padding: 0 12px;
`;

const shake = css`
  animation: shake 0.5s linear infinite;

  @keyframes shake {
    0% {
      transform: scale(1) translate(0, 0) rotate(0deg);
    }

    10% {
      transform: scale(0.97) translate(-2px, 1px) rotate(-3deg);
    }

    20% {
      transform: scale(1.02) translate(2px, -2px) rotate(2deg);
    }

    30% {
      transform: scale(0.97) translate(-1px, 2px) rotate(-3deg);
    }

    40% {
      transform: scale(1.06) translate(1px, -1px) rotate(2deg);
    }

    50% {
      transform: scale(0.96) translate(-2px, -2px) rotate(-3deg);
    }

    60% {
      transform: scale(1.03) translate(1px, 2px) rotate(2deg);
    }

    70% {
      transform: scale(0.99) translate(-2px, -2px) rotate(-2deg);
    }

    80% {
      transform: scale(1.01) translate(2px, 1px) rotate(1deg);
    }

    100% {
      transform: scale(1) translate(0, 0) rotate(0deg);
    }
  }
`;

const ScoreNumberFlow = styled(NumberFlow)<{ scale?: number }>`
  ${type.scoreSmall}

  transform: scale(${({ scale }) => scale ?? 1});
  transform-origin: right;
  transition: transform 0.1s ease;
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

  const scoreScale = useMemo(() => {
    if (score < 10) {
      return 1;
    } else if (score < 20) {
      return 1.2;
    } else if (score < 30) {
      return 1.4;
    }
    return 1.6;
  }, [score]);

  const shakeScore = useMemo(() => {
    return score >= 30;
  }, [score]);

  const bonusScale = useMemo(() => {
    if (bonus < 2) {
      return 1;
    } else if (bonus < 3) {
      return 1.2;
    } else if (bonus < 3.5) {
      return 1.4;
    }
    return 1.6;
  }, [bonus]);

  const shakeBonus = useMemo(() => {
    return bonus >= 2.5;
  }, [bonus]);

  return (
    <Display>
      <WordRow>
        <Word>{selectedWord || "\u00A0"}</Word>
        {isValid ? (
          <Label color={colors.green500}>Valid</Label>
        ) : (
          <Label color={colors.red500}>Invalid</Label>
        )}
      </WordRow>

      <ScoreRow>
        <ScoreContainer>
          <Text style="overlineSmall">Score</Text>
          <div className={shakeScore ? shake : ""}>
            <ScoreNumberFlow continuous scale={scoreScale} value={score} />
          </div>
        </ScoreContainer>
        <BonusContainer>
          <BonusBarGraph>
            {Array.from({ length: 4 }).map((_, index) => (
              <BonusBarGraphItem key={index} active={index < bonusRatio} />
            ))}
          </BonusBarGraph>
          <Text style="overlineSmall">Bonus</Text>
          <div className={shakeBonus ? shake : ""}>
            <ScoreNumberFlow
              continuous
              format={{ style: "percent" }}
              scale={bonusScale}
              value={bonus - 1}
            />
          </div>
        </BonusContainer>
      </ScoreRow>
    </Display>
  );
}

export default DisplayWord;
