// import { styled } from "@linaria/react";
import { useEffect, useMemo, useState } from "react";

import DisplayGame from "@/components/game/DisplayGame";
import DisplayWord from "@/components/game/DisplayWord";
import { useStore, useIsSelecting, useSelectedWord } from "@/store";
import { checkWord } from "@/utils/dictionary";
import { getScore, calculateBonus } from "@/utils/scoring";

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

  return isSelecting ? (
    <DisplayWord
      score={selectedScore}
      bonus={calculateBonus(selectedWord)}
      word={selectedWord}
      valid={isSelectedValid}
    />
  ) : (
    <DisplayGame score={score} tiles={remainingTilesCount} />
  );
}

export default Display;
