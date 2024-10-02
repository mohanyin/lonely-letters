import { styled } from "@linaria/react";
import { useCallback, useState } from "react";

import DoneFooter from "@/components/game/DoneFooter";
import SelectedFooter from "@/components/game/SelectedFooter";
import Tile from "@/components/game/Tile";
import Text from "@/components/text";
import { useStore, useIsSelecting } from "@/store";
import { border, borderRadius, colors } from "@/styles/core";
import { CENTER, Column } from "@/styles/layout";

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

const ControlContainer = styled.div`
  display: grid;
  grid-column: 2 / 5;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  align-items: center;
  height: 120px;
  padding: 0 12px;
  background: ${colors.gold600};
  border: ${border.thin};
  border-top-width: 4px;
  border-radius: ${borderRadius.large};
`;

const MainTileContainer = styled.div`
  ${CENTER}
  grid-column: 1 / 3;
  height: 100%;
  padding: 8px 0;
`;

const MainTile = styled(Tile)<{ dragging: boolean }>`
  width: auto;
  height: 100%;
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

const HoldSpotContainer = styled.div`
  grid-column: 3;
  width: 100%;
  container: spot / size;
  aspect-ratio: 1;
`;

const HoldSpot = styled.button`
  ${CENTER}
  position: relative;
  width: 100%;
  height: 100%;
  background: ${colors.gold500};
  border: ${border.thin};
  border-top-width: 4px;
  border-radius: 20cqw;
`;

const HoldSpotDiamond = styled.div<{ highlight?: boolean }>`
  aspect-ratio: 1;
  width: 35%;
  border: ${border.dashed};
  transform: ${(props) =>
    props.highlight ? "rotate(45deg) scale(1.1)" : "rotate(45deg)"};
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
  const holdTile = useStore((store) => store.holdTile);
  const [highlightHoldSpot, setHighlightHoldSpot] = useState(false);
  const swapHoldTile = useStore((store) => store.swapHoldTile);
  const hold = useStore((store) => store.game.hold);
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

      const possibleHighlights = document.elementsFromPoint(
        position.x,
        position.y,
      );
      for (const el of possibleHighlights) {
        if (el instanceof HTMLElement && el.dataset.holdSpot) {
          setHighlightHoldSpot(true);
        }
      }
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

      const possibleHighlights = document.elementsFromPoint(
        dragLocation.x,
        dragLocation.y,
      );
      let containsHoldSpot = false;
      for (const el of possibleHighlights) {
        if (el instanceof HTMLElement && el.dataset.holdSpot) {
          containsHoldSpot = true;
        }
      }
      setHighlightHoldSpot(containsHoldSpot);
    },
    [onDragMove, draggableBasePosition],
  );
  const handleTouchEnd = useCallback(() => {
    if (highlightHoldSpot) {
      holdTile();
    }

    onDragEnd();
    setDragLocation(null);
    setDraggableBasePosition(null);
    setDragStart(null);
    setHighlightHoldSpot(false);
  }, [onDragEnd, holdTile, highlightHoldSpot]);

  return isSelecting ? (
    <SelectedFooter />
  ) : !remainingTiles[0] ? (
    <DoneFooter />
  ) : (
    <>
      <FooterStyles dragging={!!dragStart}>
        {remainingTiles[1] ? (
          <Column justify="center" padding="0 8px">
            <NextTile
              pending
              key={remainingTiles.length}
              dragging={!!dragStart}
              letter={remainingTiles[1]}
            />
            <Text style="overline">Next</Text>
          </Column>
        ) : null}
        <ControlContainer>
          <MainTileContainer>
            <MainTile
              dragging={!!dragStart}
              letter={remainingTiles[0]}
              onTouchStart={(event) => handleTouchStart(event)}
              onTouchMove={(event) => handleTouchMove(event)}
              onTouchEnd={() => handleTouchEnd()}
            />
          </MainTileContainer>
          <Column padding="0 8px">
            {hold ? (
              <Tile pending onClick={swapHoldTile} letter={hold} />
            ) : (
              <HoldSpotContainer>
                <HoldSpot onClick={holdTile} data-hold-spot>
                  <HoldSpotDiamond highlight={highlightHoldSpot} />
                </HoldSpot>
              </HoldSpotContainer>
            )}
            <Text style="overline">{hold ? "Swap" : "Hold"}</Text>
          </Column>
        </ControlContainer>
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
