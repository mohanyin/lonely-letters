import { styled } from "@linaria/react";
import { format } from "date-fns";

import { useGameStore } from "@/store/game";
import { BorderRadius, Colors, TypeStyles } from "@/styles/core";

const AppBarStyles = styled.header`
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 20px;
  background: ${Colors.BLACK};
  border-bottom-right-radius: ${BorderRadius.MEDIUM};
`;

const Title = styled.h1`
  ${TypeStyles.HEADLINE_3}
  color: ${Colors.WHITE};
`;

const Details = styled.div`
  ${TypeStyles.OVERLINE_SMALL}
  padding: 4px 8px;
  line-height: 1;
  background: ${Colors.GREEN};
  border-radius: ${BorderRadius.SMALL} 0 ${BorderRadius.SMALL};
`;

function AppBar() {
  const id = useGameStore((state) => state.id);

  return (
    <AppBarStyles>
      <Title>Woggle</Title>
      <Details>
        Puzzle #{id} - {format(new Date(), "MM/dd/yyyy")}
      </Details>
    </AppBarStyles>
  );
}

export default AppBar;
