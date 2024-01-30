import { styled } from "@linaria/react";
import { useThrottle } from "@uidotdev/usehooks";
import { useCallback, useEffect, useState } from "react";

import GridSpot from "@/components/game/GridSpot";
import Tile from "@/components/game/Tile";
import { useGameStore } from "@/store/game";

const ROWS = 4;
const COLS = 4;

const GridStyles = styled.div`
  display: grid;
  grid-template-rows: repeat(${ROWS}, 1fr);
  grid-template-columns: repeat(${COLS}, 1fr);
  gap: 12px;
  user-select: none;
  touch-action: none;
`;

function Grid({
  highlight,
  onHighlight,
}: {
  highlight: { x: number; y: number } | null;
  onHighlight: (index: number | null) => void;
}) {
  const placeTile = useGameStore((state) => state.placeTile);
  const onTileTap = useGameStore((state) => state.onTileTap);
  const onTileSwipe = useGameStore((state) => state.onTileSwipe);
  const grid = useGameStore((state) => state.grid);
  const selectedTiles = useGameStore((state) => state.selectedTiles);
  const finishSelecting = useGameStore((state) => state.finishSelecting);
  const selectMode = useGameStore((state) => state.selectMode);
  const bonusTile = useGameStore((state) => state.bonusTiles[0]);
  const blockedTile = useGameStore((state) => state.blockedTiles[0]);

  const [highlightedSpot, setHighlightedSpot] = useState<number | null>(null);
  const debouncedHighlight = useThrottle(highlight, 30);

  const detectDragTarget = useCallback((position: { x: number; y: number }) => {
    const possibleHighlights = document.elementsFromPoint(
      position.x,
      position.y,
    );
    for (const el of possibleHighlights) {
      if (el instanceof HTMLElement && el.dataset.gridSpot) {
        const index = parseInt(el.dataset.gridSpot);
        return index;
      }
    }
    return null;
  }, []);

  useEffect(() => {
    if (!debouncedHighlight) {
      onHighlight(null);
      setHighlightedSpot(null);
      return;
    }

    const index = detectDragTarget(debouncedHighlight);
    onHighlight(index);
    setHighlightedSpot(index);
  }, [debouncedHighlight, detectDragTarget, onHighlight]);

  const addTileOnSwipe = useCallback(
    (event: React.TouchEvent) => {
      const index = detectDragTarget({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      });
      if (index !== null && grid[index] !== null) {
        onTileSwipe(index);
      }
    },
    [onTileSwipe, detectDragTarget, grid],
  );

  const tiles = [];
  for (let index = 0; index < ROWS * COLS; index++) {
    const letter = grid[index];
    if (!letter) {
      tiles.push(
        <GridSpot
          key={index}
          index={index}
          bonus={bonusTile === index}
          blocked={blockedTile === index}
          highlight={highlightedSpot === index}
          onClick={() => placeTile(index)}
        />,
      );
    } else {
      tiles.push(
        <Tile
          key={index}
          letter={letter}
          dataGridSpot={index}
          bonus={bonusTile === index}
          selected={selectedTiles.includes(index)}
          onClick={() => onTileTap(index)}
        />,
      );
    }
  }

  return (
    <GridStyles
      onTouchMove={addTileOnSwipe}
      onTouchEnd={() => {
        if (selectMode === "swipe") {
          finishSelecting();
        }
      }}
    >
      {...tiles}
    </GridStyles>
  );
}

export default Grid;
