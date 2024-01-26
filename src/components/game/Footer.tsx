import { styled } from "@linaria/react";
import { useCallback, useState } from "react";

import Tile from "@/components/game/Tile";
import { useGameStore } from "@/store/game";
import { Border, BorderRadius, Colors, TypeStyles } from "@/styles/core";

interface Position {
  x: number;
  y: number;
}

const FooterStyles = styled.div<{ dragging: boolean }>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  transform: ${({ dragging }) =>
    !dragging ? "perspective(800px) rotateX(20deg)" : "none"};
  transition: transform 0.3s ease-in-out;
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

const DoneButton = styled.button`
  ${TypeStyles.HEADLINE_3}
  padding: 12px 16px;
  background: ${Colors.GOLD};
  border: ${Border.THIN};
  border-bottom-width: 4px;
  border-radius: ${BorderRadius.LARGE} 0 ${BorderRadius.LARGE};
`;

const DoneWithPuzzle = styled.div`
  ${TypeStyles.BODY_ITALIC}
  text-align: center;
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
  const selectedWord = useGameStore((store) => store.selectedWord());

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

  return isSelecting && selectMode === "tap" ? (
    <DoneButton onClick={finishSelecting}>Submit “{selectedWord}”</DoneButton>
  ) : !remainingTiles[0] ? (
    <>
      <DoneWithPuzzle>Done with the puzzle?</DoneWithPuzzle>
      <DoneButton onClick={finishSelecting}>See my results</DoneButton>
    </>
  ) : (
    <FooterStyles dragging={!!dragStart}>
      <MainTileContainer>
        <MainTile
          dragging={!!dragStart}
          letter={remainingTiles[0]}
          location={dragLocation}
          onTouchStart={(event) => handleTouchStart(event)}
          onTouchMove={(event) => handleTouchMove(event)}
          onTouchEnd={() => handleTouchEnd()}
        />
      </MainTileContainer>
      <div>
        {remainingTiles[1] ? (
          <NextTileContainer>
            <NextLabel>Next</NextLabel>
            <Tile letter={remainingTiles[1]} />
          </NextTileContainer>
        ) : null}
      </div>
    </FooterStyles>
  );
}

export default Footer;
