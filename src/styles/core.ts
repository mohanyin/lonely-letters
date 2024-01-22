export const Colors = {
  GREEN: "#00ECA5",
  GREEN_600: "#07D194",
  WHITE: "white",
  GOLD: "#FFBE15",
  BLACK: "#050505",
  RED: "#EF536D",
};

export const Type = {
  FONT_FAMILY: "IBM Plex Sans, sans-serif",
  FONT_FAMILY_CONDENSED: "IBM Plex Sans Condensed, sans-serif",
  FONT_FAMILY_DISPLAY: "Zen Dots, sans-serif",
  FONT_WEIGHT_REGULAR: 400,
  FONT_WEIGHT_SEMI_BOLD: 600,
  FONT_WEIGHT_BOLD: 700,
};

export const Border = {
  THIN: `1px solid ${Colors.BLACK}`,
};

const SCORE = {
  fontFamily: Type.FONT_FAMILY_DISPLAY,
  fontSize: "2.5em",
  lineHeight: 1,
};
const HEADLINE_2 = {
  fontFamily: Type.FONT_FAMILY,
  fontWeight: Type.FONT_WEIGHT_BOLD,
  fontSize: "3.5em",
  lineHeight: 1,
};
const OVERLINE = {
  fontFamily: Type.FONT_FAMILY_CONDENSED,
  fontWeight: Type.FONT_WEIGHT_SEMI_BOLD,
  fontSize: "1em",
  letterSpacing: `${1 / 16}em`,
  lineHeight: 1,
  textTransform: "uppercase",
};
const BODY = {
  fontFamily: Type.FONT_FAMILY,
  fontWeight: Type.FONT_WEIGHT_REGULAR,
  fontSize: "1em",
};
const BODY_BOLD = {
  ...BODY,
  fontWeight: Type.FONT_WEIGHT_BOLD,
};

export const TypeStyles = {
  SCORE,
  HEADLINE_2,
  OVERLINE,
  BODY,
  BODY_BOLD,
};

export const BorderRadius = {
  SMALL: "4px",
  LARGE: "12px",
  LARGE_DOUBLE: "24px",
};
