import { border, borderRadius, colors, type } from "@/styles/core";

export const BUTTON = {
  ...type.overline,
  color: colors.black,
  padding: "12px 16px",
  background: colors.gold500,
  border: border.thin,
  "border-bottom-width": "4px",
  "border-radius": borderRadius.medium,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
};

export const BUTTON_ACTIVE = {
  background: colors.gold600,
  "border-bottom-width": "1px",
  "margin-top": "3px",
};
