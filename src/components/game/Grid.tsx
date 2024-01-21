import { styled } from "@linaria/react";

import { useGameStore } from "@/store/game";
import { Border, BorderRadius, Colors } from "@/styles/core";

const ROWS = 4;
const COLS = 4;

const GridStyles = styled.div`
  display: grid;
  grid-template-rows: repeat(${ROWS}, 1fr);
  grid-template-columns: repeat(${COLS}, 1fr);
  gap: 12px;
`;

const GridSpot = styled.button`
  background: ${Colors.GREEN_600};
  border: ${Border.THIN};
  border-top-width: 4px;
  border-radius: ${BorderRadius.LARGE};
  aspect-ratio: 1;
`;

function Grid() {
  const placeTile = useGameStore((state) => state.placeTile);
  const grid = useGameStore((state) => state.grid);

  const tiles = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const index = r * 4 + c;
      tiles.push(
        <GridSpot onClick={() => placeTile(index)}>{grid[index]}</GridSpot>,
      );
    }
  }

  return <GridStyles>{...tiles}</GridStyles>;
}

export default Grid;
