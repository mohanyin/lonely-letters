import { styled } from "@linaria/react";
import { useCallback, useState } from "react";

import Tile from "@/components/game/Tile";
import { useGameStore } from "@/store/game";
import { Border, BorderRadius, Colors, TypeStyles } from "@/styles/core";

interface Position {
  x: number;
  y: number;
}

const FooterStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
`;

const MainTileContainer = styled.div`
  grid-column: 2 / 4;
  padding: 16px;
  background: ${Colors.GOLD};
  border: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE};
  aspect-ratio: 1;
`;

function calculateDragTransform({
  dragging,
  location,
}: {
  dragging: boolean;
  location: Position | null;
}) {
  if (!dragging) {
    return "none";
  } else if (!location) {
    return "translate(50%, 50%)";
  }
  return `translate(${location.x}px, ${location.y}px) translate(50%, 50%)`;
}
const MainTile = styled(Tile)<{ dragging: boolean; location: Position | null }>`
  width: ${({ dragging }) => (dragging ? "50%" : "100%")};
  border-bottom-width: 6px;
  transform: ${(props) => calculateDragTransform(props)};
  transition: ${({ dragging }) =>
    dragging ? "width 0.2s ease-in-out" : "none"};
`;

const NextTileContainer = styled.div`
  padding: 12px;
  border: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE};
`;

const NextLabel = styled.div`
  ${TypeStyles.OVERLINE}
  margin-bottom: 8px;
  text-align: center;
`;

const NextTile = styled(Tile)``;

const DoneButton = styled.button`
  ${TypeStyles.OVERLINE}
  background: ${Colors.WHITE};
  border: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE};
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
  const remainingTiles = useGameStore((store) => store.remainingTiles);
  const isSelecting = useGameStore((store) => store.isSelecting());
  const finishSelecting = useGameStore((store) => store.finishSelecting);
  const selectMode = useGameStore((store) => store.selectMode);

  const [dragStart, setDragStart] = useState<Position | null>(null);
  const [dragLocation, setDragLocation] = useState<Position | null>(null);

  const handleTouchStart = useCallback(
    (event: React.TouchEvent) => {
      const position = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
      onDragStart(position);
      setDragStart(position);
    },
    [onDragStart],
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent) => {
      if (!dragStart) {
        return;
      }

      onDragMove({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      });
      setDragLocation({
        x: event.touches[0].clientX - dragStart.x,
        y: event.touches[0].clientY - dragStart.y,
      });
    },
    [dragStart, onDragMove],
  );
  const handleTouchEnd = useCallback(() => {
    onDragEnd();
    setDragStart(null);
    setDragLocation(null);
  }, [onDragEnd]);

  return (
    <FooterStyles>
      {isSelecting && selectMode === "tap" ? (
        <DoneButton onClick={() => finishSelecting()}>Done</DoneButton>
      ) : null}

      <MainTileContainer>
        {remainingTiles[0] ? (
          <MainTile
            dragging={!!dragStart}
            letter={remainingTiles[0]}
            location={dragLocation}
            onTouchStart={(event) => handleTouchStart(event)}
            onTouchMove={(event) => handleTouchMove(event)}
            onTouchEnd={() => handleTouchEnd()}
          />
        ) : (
          <div>You done</div>
        )}
      </MainTileContainer>
      <div>
        {remainingTiles[1] ? (
          <NextTileContainer>
            <NextLabel>Next</NextLabel>
            <NextTile letter={remainingTiles[1]} />
          </NextTileContainer>
        ) : null}
      </div>
    </FooterStyles>
  );
}

export default Footer;
