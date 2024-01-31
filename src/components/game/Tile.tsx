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
const getFontFamily = (narrow?: boolean) => {
  return narrow ? Type.FONT_FAMILY_CONDENSED : Type.FONT_FAMILY;
};
const Score = styled.div<{ narrow?: boolean; highlight?: boolean }>`
  ${TypeStyles.BODY}
  position: absolute;
  right: 12cqw;
  bottom: 12cqw;
  width: ${scoreWidth}cqw;
  height: ${scoreWidth}cqw;
  font-weight: ${Type.FONT_WEIGHT_LIGHT};
  font-size: ${scoreWidth * 0.7}cqw;
  /* stylelint-disable-next-line font-family-name-quotes */
  font-family: ${({ narrow }) => getFontFamily(narrow)};
  line-height: ${scoreWidth - 3}cqw;
  letter-spacing: -1cqw;
  text-align: center;
  background: ${({ highlight }) => (highlight ? Colors.GOLD : Colors.GREEN)};
  border: ${Border.THIN};
  border-radius: ${scoreWidth}cqw;
`;

function Tile(props: {
  letter: Letter;
  selected?: boolean;
  bonus?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  onTouchStart?: (event: React.TouchEvent) => void;
  onTouchMove?: (event: React.TouchEvent) => void;
  onTouchEnd?: (event: React.TouchEvent) => void;
}) {
  const {
    letter,
    selected,
    bonus,
    onClick,
    className,
    style,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    ...attributes
  } = props;
  const baseScore = SCORES[letter];
  const score = bonus ? baseScore * 2 : baseScore;
  return (
    <Container
      {...attributes}
      className={className}
      style={style}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <TileStyles selected={selected ?? false}>
        <LetterStyles>{letter}</LetterStyles>
        <Score narrow={score >= 10} highlight={bonus}>
          {score}
        </Score>
      </TileStyles>
    </Container>
  );
}

export default Tile;
