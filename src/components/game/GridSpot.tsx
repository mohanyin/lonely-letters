import { css, cx } from "@linaria/core";
import { styled } from "@linaria/react";
import { useMemo } from "react";

import dottedCircle from "@/assets/images/dotted-circle.png";
import { border, colors, type, fontWeight } from "@/styles/core";
import { CENTER } from "@/styles/layout";
import { parseIndex } from "@/utils/grid";

const Container = styled.div`
  container: spot / size;
  aspect-ratio: 1;
`;

const rotate = css`
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  animation: rotate 4s linear infinite;
`;

const GridSpotCircle = styled.img`
  width: 50cqw;
  height: 50cqw;
`;

const GridSpotStyle = styled.button<{ highlight: boolean }>`
  ${CENTER}
  width: 100%;
  height: 100%;
  background: ${({ highlight }) =>
    highlight ? colors.gold500 : colors.green600};
  border: ${border.thin};
  border-top-width: 4cqw;
  border-radius: 20cqw;
  transition: background 0.15s ease-in-out;

  &:active {
    background: ${colors.gold500};
  }
`;

const GridSpotBonusContainer = styled.div`
  position: relative;
`;

const GridSpotCircleBonus = styled(GridSpotCircle)`
  background: ${colors.gold500};
  border-radius: 100%;
`;

const GridSpotBonus = styled.div`
  ${type.headline3}
  position: absolute;
  top: 50%;
  left: 50%;
  font-weight: ${fontWeight.light};
  font-size: 23cqw;
  line-height: 55cqw;
  transform: translate(-50%, -50%);
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
  background: colors.black,
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
          {bonus ? (
            <GridSpotBonusContainer>
              <GridSpotCircleBonus
                src={dottedCircle}
                className={cx(highlight && rotate)}
              />
              <GridSpotBonus>2x</GridSpotBonus>
            </GridSpotBonusContainer>
          ) : (
            <GridSpotCircle
              src={dottedCircle}
              className={cx(highlight && rotate)}
            />
          )}
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
