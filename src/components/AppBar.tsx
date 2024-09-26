import { styled } from "@linaria/react";
import dayjs from "dayjs";

import { useStore } from "@/store";
import { Border, BorderRadius, Colors, Page, TypeStyles } from "@/styles/core";
import { CENTER, Row } from "@/styles/layout";

const AppBarStyles = styled.header`
  ${CENTER}
  flex: none;
  width: 100%;
  color: ${Colors.BLACK};
`;

const AppBarRow = styled(Row)`
  width: 100%;
  max-width: ${Page.MAX_WIDTH};
  padding: 8px 20px;
`;

const TitleContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  ${TypeStyles.HEADLINE_3}
`;

const Puzzle = styled.div`
  ${TypeStyles.OVERLINE_SMALL}
  line-height: 1;
  border: ${Border.THIN};
  border-radius: ${BorderRadius.SMALL};
`;

const PuzzleNumber = styled.div`
  padding: 2px 4px;
  color: ${Colors.GREEN_500};
  background: ${Colors.BLACK};
`;

const Date = styled.div`
  ${TypeStyles.CAPTION_ITALIC}
`;

const AppBarSlot = styled.div`
  width: 36px;
`;

function AppBar() {
  const id = useStore((state) => state.currentPuzzle);
  const today = useStore((state) => state.today);

  return (
    <AppBarStyles>
      <AppBarRow>
        <AppBarSlot data-app-bar-left />
        <TitleContainer>
          <Row>
            <Title>Woggle</Title>
            <Puzzle>
              <PuzzleNumber>#{id}</PuzzleNumber>
            </Puzzle>
          </Row>
          <Date>{dayjs(today).format("MMMM D, YYYY")}</Date>
        </TitleContainer>
        <AppBarSlot data-app-bar-right />
      </AppBarRow>
    </AppBarStyles>
  );
}

export default AppBar;
