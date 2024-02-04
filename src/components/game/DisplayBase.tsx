import { styled } from "@linaria/react";

import { Colors, TypeStyles, BorderRadius, Border } from "@/styles/core";
import { Row } from "@/styles/layout";

const DisplayContainer = styled.div<{ color?: string }>`
  position: relative;
  box-sizing: content-box;
  overflow: hidden;
  background: ${Colors.WHITE};
  border: ${Border.THIN};
  border-radius: ${BorderRadius.MEDIUM};
`;

const MainRow = styled(Row)`
  height: 72px;
  padding-left: 16px;
`;

const Label = styled.div<{ color?: string }>`
  ${TypeStyles.OVERLINE}
  display: inline-block;
  padding: 6px 16px;
  color: ${({ color }) => color ?? Colors.WHITE};
  background: ${Colors.BLACK};
  border-radius: ${BorderRadius.ROUNDED_LEFT};
`;

function DisplayBase({
  color,
  children,
  label,
  secondary,
}: {
  color?: string;
  children?: React.ReactNode;
  secondary?: React.ReactNode;
  label: string;
}) {
  return (
    <DisplayContainer>
      <MainRow>
        {children}
        <Label color={color}>{label}</Label>
      </MainRow>
      {secondary}
    </DisplayContainer>
  );
}

export default DisplayBase;
