import { styled } from "@linaria/react";

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
`;

const Tile = styled.div`
  ${TypeStyles.HEADLINE_2}
  background: ${Colors.WHITE};
  border: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE};
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
        <Tile>{remainingTiles[0]}</Tile>
      </MainTileContainer>
      <div>
        <NextTileContainer>
          <NextLabel>Next</NextLabel>
          <Tile>{remainingTiles[1]}</Tile>
        </NextTileContainer>
      </div>
    </FooterStyles>
  );
}

export default Footer;
