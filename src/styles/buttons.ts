import { styled } from "@linaria/react";

import { Border, BorderRadius, Colors, TypeStyles } from "@/styles/core";

export const BUTTON = {
  ...TypeStyles.OVERLINE,
  color: Colors.BLACK,
  padding: "12px 16px",
  background: Colors.GOLD,
  border: Border.THIN,
  "border-bottom-width": "4px",
  "border-radius": `${BorderRadius.MEDIUM} 0 ${BorderRadius.MEDIUM}`,
};

export const Button = styled.button`
  ${BUTTON}
`;
