import { styled } from "@linaria/react";
import { useCallback, useState } from "react";

import DoneFooter from "@/components/game/DoneFooter";
import SelectedFooter from "@/components/game/SelectedFooter";
import Tile from "@/components/game/Tile";
import Text from "@/components/text";
import { useStore, useIsSelecting } from "@/store";
import { border, borderRadius, colors } from "@/styles/core";
import { Column } from "@/styles/layout";

interface Position {
  x: number;
  y: number;
}

const FooterStyles = styled.div<{ dragging: boolean }>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
`;

const MainTileContainer = styled.div`
  grid-column: 2 / 4;
  padding: 6% 12%;
  background: ${colors.gold600};
  border: ${border.thin};
  border-top-width: 4px;
  border-radius: ${borderRadius.large};
`;

const MainTile = styled(Tile)<{ dragging: boolean }>`
  transform: ${(props) => (props.dragging ? "scale(75%)" : "none")};
  opacity: ${(props) => (props.dragging ? "0" : "1")};
  transition:
    transform 0.2s ease-in-out,
    opacity 0.1s ease-in-out;
`;

function calculateDragTransform(location: Position | null) {
  return location ? `translate(${location.x}px, ${location.y}px)` : "none";
}
const DraggedMainTile = styled(Tile)<{
  dragging: boolean;
  location: Position | null;
}>`
  position: absolute;
  width: 20%;
  transform: ${({ location }) => calculateDragTransform(location)};
  opacity: ${({ dragging }) => (dragging ? "1" : "0")};
  pointer-events: none;
`;

const NextTile = styled(Tile)<{ dragging: boolean }>`
  transform: ${({ dragging }) => (dragging ? "translateX(25%)" : "none")};
  transition: transform 0.2s ease-in-out;
`;

function Footer({
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

  const [draggableBasePosition, setDraggableBasePosition] =
    useState<Position | null>(null);
  const [dragStart, setDragStart] = useState<Position | null>(null);
  const [dragLocation, setDragLocation] = useState<Position | null>(null);

  const handleTouchStart = useCallback(
    (event: React.TouchEvent) => {
      const position = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
      onDragStart(position);

      const draggable = document.querySelector(
        "[data-draggable=main-tile]",
      ) as HTMLElement;
      const draggableBounds = draggable.getBoundingClientRect();
      const draggableBasePosition = {
        x: draggableBounds.left + draggableBounds.width / 2,
        y: draggableBounds.top + draggableBounds.height / 2,
      };
      setDraggableBasePosition(draggableBasePosition);

      const dragStart = {
        x: position.x - draggableBasePosition.x,
        y: position.y - draggableBasePosition.y,
      };
      setDragLocation(dragStart);
      setDragStart(dragStart);
    },
    [onDragStart],
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent) => {
      if (!draggableBasePosition) {
        return;
      }

      const dragLocation = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
      onDragMove(dragLocation);
      setDragLocation({
        x: dragLocation.x - draggableBasePosition.x,
        y: dragLocation.y - draggableBasePosition.y,
      });
    },
    [onDragMove, draggableBasePosition],
  );
  const handleTouchEnd = useCallback(() => {
    onDragEnd();
    setDragLocation(null);
    setDraggableBasePosition(null);
    setDragStart(null);
  }, [onDragEnd]);

  return isSelecting ? (
    <SelectedFooter />
  ) : !remainingTiles[0] ? (
    <DoneFooter />
  ) : (
    <>
      <FooterStyles dragging={!!dragStart}>
        {remainingTiles[1] ? (
          <Column justify="center">
            <NextTile
              pending
              key={remainingTiles.length}
              dragging={!!dragStart}
              letter={remainingTiles[1]}
            />
            <Text style="overline">Next</Text>
          </Column>
        ) : null}
        <MainTileContainer>
          <MainTile
            dragging={!!dragStart}
            letter={remainingTiles[0]}
            onTouchStart={(event) => handleTouchStart(event)}
            onTouchMove={(event) => handleTouchMove(event)}
            onTouchEnd={() => handleTouchEnd()}
          />
        </MainTileContainer>
      </FooterStyles>
      <DraggedMainTile
        data-draggable="main-tile"
        key={remainingTiles.length}
        dragging={!!dragStart}
        letter={remainingTiles[0]}
        location={dragLocation}
        onTouchStart={(event) => handleTouchStart(event)}
        onTouchMove={(event) => handleTouchMove(event)}
        onTouchEnd={() => handleTouchEnd()}
      />
    </>
  );
}

export default Footer;
