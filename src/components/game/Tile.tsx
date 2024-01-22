import { styled } from "@linaria/react";

import { Border, BorderRadius, Colors, TypeStyles } from "@/styles/core";
import { SCORES, Letter } from "@/utils/tiles";

const TileStyles = styled.div`
  position: relative;
  background: ${Colors.WHITE};
  border: ${Border.THIN};
  border-bottom-width: 3px;
  border-radius: ${BorderRadius.LARGE};
  aspect-ratio: 1;
  user-select: none;
`;

const Letter = styled.div`
  ${TypeStyles.HEADLINE_2}
  position: absolute;
  top: 4px;
  right: 18px;
  left: 12px;
  text-align: center;
`;

const Score = styled.div`
  ${TypeStyles.BODY}
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background: ${Colors.GREEN};
  border: ${Border.THIN};
  border-radius: 20px;
`;

function Tile({ letter }: { letter: Letter }) {
  return (
    <TileStyles>
      <Letter>{letter}</Letter>
      <Score>{SCORES[letter]}</Score>
    </TileStyles>
  );
}

export default Tile;
