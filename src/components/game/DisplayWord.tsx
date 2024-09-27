import { styled } from "@linaria/react";
import { useMemo } from "react";

import { Colors, BorderRadius, Border, Page, TypeStyles } from "@/styles/core";
import { Row, Column } from "@/styles/layout";
import { OverlineSmall, ScoreSmall } from "@/styles/typography";
import { formatBonus, MIN_LETTER_BONUS } from "@/utils/scoring";

const DisplayContainer = styled.div`
  width: 100%;
  max-width: ${Page.MAX_WIDTH};
  padding: 0 ${Page.PADDING_HORIZONTAL};
`;

const Display = styled(Column)`
  position: relative;
  gap: 12px;
  gap: 0;
  align-items: stretch;
  height: 80px;
  overflow: hidden;
  background: ${Colors.WHITE};
  border-radius: ${BorderRadius.MEDIUM};
  outline: ${Border.THIN};
`;

const WordRow = styled(Row)`
  flex: none;
  padding: 8px 12px;
`;

const Word = styled.div`
  ${TypeStyles.HEADLINE_2}
`;

const Label = styled.div<{ color: string }>`
  ${TypeStyles.OVERLINE_SMALL}
  display: inline-block;
  padding: 2px 4px;
  color: ${Colors.BLACK};
  background-color: ${({ color }) => color};
  border: ${Border.THIN};
  border-radius: ${BorderRadius.SMALL};
`;

const ScoreRow = styled(Row)`
  flex: auto;
  border-top: ${Border.THIN};
`;

const ScoreContainer = styled(Row)`
  flex: 1 1 auto;
  padding: 0 12px;
`;

const BonusContainer = styled(Row)`
  position: relative;
  flex: 0 0 150px;
  height: 100%;
  padding: 0 12px;
  background-color: ${Colors.GOLD_500};
  outline: ${Border.THIN};
`;

const BonusBarGraph = styled(Row)`
  position: absolute;
  top: -7px;
  left: 0;
  gap: 0;
  width: 100%;
  height: 6px;
  overflow: hidden;
  background-color: ${Colors.GOLD_500};
  border-radius: 1000px 0 0;
  outline: ${Border.THIN};
`;

const BonusBarGraphItem = styled.div<{ active: boolean }>`
  flex: 1;
  height: 100%;
  background-color: ${({ active }) =>
    active ? Colors.GOLD_600 : Colors.BLACK};
  outline: ${Border.THIN};
  transition: background-color 0.2s ease-in-out;
`;

function DisplayWord({
  score,
  bonus,
  word,
  valid,
}: {
  score: number;
  bonus: number;
  word: string;
  valid: boolean;
}) {
  const bonusRatio = useMemo(() => {
    return (bonus - MIN_LETTER_BONUS) * 2;
  }, [bonus]);

  return (
    <DisplayContainer>
      <Display>
        <WordRow>
          <Word>{word}</Word>
          {valid ? (
            <Label color={Colors.GREEN_500}>Valid</Label>
          ) : (
            <Label color={Colors.RED_500}>Invalid</Label>
          )}
        </WordRow>

        <ScoreRow>
          <ScoreContainer>
            <OverlineSmall>Score</OverlineSmall>
            <ScoreSmall>{score}</ScoreSmall>
          </ScoreContainer>
          <BonusContainer>
            <BonusBarGraph>
              {Array.from({ length: 4 }).map((_, index) => (
                <BonusBarGraphItem key={index} active={index < bonusRatio} />
              ))}
            </BonusBarGraph>
            <OverlineSmall>Bonus</OverlineSmall>
            <ScoreSmall>{formatBonus(bonus)}</ScoreSmall>
          </BonusContainer>
        </ScoreRow>
      </Display>
    </DisplayContainer>
  );
}

export default DisplayWord;
