import { styled } from "@linaria/react";

import xSvg from "@/assets/images/x.svg";
import Button from "@/components/button";
import { useStore } from "@/store";
import { border, borderRadius, colors } from "@/styles/core";
import { CENTER } from "@/styles/layout";

const FooterStyles = styled.div<{ dragging: boolean }>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  margin-top: 12px;
  padding-top: 24px;
  border-top: ${border.thin};
  transform: perspective(800px) rotateX(20deg);
  transform-origin: top center;
`;

const CancelButton = styled(Button)`
  ${CENTER}
  background: ${colors.red500};
  border-right: none;
  border-radius: ${borderRadius.medium} 0 0 ${borderRadius.medium};

  &:active {
    background: ${colors.red600};
  }
`;
const DoneButton = styled(Button)`
  grid-column: 2 / 5;
  border-radius: 0 ${borderRadius.medium} ${borderRadius.medium} 0;
`;

function SelectedFooter() {
  const cancelSelecting = useStore((store) => store.cancelSelecting);
  const finishSelecting = useStore((store) => store.finishSelecting);

  return (
    <FooterStyles dragging={false}>
      <CancelButton onClick={cancelSelecting}>
        <img src={xSvg} alt="Cancel" />
      </CancelButton>
      <DoneButton onClick={finishSelecting}>Submit</DoneButton>
    </FooterStyles>
  );
}

export default SelectedFooter;
