import { styled } from "@linaria/react";

import { Colors, Border } from "@/styles/core";

const Base = styled.div`
  padding: 6px 0;
  overflow: hidden;
  font-style: italic;
  text-align: center;
`;

const Main = styled(Base)`
  position: relative;
  flex: 0 0 65%;
  height: 29px;
  color: ${Colors.WHITE};
  background: ${Colors.BLACK};
  container: display / size;
`;

function getOverlayWidth(width: number = 1): string {
  return `${width * 100}cqw`;
}
const OverlayMask = styled.div<{ width?: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${(props) => getOverlayWidth(props.width)};
  min-width: 2px;
  overflow: hidden;
  border-top: ${Border.THIN};
  transition: width 0.2s ease-in-out;
`;

const Top = styled(Base)<{ color?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100cqw;
  color: ${Colors.BLACK};
  background: ${({ color }) => color ?? Colors.GREEN};
  transition: width 0.2s ease-in-out;
`;

function DisplayBarGraph({
  color,
  label,
  ratio,
}: {
  color?: string;
  label: string;
  ratio: number;
}) {
  return (
    <Main>
      {label}
      <OverlayMask aria-hidden width={!Number.isNaN(ratio) ? ratio : 0}>
        <Top color={color}>{label}</Top>
      </OverlayMask>
    </Main>
  );
}

export default DisplayBarGraph;
