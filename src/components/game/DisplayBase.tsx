import { styled } from "@linaria/react";

import { Colors, BorderRadius, Border, Page } from "@/styles/core";
import { Row } from "@/styles/layout";

const DisplayContainer = styled.div`
  width: 100%;
  max-width: ${Page.MAX_WIDTH};
  padding: 0 ${Page.PADDING_HORIZONTAL};
`;

const Display = styled.div<{ color?: string }>`
  position: relative;
  box-sizing: content-box;
  overflow: hidden;
  background: ${Colors.WHITE};
  border: ${Border.THIN};
  border-bottom-width: 3px;
  border-radius: ${BorderRadius.MEDIUM};
`;

const MainRow = styled(Row)`
  height: 64px;
  padding: 0 16px;
`;

const SecondaryRow = styled(Row)`
  gap: 0;
  align-items: stretch;
`;

function DisplayBase({
  main,
  secondary,
}: {
  main: React.ReactNode[];
  secondary: React.ReactNode[];
}) {
  return (
    <DisplayContainer>
      <Display>
        <MainRow>{main}</MainRow>
        <SecondaryRow>{secondary}</SecondaryRow>
      </Display>
    </DisplayContainer>
  );
}

export default DisplayBase;
