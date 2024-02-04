import { styled } from "@linaria/react";
import { Link } from "@tanstack/react-router";
import mixpanel from "mixpanel-browser";

import { useStore } from "@/store";
import { BUTTON } from "@/styles/buttons";
import { Border, TypeStyles } from "@/styles/core";

const FooterStyles = styled.div<{ dragging: boolean }>`
  margin-top: 12px;
  padding-top: 12px;
  border-top: ${Border.THIN};
  transform: perspective(800px) rotateX(20deg);
  transform-origin: top center;
`;

const DoneLink = styled(Link)`
  ${BUTTON}
  display: block;
`;

const DoneWithPuzzle = styled.div`
  ${TypeStyles.BODY_ITALIC}
  margin-bottom: 12px;
  text-align: center;
`;

function DoneFooter() {
  const puzzleId = useStore((state) => state.currentPuzzle);
  const score = useStore((state) => state.game.score);
  function logFinish(): void {
    mixpanel.track("Game finished", {
      puzzle: puzzleId,
      score,
    });
  }
  return (
    <FooterStyles dragging={false}>
      <DoneWithPuzzle>Done with the puzzle?</DoneWithPuzzle>
      <DoneLink to="/results" onClick={logFinish}>
        View results
      </DoneLink>
    </FooterStyles>
  );
}

export default DoneFooter;
