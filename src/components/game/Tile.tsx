import { styled } from "@linaria/react";

import { Border, Colors, Type, TypeStyles } from "@/styles/core";
import { Letter, SCORES } from "@/utils/tiles";

const Container = styled.button`
  display: block;
  width: 100%;
  background: transparent;
  user-select: none;
  touch-action: none;
  container: tile / size;
  aspect-ratio: 1;
`;

const TileStyles = styled.div<{ selected: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${({ selected }) => (selected ? Colors.GOLD : Colors.WHITE)};
  border: ${Border.THIN};
  border-bottom-width: 6cqw;
  border-radius: 20cqw;
`;

const LetterStyles = styled.div`
  ${TypeStyles.HEADLINE_2}
  position: absolute;
  top: 4cqw;
  right: 30cqw;
  left: 10cqw;
  font-size: 75cqw;
  text-align: center;
`;

const scoreWidth = 30;
const Score = styled.div`
  ${TypeStyles.BODY}
  position: absolute;
  right: 12cqw;
  bottom: 12cqw;
  width: ${scoreWidth}cqw;
  height: ${scoreWidth}cqw;
  font-weight: ${Type.FONT_WEIGHT_LIGHT};
  font-size: ${scoreWidth * 0.8}cqw;
  line-height: ${scoreWidth - 4}cqw;
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
    <Container
      data-grid-spot={dataGridSpot}
      className={className}
      style={style}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <TileStyles selected={selected ?? false}>
        <LetterStyles>{letter}</LetterStyles>
        <Score>{SCORES[letter]}</Score>
      </TileStyles>
    </Container>
  );
}

export default Tile;
