import { styled } from "@linaria/react";

import { Border, BorderRadius, Colors, TypeStyles } from "@/styles/core";
import { Letter, SCORES } from "@/utils/tiles";

const TileStyles = styled.button<{ selected: boolean }>`
  position: relative;
  display: block;
  width: 100%;
  background: ${({ selected }) => (selected ? Colors.GOLD : Colors.WHITE)};
  border: ${Border.THIN};
  border-bottom-width: 3px;
  border-radius: ${BorderRadius.LARGE};
  user-select: none;
  touch-action: none;
  container: tile / size;
  aspect-ratio: 1;
`;

const TileLetter = styled.div`
  ${TypeStyles.HEADLINE_2}
  position: absolute;
  top: 4cqw;
  right: 25cqw;
  left: 10cqw;
  font-size: 75cqw;
  text-align: center;
`;

// TODO: Make this light font
const scoreWidth = 30;
const Score = styled.div`
  ${TypeStyles.BODY}
  position: absolute;
  right: 12cqw;
  bottom: 12cqw;
  width: ${scoreWidth}cqw;
  height: ${scoreWidth}cqw;
  font-size: ${scoreWidth * 0.8}cqw;
  line-height: ${scoreWidth}cqw;
  text-align: center;
  background: ${Colors.GREEN};
  border: ${Border.THIN};
  border-radius: ${scoreWidth}cqw;
`;

function Tile({
  letter,
  selected,
  onClick,
  className,
  style,
  dataGridSpot,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: {
  letter: Letter;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  dataGridSpot?: number;
  onTouchStart?: (event: React.TouchEvent) => void;
  onTouchMove?: (event: React.TouchEvent) => void;
  onTouchEnd?: (event: React.TouchEvent) => void;
}) {
  return (
    <TileStyles
      data-grid-spot={dataGridSpot}
      selected={selected ?? false}
      className={className}
      style={style}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <TileLetter>{letter}</TileLetter>
      <Score>{SCORES[letter]}</Score>
    </TileStyles>
  );
}

export default Tile;
