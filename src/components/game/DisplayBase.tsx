import { styled } from "@linaria/react";

import DisplayLettersRemaining from "@/components/game/DisplayLettersRemaining";
import { Colors, TypeStyles, BorderRadius, Border } from "@/styles/core";
import { Row } from "@/styles/layout";

const DisplayContainer = styled.div<{ color?: string }>`
  position: relative;
  box-sizing: content-box;
  overflow: hidden;
  background: ${({ color }) => color ?? Colors.WHITE};
  border: ${Border.THIN};
  border-radius: ${BorderRadius.LARGE_LEAF};
`;

const MainRow = styled(Row)`
  height: 72px;
  padding-left: 16px;
`;

const Label = styled.div<{ color?: string }>`
  ${TypeStyles.OVERLINE}
  display: inline-block;
  padding: 6px 24px 6px 16px;
  color: ${({ color }) => color ?? Colors.WHITE};
  background: ${Colors.BLACK};
  border-radius: ${BorderRadius.ROUNDED_LEFT};
`;

function DisplayBase({
  color = Colors.WHITE,
  children,
  label,
}: {
  color: string;
  children?: React.ReactNode;
  label: string;
}) {
  return (
    <DisplayContainer color={color}>
      <MainRow>
        {children}
        <Label color={color}>{label}</Label>
      </MainRow>
      <DisplayLettersRemaining />
    </DisplayContainer>
  );
}

export default DisplayBase;
