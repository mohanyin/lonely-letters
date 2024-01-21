import { styled } from "@linaria/react";
import { useState } from "react";

import { BorderRadius, Colors, TypeStyles } from "@/styles/core";

const AppBarStyles = styled.header`
  ${TypeStyles.BODY_BOLD}
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  margin-bottom: 16px;
  color: ${Colors.WHITE};
  background: ${Colors.BLACK};
  border-radius: ${BorderRadius.LARGE};
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
