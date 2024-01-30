import { styled } from "@linaria/react";

import { Border, BorderRadius, Colors } from "@/styles/core";
import { CENTER } from "@/styles/layout";
import { parseIndex } from "@/utils/grid";

const GridSpot = styled.button<{ highlight: boolean }>`
  ${CENTER}
  background: ${({ highlight }) =>
    highlight ? Colors.GOLD : Colors.GREEN_600};
  border: ${Border.THIN};
  border-top-width: 4px;
  border-radius: ${BorderRadius.MEDIUM};
  aspect-ratio: 1;
  transition: background 0.15s ease-in-out;

  &:active {
    background: ${Colors.GOLD};
  }
`;

const GridSpotDiamond = styled.div`
  width: 40%;
  height: 40%;
  border: ${Border.THIN};
  transform: rotate(45deg);
`;

function Grid({
  index,
  highlight,
  onClick,
}: {
  index: number;
  highlight: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { x, y } = parseIndex(index);
  return (
    <GridSpot
      data-grid-spot={index}
      highlight={highlight}
      onClick={onClick}
      aria-label={`Add tile to row: ${y}, column: ${x}`}
    >
      <GridSpotDiamond />
    </GridSpot>
  );
}

export default Grid;
