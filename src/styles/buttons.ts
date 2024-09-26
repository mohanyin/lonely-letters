import { styled } from "@linaria/react";

import { Border, BorderRadius, Colors, TypeStyles } from "@/styles/core";

export const BUTTON = {
  ...TypeStyles.OVERLINE,
  color: Colors.BLACK,
  padding: "12px 16px",
  background: Colors.GOLD_500,
  border: Border.THIN,
  "border-bottom-width": "4px",
  "border-radius": BorderRadius.MEDIUM,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  transition: "all 0.05s ease-in-out",
};

export const BUTTON_ACTIVE = {
  background: Colors.GOLD_600,
  "border-bottom-width": "1px",
  "margin-top": "3px",
};

export const Button = styled.button`
  ${BUTTON}

  &:active {
    ${BUTTON_ACTIVE}
  }
`;
