import { styled } from "@linaria/react";
import { useMemo } from "react";

import { Border, BorderRadius, Colors, TypeStyles, Type } from "@/styles/core";
import { CENTER } from "@/styles/layout";
import { parseIndex } from "@/utils/grid";

const GridSpotStyle = styled.button<{ highlight: boolean }>`
  ${CENTER}
  background: ${({ highlight }) =>
    highlight ? Colors.GOLD : Colors.GREEN_600};
  border: ${Border.THIN};
  border-top-width: 4px;
  border-radius: ${BorderRadius.MEDIUM};
  aspect-ratio: 1;
  transition: background 0.15s ease-in-out;
  container: spot / size;

  &:active {
    background: ${Colors.GOLD};
  }
`;

const GridSpotDiamond = styled.div`
  width: 40cqw;
  height: 40cqw;
  border: ${Border.THIN};
  transform: rotate(45deg);
`;

const GridSpotBonus = styled.div`
  ${TypeStyles.HEADLINE_3}
  width: 55cqw;
  height: 55cqw;
  font-weight: ${Type.FONT_WEIGHT_LIGHT};
  font-size: 30cqw;
  line-height: 55cqw;
  background: ${Colors.GOLD};
  border: ${Border.THIN};
  border-radius: 100%;
`;

const GridCrossContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CROSS = {
  position: "absolute",
  top: "50%",
  left: "0",
  width: "100%",
  height: "1px",
  background: Colors.BLACK,
  "transform-origin": "center center",
};

const GridCrossLeft = styled.div`
  ${CROSS}
  transform: rotate(45deg);
`;

const GridCrossRight = styled.div`
  ${CROSS}
  transform: rotate(-45deg);
`;

function GridSpot({
  index,
  highlight,
  bonus,
  blocked,
  onClick,
}: {
  index: number;
  highlight: boolean;
  bonus?: boolean;
  blocked?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { x, y } = parseIndex(index);
  const ariaLabel = useMemo(() => {
    const bonusLabel = bonus ? " has bonus" : "";
    return `Add tile to row: ${y}, column: ${x}${bonusLabel}`;
  }, [x, y, bonus]);
  return !blocked ? (
    <GridSpotStyle
      data-grid-spot={index}
      highlight={highlight}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {bonus ? <GridSpotBonus>2x</GridSpotBonus> : <GridSpotDiamond />}
    </GridSpotStyle>
  ) : (
    <GridCrossContainer>
      <GridCrossLeft />
      <GridCrossRight />
    </GridCrossContainer>
  );
}

export default GridSpot;