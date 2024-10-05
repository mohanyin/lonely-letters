import { styled } from "@linaria/react";

import xSvg from "@/assets/images/x.svg";
import Button from "@/components/button";
import { useStore } from "@/store";
import { border } from "@/styles/core";
import { CENTER } from "@/styles/layout";

const FooterStyles = styled.div<{ dragging: boolean }>`
  display: grid;
  flex: none;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  align-items: center;
  width: 100%;
  height: 140px;
  padding: 0 12px;
  outline: ${border.thin};
`;

const CancelButton = styled(Button)`
  ${CENTER}
  min-height: 64px;
`;
const DoneButton = styled(Button)`
  grid-column: 1 / 3;
  min-height: 64px;
`;

function SelectedFooter() {
  const cancelSelecting = useStore((store) => store.cancelSelecting);
  const finishSelecting = useStore((store) => store.finishSelecting);

  return (
    <FooterStyles dragging={false}>
      <DoneButton onClick={finishSelecting}>Submit</DoneButton>
      <CancelButton destructive onClick={cancelSelecting}>
        <img src={xSvg} alt="Cancel" />
      </CancelButton>
    </FooterStyles>
  );
}

export default SelectedFooter;
