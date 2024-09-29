import { css, cx } from "@linaria/core";
import { styled } from "@linaria/react";
import { useEffect, useMemo, useState } from "react";

import DisplayGame from "@/components/game/DisplayGame";
import DisplayWord from "@/components/game/DisplayWord";
import { useStore, useIsSelecting, useSelectedWord } from "@/store";
import { border, borderRadius, colors, page } from "@/styles/core";
import { Column } from "@/styles/layout";
import { checkWord } from "@/utils/dictionary";
import { getScore, calculateBonus } from "@/utils/scoring";

const Container = styled.div`
  width: 100%;
  max-width: ${page.maxWidth};
  padding: 0 ${page.paddingHorizontal};
`;

const Wrapper = styled.div`
  height: 80px;
  overflow: hidden;
  background: ${colors.green600};
  border: ${border.thin};
  border-top-width: 2px;
  border-radius: ${borderRadius.medium};
`;

const animation = `
  @keyframes slide-up {
    0% {
      transform: translateY(0%) scale(1);
    }

    15% {
      transform: translateY(0) scale(0.95);
    }

    85% {
      transform: translateY(-92px) scale(0.95);
    }

    100% {
      transform: translateY(-92px) scale(1);
    }
  }
`;

const slideUp = css`
  ${animation}
  animation: slide-up 0.5s ease-in-out forwards;
`;

const slideDown = css`
  ${animation}
  animation: slide-up 0.5s ease-in-out reverse;
`;

const Track = styled(Column)`
  gap: 12px;
  align-items: stretch;
`;

function Display() {
  const [isSelectedValid, setIsSelectedValid] = useState(false);

  const score = useStore((state) => state.game.score);
  const selectedIndices = useStore((state) => state.selectedIndices);
  const bonusTile = useStore((state) => state.puzzle.bonusTiles[0]);
  const selectedWord = useSelectedWord();
  const selectedScore = useMemo(() => {
    const bonusIndex = selectedIndices.indexOf(bonusTile);
    return getScore(selectedWord, bonusIndex);
  }, [selectedWord, selectedIndices, bonusTile]);

  const remainingTilesCount = useStore(
    (state) => state.game.remainingTiles.length,
  );

  useEffect(() => {
    checkWord(selectedWord).then((isValid) => setIsSelectedValid(isValid));
  }, [selectedWord]);

  const isSelecting = useIsSelecting();

  return (
    <Container>
      <Wrapper>
        <Track className={cx(animation, isSelecting ? slideUp : slideDown)}>
          <DisplayGame score={score} tiles={remainingTilesCount} />

          <DisplayWord
            score={selectedScore}
            bonus={calculateBonus(selectedWord)}
            word={selectedWord}
            valid={isSelectedValid}
          />
        </Track>
      </Wrapper>
    </Container>
  );
}

export default Display;
