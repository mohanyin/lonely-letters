import { styled } from "@linaria/react";
import { useThrottle } from "@uidotdev/usehooks";
import { useCallback, useEffect, useMemo, useState } from "react";

import GridSpot from "@/components/game/GridSpot";
import Tile from "@/components/game/Tile";
import { useStore } from "@/store";
import { colors } from "@/styles/core";

const ROWS = 4;
const COLS = 4;

const GridContainer = styled.div`
  position: relative;
  width: 100%;
`;

const GridStyles = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: repeat(${ROWS}, 1fr);
  grid-template-columns: repeat(${COLS}, 1fr);
  gap: 12px;
  user-select: none;
  touch-action: none;
`;

const VerticalGridStripes = styled.div`
  position: absolute;
  z-index: 0;
  display: grid;
  grid-template-rows: repeat(${ROWS - 1}, 1fr);
  grid-template-columns: repeat(${COLS}, 1fr);
  gap: 12px;
  inset: ${100 / ROWS / 2}% 0;
`;

const VerticalGridStripe = styled.div<{ active: boolean }>`
  background: ${({ active }) => (active ? colors.black : "transparent")};
  transform: ${({ active }) => (active ? "scaleX(1)" : "scaleX(0.5)")};
  transition:
    background 0.1s ease-in-out,
    transform 0.2s ease-in-out;
`;

const HorizontalGridStripes = styled.div`
  position: absolute;
  z-index: 0;
  display: grid;
  grid-template-rows: repeat(${ROWS}, 1fr);
  grid-template-columns: repeat(${COLS - 1}, 1fr);
  gap: 12px;
  inset: 0 ${100 / COLS / 2}%;
`;

const HorizontalGridStripe = styled.div<{ active: boolean }>`
  background: ${({ active }) => (active ? colors.black : "transparent")};
  transform: ${({ active }) => (active ? "scaleY(1)" : "scaleY(0.5)")};
  transition:
    background 0.1s ease-in-out,
    transform 0.2s ease-in-out;
`;

function Grid({
  highlight,
  onHighlight,
}: {
  highlight: { x: number; y: number } | null;
  onHighlight: (index: number | null) => void;
}) {
  const placeTile = useStore((state) => state.placeTile);
  const onTileTap = useStore((state) => state.onTileTap);
  const onTileSwipe = useStore((state) => state.onTileSwipe);
  const grid = useStore((state) => state.game!.grid);
  const selectedIndices = useStore((state) => state.selectedIndices);
  const bonusTile = useStore((state) => state.puzzle.bonusTiles[0]);
  const blockedTile = useStore((state) => state.puzzle.blockedTiles[0]);

  const [highlightedSpot, setHighlightedSpot] = useState<number | null>(null);
  const debouncedHighlight = useThrottle(highlight, 30);

  const [initializedCount, setInitializedCount] = useState(0);
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    setTimeout(() => {
      intervalId = setInterval(() => {
        setInitializedCount((count) => {
          if (count >= ROWS * COLS) {
            clearInterval(intervalId);
            return count;
          }
          return count + 1;
        });
      }, 175);
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const activeVerticalStripes = useMemo(() => {
    const stripes = [];
    for (let i = 0; i < selectedIndices.length - 1; i++) {
      const start = selectedIndices[i];
      const end = selectedIndices[i + 1];
      if (start % COLS === end % COLS) {
        const col = start % COLS;
        const row = Math.min(Math.floor(start / COLS), Math.floor(end / COLS));
        stripes.push(COLS * row + col);
      }
    }
    return stripes;
  }, [selectedIndices]);

  const activeHorizontalStripes = useMemo(() => {
    const stripes = [];
    for (let i = 0; i < selectedIndices.length - 1; i++) {
      const start = selectedIndices[i];
      const end = selectedIndices[i + 1];
      if (Math.floor(start / ROWS) === Math.floor(end / ROWS)) {
        const col = Math.min(start % COLS, end % COLS);
        const row = Math.floor(start / COLS);
        stripes.push((COLS - 1) * row + col);
      }
    }
    return stripes;
  }, [selectedIndices]);

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
          initialized={initializedCount > index}
          onClick={() => placeTile(index)}
        />,
      );
    } else {
      tiles.push(
        <Tile
          key={index}
          letter={letter}
          data-grid-spot={index}
          bonus={bonusTile === index}
          selected={selectedIndices.includes(index)}
          onClick={() => onTileTap(index)}
        />,
      );
    }
  }

  return (
    <GridContainer>
      <VerticalGridStripes>
        {[...Array((ROWS - 1) * COLS)].map((_, i) => (
          <VerticalGridStripe
            key={i}
            active={activeVerticalStripes.includes(i)}
          />
        ))}
      </VerticalGridStripes>
      <HorizontalGridStripes>
        {[...Array(ROWS * (COLS - 1))].map((_, i) => (
          <HorizontalGridStripe
            key={i}
            active={activeHorizontalStripes.includes(i)}
          />
        ))}
      </HorizontalGridStripes>
      <GridStyles onTouchMove={addTileOnSwipe}>{...tiles}</GridStyles>
    </GridContainer>
  );
}

export default Grid;
