import { styled } from "@linaria/react";

import xSvg from "@/assets/images/x.svg";
import { useStore } from "@/store";
import { Button } from "@/styles/buttons";
import { Border, BorderRadius, Colors } from "@/styles/core";
import { CENTER } from "@/styles/layout";

const FooterStyles = styled.div<{ dragging: boolean }>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 12px;
  padding-top: 24px;
  border-top: ${Border.THIN};
  transform: perspective(800px) rotateX(20deg);
  transform-origin: top center;
`;

const CancelButton = styled(Button)`
  ${CENTER}
  background: ${Colors.RED};
  border-radius: ${BorderRadius.MEDIUM} 0 0;
`;
const DoneButton = styled(Button)`
  grid-column: 2 / 5;
  border-radius: 0 0 ${BorderRadius.MEDIUM};
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
