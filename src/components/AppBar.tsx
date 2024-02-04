import { styled } from "@linaria/react";
import dayjs from "dayjs";

import { useStore } from "@/store";
import { BorderRadius, Colors, TypeStyles } from "@/styles/core";
import { Row, ROW } from "@/styles/layout";

const AppBarStyles = styled.header`
  ${ROW}
  width: 100%;
  padding: 12px 20px;
  color: ${Colors.WHITE};
  background: ${Colors.BLACK};
`;

const Title = styled.h1`
  ${TypeStyles.HEADLINE_3}
`;

const Puzzle = styled.div`
  ${TypeStyles.OVERLINE_SMALL}
  padding: 4px 8px;
  color: ${Colors.BLACK};
  line-height: 1;
  background: ${Colors.GREEN};
  border-radius: ${BorderRadius.SMALL} 0 ${BorderRadius.SMALL};
`;

const Date = styled.div`
  ${TypeStyles.OVERLINE_SMALL}
`;

function AppBar() {
  const id = useStore((state) => state.currentPuzzle);
  const today = useStore((state) => state.today);

  return (
    <AppBarStyles>
      <Row>
        <Title>Woggle</Title>
        <Puzzle>#{id}</Puzzle>
      </Row>
      <Date>{dayjs(today).format("MMMM D, YYYY")}</Date>
    </AppBarStyles>
  );
}

export default AppBar;
