import { styled } from "@linaria/react";
import { useState } from "react";

import { BorderRadius, Colors, TypeStyles } from "@/styles/core";

const AppBarStyles = styled.header`
  ${TypeStyles.BODY_BOLD}
  background: ${Colors.BLACK};
  border-radius: ${BorderRadius.LARGE};
  color: ${Colors.WHITE};
  height: 54px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function AppBar() {
  const [count, setCount] = useState(0);

  return (
    <AppBarStyles>
      <h1>Lonely Letters</h1>
    </AppBarStyles>
  );
}

export default AppBar;
