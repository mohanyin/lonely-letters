import { styled } from "@linaria/react";
import { useMemo } from "react";

import { Border, Colors, TypeStyles } from "@/styles/core";
import { parseIndex } from "@/utils/grid";

const Container = styled.div`
  container: spot / size;
  aspect-ratio: 1;
`;

const GridSpotStyle = styled.button<{ highlight: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${({ highlight }) =>
    highlight ? Colors.GOLD : Colors.GREEN_600};
  border: ${Border.THIN};
  border-top-width: 4cqw;
  border-radius: 20cqw;
  transition: background 0.2s ease-in-out;

  &:active {
    background: ${Colors.GOLD};
  }
`;

const GridSpotDiamond = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 35cqw;
  height: 35cqw;
  border: ${Border.THIN};
  transform: translate(-50%, -50%) rotate(45deg);
`;

const GridSpotBonus = styled.div`
  ${TypeStyles.OVERLINE}
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 4cqw 0;
  font-size: 20cqw;
  background: ${Colors.GOLD};
  border-top: ${Border.THIN};
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
          <GridSpotDiamond />
          {bonus ? <GridSpotBonus>Bonus</GridSpotBonus> : null}
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
