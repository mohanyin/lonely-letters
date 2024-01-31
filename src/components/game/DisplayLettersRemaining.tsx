import { styled } from "@linaria/react";
import { useMemo } from "react";

import { useGameStore } from "@/store/game";
import { Colors, BorderRadius, Border } from "@/styles/core";

const Base = styled.div`
  padding: 6px 0;
  font-style: italic;
  text-align: center;
  border-top-left-radius: ${BorderRadius.LARGE};
`;

const Main = styled(Base)`
  position: relative;
  height: 29px;
  margin: 0 -1px;
  color: ${Colors.WHITE};
  background: ${Colors.BLACK};
  container: display / size;
`;

function getOverlayWidth(width: number = 1): string {
  return `${width * 100}cqw`;
}
const OverlayMask = styled.div<{ width?: number }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${(props) => getOverlayWidth(props.width)};
  overflow: hidden;
  border-top: ${Border.THIN};
  border-top-left-radius: ${BorderRadius.LARGE};
  transition: width 0.2s ease-in-out;
`;

const Top = styled(Base)`
  position: absolute;
  top: 0;
  right: 0;
  width: 100cqw;
  color: ${Colors.BLACK};
  background: ${Colors.GREEN};
  transition: width 0.2s ease-in-out;
`;

const diamondWidth = 8;
const Diamond = styled.div`
  position: absolute;
  top: ${-0.5 * diamondWidth * Math.sqrt(2) + 2}px;
  right: 12px;
  width: ${diamondWidth}px;
  height: ${diamondWidth}px;
  background: ${Colors.BLACK};
  transform: rotate(45deg);
`;

function DisplayLettersRemaining() {
  const totalTilesCount = useGameStore((state) => state.totalTilesCount);
  const remainingTilesCount = useGameStore(
    (state) => state.remainingTiles.length,
  );

  const label = useMemo(() => {
    return `${remainingTilesCount} / ${totalTilesCount} letters remaining`;
  }, [remainingTilesCount, totalTilesCount]);

  return (
    <Main>
      {label}
      <OverlayMask
        aria-hidden
        width={remainingTilesCount / totalTilesCount || 0}
      >
        <Top>{label}</Top>
      </OverlayMask>
      <Diamond />
    </Main>
  );
}

export default DisplayLettersRemaining;
