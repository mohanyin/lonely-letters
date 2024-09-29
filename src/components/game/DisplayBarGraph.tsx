import { styled } from "@linaria/react";

import { colors, border } from "@/styles/core";

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
  color: ${colors.white};
  background: ${colors.black};
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
  border-top: ${border.thin};
  transition: width 0.2s ease-in-out;
`;

const Top = styled(Base)<{ color?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100cqw;
  color: ${colors.black};
  background: ${({ color }) => color ?? colors.green500};
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
