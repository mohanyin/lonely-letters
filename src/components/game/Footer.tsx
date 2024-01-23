import { styled } from "@linaria/react";

import Tile from "@/components/game/Tile";
import { useGameStore } from "@/store/game";
import { Border, BorderRadius, Colors, TypeStyles } from "@/styles/core";

const FooterStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  transform: perspective(600px) rotate3d(1, 0, 0, 30deg);
`;

const MainTileContainer = styled.div`
  grid-column: 2 / 4;
  padding: 16px;
  background: ${Colors.GOLD};
  border: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE};
  aspect-ratio: 1;
`;

const MainTile = styled(Tile)`
  aspect-ratio: 1;
  border-bottom-width: 6px;
`;

const NextTileContainer = styled.div`
  padding: 12px;
  border: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE};
`;

const NextLabel = styled.div`
  ${TypeStyles.OVERLINE}
  margin-bottom: 8px;
`;

const NextTile = styled(Tile)`
  aspect-ratio: 1;
`;

const DoneButton = styled.button`
  ${TypeStyles.OVERLINE}
  padding: 12px;
  background: ${Colors.WHITE};
  border: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE};
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
        {remainingTiles[0] ? (
          <MainTile letter={remainingTiles[0]} />
        ) : (
          <div>You done</div>
        )}
      </MainTileContainer>
      <div>
        {remainingTiles[1] ? (
          <NextTileContainer>
            <NextLabel>Next</NextLabel>
            <NextTile letter={remainingTiles[1]} />
          </NextTileContainer>
        ) : null}
      </div>
    </FooterStyles>
  );
}

export default Footer;
