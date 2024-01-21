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

const SCORE = `
  font-family: ${Type.FONT_FAMILY_DISPLAY};
  font-size: 2.5em;
  line-height: 1;
`;
const HEADLINE_2 = `
  font-family: ${Type.FONT_FAMILY};
  font-weight: ${Type.FONT_WEIGHT_BOLD};
  font-size: 3.5em;
  line-height: 1;
`;
const OVERLINE = `
  font-family: ${Type.FONT_FAMILY_CONDENSED};
  font-weight: ${Type.FONT_WEIGHT_SEMI_BOLD};
  font-size: 1em;
  letter-spacing: ${1 / 16}em;
  line-height: 1;
  text-transform: uppercase;
`;
const BODY = `
  font-family: ${Type.FONT_FAMILY};
  font-weight: ${Type.FONT_WEIGHT_REGULAR};
  font-size: 1em;
`;
const BODY_BOLD = `
  ${BODY}
  font-weight: ${Type.FONT_WEIGHT_BOLD};
`;

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
