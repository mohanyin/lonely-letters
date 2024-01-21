import { styled } from "@linaria/react";
import { useState } from "react";

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

function Footer() {
  const [count, setCount] = useState(0);

  return (
    <FooterStyles>
      <div />
      <MainTileContainer>
        <Tile>M</Tile>
      </MainTileContainer>
      <div>
        <NextTileContainer>
          <NextLabel>Next</NextLabel>
          <Tile>N</Tile>
        </NextTileContainer>
      </div>
    </FooterStyles>
  );
}

export default Footer;
