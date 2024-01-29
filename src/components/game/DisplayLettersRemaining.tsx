import { styled } from "@linaria/react";
import { useMemo } from "react";

import { useGameStore } from "@/store/game";
import { Colors, BorderRadius, Border } from "@/styles/core";

const Main = styled.div`
  position: relative;
  margin: 0 -1px -1px;
  padding: 6px 32px;
  color: ${Colors.WHITE};
  font-style: italic;
  text-align: center;
  background: ${Colors.BLACK};
  border-top: ${Border.THIN};
  border-left: ${Border.THIN};
  border-top-left-radius: ${BorderRadius.LARGE};
`;

const OverlayMask = styled.div<{ width?: string }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${({ width }) => "calc(" + width + " + 3px)" ?? "100%"};
  margin: -1px -2px 0;
  overflow: hidden;
  border: ${Border.THIN};
  border-top-left-radius: ${BorderRadius.LARGE};
  transition: width 0.2s ease-in-out;
`;

const Top = styled(Main)<{ width?: string }>`
  position: absolute;
  top: 0;
  right: 0;
  width: ${({ width }) => "calc(" + width + " + 2px)" ?? "100%"};
  margin: -1px;
  color: ${Colors.BLACK};
  background: ${Colors.GREEN};
  transition: width 0.2s ease-in-out;
`;

const Diamond = styled.div`
  position: absolute;
  top: ${-4 * Math.sqrt(2) + 1}px;
  right: 12px;
  width: 8px;
  height: 8px;
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
        width={`${(remainingTilesCount / totalTilesCount) * 100}%`}
      >
        <Top width={`${(totalTilesCount / remainingTilesCount) * 100}%`}>
          {label}
        </Top>
      </OverlayMask>
      <Diamond />
    </Main>
  );
}

export default DisplayLettersRemaining;
