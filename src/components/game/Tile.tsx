import { styled } from "@linaria/react";

import { border, colors, font, fontWeight, type } from "@/styles/core";
import { getGridSpotBonusScore } from "@/utils/scoring";
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

const TileStyles = styled.div<{ selected: boolean; pending?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${({ selected }) => (selected ? colors.gold500 : colors.white)};
  border: ${({ pending }) => (pending ? border.dashed : border.thin)};
  border-bottom-width: ${({ pending }) => (pending ? "1px" : "6cqw")};
  border-radius: 20cqw;
  transition: background 0.2s ease-in-out;
`;

const LetterStyles = styled.div`
  ${type.headline2}
  position: absolute;
  top: 4cqw;
  right: 30cqw;
  left: 10cqw;
  font-size: 75cqw;
  line-height: 1;
  text-align: center;
`;

const scoreWidth = 30;
const getFontFamily = (narrow?: boolean) => {
  return narrow ? font.condensed : font.default;
};
const Score = styled.div<{
  narrow?: boolean;
  highlight?: boolean;
  pending?: boolean;
}>`
  ${type.body}
  position: absolute;
  right: 12cqw;
  bottom: 12cqw;
  width: ${scoreWidth}cqw;
  height: ${scoreWidth}cqw;
  font-weight: ${fontWeight.light};
  font-size: ${scoreWidth * 0.7}cqw;
  /* stylelint-disable-next-line font-family-name-quotes */
  font-family: ${({ narrow }) => getFontFamily(narrow)};
  line-height: ${scoreWidth - 1.5}cqw;
  letter-spacing: -1cqw;
  text-align: center;
  background: ${({ highlight }) =>
    highlight ? colors.gold500 : colors.green500};
  border: ${({ pending }) => (pending ? "none" : border.thin)};
  border-radius: ${scoreWidth}cqw;
`;

function Tile(props: {
  letter: Letter;
  selected?: boolean;
  bonus?: boolean;
  pending?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onTouchStart?: (event: React.TouchEvent) => void;
  onTouchMove?: (event: React.TouchEvent) => void;
  onTouchEnd?: (event: React.TouchEvent) => void;
}) {
  const {
    letter,
    selected,
    bonus,
    pending,
    className,
    style,
    onClick,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    ...attributes
  } = props;
  const baseScore = SCORES[letter];
  const score = bonus ? getGridSpotBonusScore(baseScore) : baseScore;
  return (
    <Container
      {...attributes}
      className={className}
      style={style}
      role={pending ? "presentation" : undefined}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <TileStyles selected={selected ?? false} pending={pending ?? false}>
        <LetterStyles>{letter}</LetterStyles>
        <Score
          narrow={score >= 10}
          highlight={bonus}
          pending={pending ?? false}
        >
          {score}
        </Score>
      </TileStyles>
    </Container>
  );
}

export default Tile;
