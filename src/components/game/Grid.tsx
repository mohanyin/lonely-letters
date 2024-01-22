import { styled } from "@linaria/react";

import Tile from "@/components/game/Tile";
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
  const selectTile = useGameStore((state) => state.selectTile);
  const grid = useGameStore((state) => state.grid);
  const selectedTiles = useGameStore((state) => state.selectedTiles);

  const tiles = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const index = r * 4 + c;
      const letter = grid[index];
      if (!letter) {
        tiles.push(<GridSpot onClick={() => placeTile(index)} />);
      } else {
        tiles.push(
          <Tile
            letter={letter}
            selected={selectedTiles.includes(index)}
            onClick={() => selectTile(index)}
          />,
        );
      }
    }
  }

  return <GridStyles>{...tiles}</GridStyles>;
}

export default Grid;
