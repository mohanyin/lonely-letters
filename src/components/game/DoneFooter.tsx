import { styled } from "@linaria/react";
import mixpanel from "mixpanel-browser";

import Button from "@/components/button";
import { useStore } from "@/store";
import { border, type } from "@/styles/core";

const FooterStyles = styled.div<{ dragging: boolean }>`
  width: 100%;
  margin-top: 12px;
  padding-top: 12px;
  border-top: ${border.thin};
  transform: perspective(800px) rotateX(20deg);
  transform-origin: top center;
`;

const DoneWithPuzzle = styled.div`
  ${type.bodyItalic}
  padding-bottom: 12px;
  text-align: center;
`;

function DoneFooter() {
  const puzzleId = useStore((state) => state.currentPuzzle);
  const score = useStore((state) => state.game.score);
  function logFinish(): void {
    // eslint-disable-next-line import/no-named-as-default-member
    mixpanel.track("Game finished", {
      puzzle: puzzleId,
      score,
    });
  }
  return (
    <FooterStyles dragging={false}>
      <DoneWithPuzzle>Done with the puzzle?</DoneWithPuzzle>
      <Button to="/results" fullWidth onClick={logFinish}>
        View results
      </Button>
    </FooterStyles>
  );
}

export default DoneFooter;
