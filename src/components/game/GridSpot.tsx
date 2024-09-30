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

const GridSpotCircle = styled.img<{ initialized: boolean }>`
  width: 50cqw;
  height: 50cqw;
  transform: ${({ initialized }) =>
    initialized ? "none" : "scale(0.8) rotate(45deg)"};
  opacity: ${({ initialized }) => (initialized ? 1 : 0)};
  transition:
    transform 0.4s ease-in-out,
    opacity 0.2s ease-in-out;
`;

function gridSpotTransition(initialized: boolean) {
  return `background ${initialized ? 0.2 : 0.4}s ease-in-out, border-width 0.4s ease-in-out`;
}

const GridSpotStyle = styled.button<{
  highlight: boolean;
  initialized: boolean;
}>`
  ${CENTER}
  width: 100%;
  height: 100%;
  background: ${({ highlight, initialized }) =>
    highlight
      ? colors.gold500
      : initialized
        ? colors.green600
        : colors.green500};
  border: ${border.thin};
  border-top-width: ${({ initialized }) => (initialized ? 4 : 1)}px;
  border-radius: 20cqw;
  transition: ${({ initialized }) => gridSpotTransition(initialized)};

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

const GridSpotBonus = styled.div<{ initialized: boolean }>`
  ${type.headline3}
  position: absolute;
  top: 50%;
  left: 50%;
  font-weight: ${fontWeight.light};
  font-size: 23cqw;
  line-height: 55cqw;
  transform: ${({ initialized }) =>
    initialized
      ? "translate(-50%, -50%) scale(1)"
      : "translate(-50%, -50%) scale(1.25)"};
  opacity: ${({ initialized }) => (initialized ? 1 : 0)};
  transition:
    transform 0.4s ease-in-out,
    opacity 0.2s ease-in-out;
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
  initialized,
  onClick,
}: {
  index: number;
  highlight: boolean;
  bonus?: boolean;
  blocked?: boolean;
  initialized?: boolean;
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
          initialized={initialized ?? false}
          onClick={onClick}
          aria-label={ariaLabel}
        >
          {bonus ? (
            <GridSpotBonusContainer>
              <GridSpotCircleBonus
                src={dottedCircle}
                className={cx(highlight && rotate)}
                initialized={initialized ?? false}
              />
              <GridSpotBonus initialized={initialized ?? false}>
                2x
              </GridSpotBonus>
            </GridSpotBonusContainer>
          ) : (
            <GridSpotCircle
              src={dottedCircle}
              className={cx(highlight && rotate)}
              initialized={initialized ?? false}
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
