import { styled } from "@linaria/react";
import dayjs from "dayjs";

import BottomDrawer from "@/components/BottomDrawer";
import { useStore } from "@/store";
import { Border, BorderRadius, Colors, TypeStyles } from "@/styles/core";
import { Row, ROW } from "@/styles/layout";

const AppBarStyles = styled.header`
  ${ROW}
  width: 100%;
  padding: 8px 20px;
  color: ${Colors.WHITE};
  background: ${Colors.BLACK};
`;

const Title = styled.h1`
  ${TypeStyles.HEADLINE_3}
`;

const Puzzle = styled.div`
  ${TypeStyles.OVERLINE_SMALL}
  display: flex;
  overflow: hidden;
  line-height: 1;
  border: ${Border.THIN_GREEN};
  border-radius: ${BorderRadius.SMALL} 0 ${BorderRadius.SMALL};
`;

const PuzzleNumber = styled.div`
  padding: 6px 10px;
  color: ${Colors.BLACK};
  background: ${Colors.GREEN};
  border-bottom-right-radius: ${BorderRadius.SMALL};
`;

const Date = styled.div`
  padding: 6px 10px;
`;

function AppBar() {
  const id = useStore((state) => state.currentPuzzle);
  const today = useStore((state) => state.today);

  return (
    <AppBarStyles>
      <Row>
        <Title>Woggle</Title>
        <Puzzle>
          <PuzzleNumber>#{id}</PuzzleNumber>
          <Date>{dayjs(today).format("MMM D, YYYY")}</Date>
        </Puzzle>
      </Row>
      <Row>
        <BottomDrawer />
      </Row>
    </AppBarStyles>
  );
}

export default AppBar;
