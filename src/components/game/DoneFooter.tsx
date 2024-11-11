import { styled } from "@linaria/react";
import mixpanel from "mixpanel-browser";

import Button from "@/components/button";
import { useStore } from "@/store";
import { border, colors, type } from "@/styles/core";
import { Column } from "@/styles/layout";

const FooterStyles = styled(Column)`
  flex: none;
  justify-content: center;
  width: 100%;
  height: 120px;
  padding: 0 12px;
  background: ${colors.green600};
  outline: ${border.thin};
`;

const DoneWithPuzzle = styled.div`
  ${type.bodyItalic}
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
    <FooterStyles>
      <DoneWithPuzzle>Done with the puzzle?</DoneWithPuzzle>
      <Button to="/results" fullWidth onClick={logFinish}>
        View results
      </Button>
    </FooterStyles>
  );
}

export default DoneFooter;
