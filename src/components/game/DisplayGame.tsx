import { styled } from "@linaria/react";

import Text from "@/components/text";
import { useStore } from "@/store";
import { BASE_TILE_COUNT } from "@/store/puzzle";
import { colors, border } from "@/styles/core";
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
  padding: 10px 0;
`;

const SectionScore = styled(Section)`
  flex: 1 1 auto;
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

function DisplayGame() {
  const score = useStore((state) => state.game.score);
  const tiles = useStore((state) => state.game.remainingTiles.length);

  return (
    <Display>
      <SectionScore>
        <Text style="overline">Score</Text>
        <Text style="score">{score}</Text>
      </SectionScore>

      <TileBarGraph>
        {Array.from({ length: BASE_TILE_COUNT }).map((_, index) => (
          <TileBarGraphItem key={index} selected={index >= tiles} />
        ))}
      </TileBarGraph>

      <SectionTiles>
        <Text style="overline">Tiles</Text>
        <Text style="scoreMedium">{tiles}</Text>
      </SectionTiles>
    </Display>
  );
}

export default DisplayGame;
