import { styled } from "@linaria/react";
import dayjs from "dayjs";
import { useMemo } from "react";

import { useStore } from "@/store";
import { borderRadius, colors, page, type } from "@/styles/core";
import { CENTER, Column, Row } from "@/styles/layout";
import Text from "@/styles/typography";

const Container = styled.header`
  ${CENTER}
  flex: none;
  width: 100%;
  color: ${colors.textPrimary};
`;

const Content = styled(Row)`
  width: 100%;
  max-width: ${page.maxWidth};
  padding: 8px 20px;
`;

const Puzzle = styled.div`
  ${type.overlineSmall}
  padding: 3px 4px;
  color: ${colors.green500};
  background: ${colors.black};
  border-radius: ${borderRadius.small};
`;

const ButtonSlot = styled.div`
  width: 36px;
`;

function AppBar() {
  const id = useStore((state) => state.currentPuzzle);
  const today = useStore((state) => state.today);

  const todayFormatted = useMemo(() => {
    return dayjs(today).format("MMMM D, YYYY");
  }, [today]);

  return (
    <Container>
      <Content>
        <ButtonSlot data-app-bar-left />
        <Column gap="0">
          <Row gap="4px">
            <Text style="headline3" as="h1">
              Woggle
            </Text>
            <Puzzle>#{id}</Puzzle>
          </Row>
          <Text style="captionItalic">{todayFormatted}</Text>
        </Column>
        <ButtonSlot data-app-bar-right />
      </Content>
    </Container>
  );
}

export default AppBar;
