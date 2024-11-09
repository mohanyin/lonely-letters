import { styled } from "@linaria/react";
import { useEffect, useState } from "react";

import xSvg from "@/assets/images/x.svg";
import Button from "@/components/button";
import { useSelectedWord, useStore } from "@/store";
import { border } from "@/styles/core";
import { CENTER } from "@/styles/layout";
import { checkWord } from "@/utils/dictionary";

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
  padding-top: 16px;
  padding-bottom: 16px;
`;
const DoneButton = styled(Button)`
  grid-column: 1 / 3;
  padding-top: 20px;
  padding-bottom: 20px;
`;

function SelectedFooter() {
  const cancelSelecting = useStore((store) => store.cancelSelecting);
  const finishSelecting = useStore((store) => store.finishSelecting);

  const selectedWord = useSelectedWord();
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    checkWord(selectedWord).then((isValid) => setIsValid(isValid));
  }, [selectedWord]);

  return (
    <FooterStyles dragging={false}>
      <DoneButton disabled={!isValid} onClick={finishSelecting}>
        Submit
      </DoneButton>
      <CancelButton destructive onClick={cancelSelecting}>
        <img src={xSvg} alt="Cancel" />
      </CancelButton>
    </FooterStyles>
  );
}

export default SelectedFooter;
