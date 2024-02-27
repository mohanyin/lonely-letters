import { styled } from "@linaria/react";
import dayjs from "dayjs";

import BottomDrawer from "@/components/BottomDrawer";
import { useStore } from "@/store";
import { Border, BorderRadius, Colors, TypeStyles } from "@/styles/core";
import { CENTER, Row } from "@/styles/layout";

const AppBarStyles = styled.header`
  ${CENTER}
  width: 100%;
  color: ${Colors.BLACK};
`;

const AppBarRow = styled(Row)`
  width: 100%;
  max-width: 500px;
  padding: 8px 20px;
`;

const Title = styled.h1`
  ${TypeStyles.HEADLINE_3}
`;

const Puzzle = styled.div`
  ${TypeStyles.OVERLINE_SMALL}
  display: flex;
  overflow: hidden;
  line-height: 1;
  border: ${Border.THIN};
  border-radius: ${BorderRadius.SMALL};
`;

const PuzzleNumber = styled.div`
  padding: 6px 10px;
  color: ${Colors.GREEN};
  background: ${Colors.BLACK};
`;

const Date = styled.div`
  padding: 6px 10px;
`;

function AppBar() {
  const id = useStore((state) => state.currentPuzzle);
  const today = useStore((state) => state.today);

  return (
    <AppBarStyles>
      <AppBarRow>
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
      </AppBarRow>
    </AppBarStyles>
  );
}

export default AppBar;
