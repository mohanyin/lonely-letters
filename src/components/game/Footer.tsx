import { styled } from "@linaria/react";
import { useState } from "react";

import { Border, BorderRadius, Colors, TypeStyles } from "@/styles/core";

const FooterStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
`;

const MainTileContainer = styled.div`
  border: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE_DOUBLE};
  background: ${Colors.GOLD};
  grid-column: 2 / 4;
  padding: 16px;
`;

const Tile = styled.div`
  ${TypeStyles.HEADLINE_2}
  aspect-ratio: 1;
  border: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE};
  background: ${Colors.WHITE};
`;

const NextTileContainer = styled.div`
  border: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE_DOUBLE};
  padding: 12px;
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
