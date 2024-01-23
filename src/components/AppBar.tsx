import { styled } from "@linaria/react";
import { format } from "date-fns";

import { useGameStore } from "@/store/game";
import { Colors, TypeStyles } from "@/styles/core";

const AppBarStyles = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  background: ${Colors.BLACK};
`;

const Title = styled.h1`
  ${TypeStyles.BODY_BOLD}
  color: ${Colors.WHITE};
`;

const Details = styled.div`
  ${TypeStyles.OVERLINE_SMALL}
  color: ${Colors.GREEN};
`;

function AppBar() {
  const id = useGameStore((state) => state.id);

  return (
    <AppBarStyles>
      <Title>Letter Today</Title>
      <Details>
        Puzzle #{id} - {format(new Date(), "MM/dd/yyyy")}
      </Details>
    </AppBarStyles>
  );
}

export default AppBar;
