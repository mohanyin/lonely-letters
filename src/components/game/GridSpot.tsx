import { styled } from "@linaria/react";
import { useMemo } from "react";

import { Border, Colors, TypeStyles, Type } from "@/styles/core";
import { CENTER } from "@/styles/layout";
import { parseIndex } from "@/utils/grid";

const Container = styled.div`
  container: spot / size;
  aspect-ratio: 1;
`;

const GridSpotStyle = styled.button<{ highlight: boolean }>`
  ${CENTER}
  width: 100%;
  height: 100%;
  background: ${({ highlight }) =>
    highlight ? Colors.GOLD_500 : Colors.GREEN_600};
  border: ${Border.THIN};
  border-top-width: 4cqw;
  border-radius: 20cqw;
  transition: background 0.2s ease-in-out;

  &:active {
    background: ${Colors.GOLD_500};
  }
`;

const GridSpotDiamond = styled.div`
  width: 35cqw;
  height: 35cqw;
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
  background: ${Colors.GOLD_500};
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
  return (
    <Container>
      {!blocked ? (
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
      )}
    </Container>
  );
}

export default GridSpot;
