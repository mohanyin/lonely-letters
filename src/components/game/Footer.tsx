import { styled } from "@linaria/react";
import { useCallback, useEffect, useMemo, useState } from "react";

import DoneFooter from "@/components/game/DoneFooter";
import SelectedFooter from "@/components/game/SelectedFooter";
import Tile from "@/components/game/Tile";
import TileFooter from "@/components/game/TileFooter";
import Text from "@/components/text";
import { useStore, useIsSelecting } from "@/store";
import { border, borderRadius, colors } from "@/styles/core";
import { Column } from "@/styles/layout";

interface Position {
  x: number;
  y: number;
}

const FooterStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
  height: 140px;
`;

const ControlContainer = styled.div`
  display: grid;
  grid-column: 2 / 5;
  gap: 12px;
  align-items: center;
  height: 140px;
  overflow: hidden;
  background: ${colors.green600};
  border: ${border.thin};
  border-top-width: 4px;
  border-radius: ${borderRadius.large};
`;

const animationDistance = 140 + 12;
const Track = styled(Column)<{ slide: number }>`
  gap: 12px;
  height: 140px;
  margin: -4px -1px -1px;
  transform: translateY(${({ slide }) => slide * -1 * animationDistance}px);
  transition: transform 0.5s ease-in-out;
`;

const NextTile = styled(Tile)<{ dragging: boolean }>`
  transform: ${({ dragging }) => (dragging ? "translateX(25%)" : "none")};
  transition: transform 0.2s ease-in-out;
`;

export default function Footer({
  onDragStart,
  onDragMove,
  onDragEnd,
}: {
  onDragStart: (position: Position) => void;
  onDragMove: (position: Position) => void;
  onDragEnd: () => void;
}) {
  const remainingTiles = useStore((store) => store.game.remainingTiles);
  const isSelecting = useIsSelecting();
  const [isDragging, setIsDragging] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const _onDragStart = useCallback(
    (position: Position) => {
      setIsDragging(true);
      onDragStart(position);
    },
    [onDragStart],
  );

  const _onDragEnd = useCallback(() => {
    setIsDragging(false);
    onDragEnd();
  }, [onDragEnd]);

  useEffect(() => {
    setTimeout(() => {
      setIsInitialized(true);
    }, 1000);
  }, []);

  const slideIndex = useMemo(() => {
    if (!isInitialized) {
      return -1;
    } else if (isSelecting) {
      return 1;
    } else if (!remainingTiles[0]) {
      return 2;
    }
    return 0;
  }, [isInitialized, isSelecting, remainingTiles]);

  return (
    <FooterStyles>
      {remainingTiles[1] ? (
        <Column justify="center" padding="0 8px">
          <NextTile
            pending
            key={remainingTiles.length}
            dragging={!!isDragging}
            letter={remainingTiles[1]}
          />
          <Text style="overline">Next</Text>
        </Column>
      ) : null}

      <ControlContainer>
        <Track slide={slideIndex}>
          <TileFooter
            onDragStart={_onDragStart}
            onDragMove={onDragMove}
            onDragEnd={_onDragEnd}
          />
          <SelectedFooter />
          <DoneFooter />
        </Track>
        <div data-footer-append />
      </ControlContainer>
    </FooterStyles>
  );
}
