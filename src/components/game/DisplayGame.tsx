import { styled } from "@linaria/react";

import { BASE_TILE_COUNT } from "@/store/puzzle";
import { Colors, BorderRadius, Border, Page, TypeStyles } from "@/styles/core";
import { ROW, Column } from "@/styles/layout";

const DisplayContainer = styled.div`
  width: 100%;
  max-width: ${Page.MAX_WIDTH};
  padding: 0 ${Page.PADDING_HORIZONTAL};
`;

const Display = styled.div`
  ${ROW}
  position: relative;
  gap: 12px;
  align-items: stretch;
  height: 80px;
  padding: 0 12px;
  overflow: hidden;
  background: ${Colors.WHITE};
  border-radius: ${BorderRadius.MEDIUM};
  outline: ${Border.THIN};
`;

const Label = styled.h3`
  ${TypeStyles.OVERLINE}
`;

const Score = styled.div`
  ${TypeStyles.SCORE}
`;

const Tiles = styled.div`
  ${TypeStyles.SCORE_MEDIUM}
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
  background: ${Colors.BLACK};
  outline: ${Border.THIN};
`;

const TileBarGraphItem = styled.div<{ selected: boolean }>`
  flex: 1 1 auto;
  width: 100%;
  background: ${({ selected }) => (selected ? Colors.BLACK : Colors.GREEN_500)};
  outline: ${Border.THIN};
  transition: background 0.2s ease-in-out;
`;

function DisplayGame({ score, tiles }: { score: number; tiles: number }) {
  return (
    <DisplayContainer>
      <Display>
        <SectionScore>
          <Label>Score</Label>
          <Score>{score}</Score>
        </SectionScore>

        <TileBarGraph>
          {Array.from({ length: BASE_TILE_COUNT }).map((_, index) => (
            <TileBarGraphItem key={index} selected={index > tiles} />
          ))}
        </TileBarGraph>

        <SectionTiles>
          <Label>Tiles</Label>
          <Tiles>{tiles}</Tiles>
        </SectionTiles>
      </Display>
    </DisplayContainer>
  );
}

export default DisplayGame;
