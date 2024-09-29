import { styled } from "@linaria/react";

import { colors, borderRadius, border, page } from "@/styles/core";
import { Row } from "@/styles/layout";

const DisplayContainer = styled.div`
  width: 100%;
  max-width: ${page.maxWidth};
  padding: 0 ${page.paddingHorizontal};
`;

const Display = styled.div<{ color?: string }>`
  position: relative;
  box-sizing: content-box;
  overflow: hidden;
  background: ${colors.white};
  border: ${border.thin};
  border-bottom-width: 3px;
  border-radius: ${borderRadius.medium};
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
