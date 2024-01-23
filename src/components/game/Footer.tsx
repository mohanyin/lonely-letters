import { styled } from "@linaria/react";

import Tile from "@/components/game/Tile";
import { useGameStore } from "@/store/game";
import { Border, BorderRadius, Colors, TypeStyles } from "@/styles/core";

const FooterStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
`;

const MainTileContainer = styled.div`
  grid-column: 2 / 4;
  padding: 16px;
  background: ${Colors.GOLD};
  border: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE_DOUBLE};
  aspect-ratio: 1;
`;

const MainTile = styled(Tile)`
  width: 50%;
  transform: scale(2) translate(25%, 25%);
  aspect-ratio: 1;
`;

const NextTileContainer = styled.div`
  padding: 12px;
  border: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE_DOUBLE};
`;

const NextLabel = styled.div`
  ${TypeStyles.OVERLINE}
  margin-bottom: 8px;
`;

const NextTile = styled(Tile)`
  transform: scale(0.8) translateX(-12.5%);
  aspect-ratio: 1;
`;

const DoneButton = styled.button`
  ${TypeStyles.OVERLINE}
  padding: 12px;
  background: ${Colors.WHITE};
  border: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE_DOUBLE};
`;

function Footer() {
  const remainingTiles = useGameStore((store) => store.remainingTiles);
  const isSelecting = useGameStore((store) => store.isSelecting());
  const finishSelecting = useGameStore((store) => store.finishSelecting);
  return (
    <FooterStyles>
      {isSelecting ? (
        <DoneButton onClick={() => finishSelecting()}>Done</DoneButton>
      ) : null}
      <MainTileContainer>
        <MainTile letter={remainingTiles[0]} />
      </MainTileContainer>
      <div>
        <NextTileContainer>
          <NextLabel>Next</NextLabel>
          <NextTile letter={remainingTiles[1]} />
        </NextTileContainer>
      </div>
    </FooterStyles>
  );
}

export default Footer;
