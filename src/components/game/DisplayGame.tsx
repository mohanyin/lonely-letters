import { styled } from "@linaria/react";
import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

import Text from "@/components/text";
import { useStore } from "@/store";
import { BASE_TILE_COUNT } from "@/store/puzzle";
import { colors, border, type } from "@/styles/core";
import display from "@/styles/display";
import { Column, Row } from "@/styles/layout";

const Display = styled(Row)`
  ${display.baseStyles}
  gap: 12px;
  align-items: stretch;
  padding: 0 12px;
`;
const Section = styled(Column)`
  gap: 0;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px 0;
`;

const SectionScore = styled(Section)`
  flex: 1 1 auto;
`;

const Score = styled(NumberFlow)`
  ${type.score}
  --number-flow-char-height: 0.75;
  --number-flow-mask-height: 0.25em;

  margin: -0.25em 0;
`;

const SectionTiles = styled(Section)`
  flex: none;
  width: 64px;
`;

const TileBarGraph = styled(Column)`
  flex-direction: column-reverse;
  gap: 0;
  width: 8px;
  height: 100%;
  background: ${colors.black};
  outline: ${border.thin};
`;

const TileBarGraphItem = styled.div<{ selected: boolean }>`
  flex: 1 1 auto;
  width: 100%;
  background: ${({ selected }) => (selected ? colors.black : colors.green500)};
  outline: ${border.thin};
  transition: background 0.2s ease-in-out;
`;

const Tiles = styled(NumberFlow)`
  ${type.scoreMedium}

  --number-flow-char-height: 0.75;
  --number-flow-mask-height: 0.25em;

  margin: -0.25em 0;
`;

function DisplayGame() {
  const score = useStore((state) => state.game.score);
  const tiles = useStore((state) => state.game.remainingTiles.length);

  // Delay the score update to let slide transition complete
  const [delayedScore, setDelayedScore] = useState(score);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDelayedScore(score);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [score]);

  return (
    <Display>
      <SectionScore>
        <Text style="overline">Score</Text>
        <Score continuous value={delayedScore} />
      </SectionScore>

      <TileBarGraph>
        {Array.from({ length: BASE_TILE_COUNT }).map((_, index) => (
          <TileBarGraphItem key={index} selected={index >= tiles} />
        ))}
      </TileBarGraph>

      <SectionTiles>
        <Text style="overline">Tiles</Text>
        <Tiles continuous value={tiles} />
      </SectionTiles>
    </Display>
  );
}

export default DisplayGame;
