import { styled } from "@linaria/react";

export const Page = {
  MAX_WIDTH: "500px",
  PADDING_HORIZONTAL: "20px",
};

export const Colors = {
  WHITE: "#FFFFFF",
  GRAY_100: "#F5F5F5",
  BLACK: "#050505",
  GREEN_500: "#00ECA5",
  GREEN_600: "#07D194",
  GOLD_500: "#FFBE15",
  GOLD_600: "#EEB011",
  RED_500: "#EF536D",
  RED_600: "#E03B5D",
};

export const Type = {
  FONT_FAMILY: "IBM Plex Sans, sans-serif",
  FONT_FAMILY_CONDENSED: "IBM Plex Sans Condensed, sans-serif",
  FONT_FAMILY_DISPLAY: "Zen Dots, sans-serif",
  FONT_WEIGHT_LIGHT: 300,
  FONT_WEIGHT_REGULAR: 400,
  FONT_WEIGHT_MEDIUM: 500,
  FONT_WEIGHT_SEMI_BOLD: 600,
  FONT_WEIGHT_BOLD: 700,
};

export const Border = {
  THIN: `1px solid ${Colors.BLACK}`,
  THIN_WHITE: `1px solid ${Colors.WHITE}`,
  THIN_RED: `1px solid ${Colors.RED_500}`,
  THIN_GOLD: `1px solid ${Colors.GOLD_500}`,
  THIN_GREEN: `1px solid ${Colors.GREEN_500}`,
};

const SCORE = {
  fontFamily: Type.FONT_FAMILY_DISPLAY,
  fontSize: "2.625em",
  lineHeight: 1,
};

const SCORE_MEDIUM = { ...SCORE, fontSize: "2em" };
const SCORE_SMALL = { ...SCORE, fontSize: "1.2em" };

const HEADLINE_1 = {
  fontFamily: Type.FONT_FAMILY,
  fontWeight: Type.FONT_WEIGHT_SEMI_BOLD,
  fontSize: "3.5em",
  lineHeight: 1.2,
};
const HEADLINE_2 = {
  ...HEADLINE_1,
  fontSize: "1.375em",
};
const HEADLINE_3 = {
  ...HEADLINE_1,
  fontSize: "1.125em",
};
const OVERLINE = {
  fontFamily: Type.FONT_FAMILY_CONDENSED,
  fontWeight: Type.FONT_WEIGHT_MEDIUM,
  fontSize: "1em",
  letterSpacing: `${2 / 16}em`,
  lineHeight: 1,
  textTransform: "uppercase",
};
const OVERLINE_SMALL = {
  ...OVERLINE,
  fontSize: "0.8125em",
  letterSpacing: `${1 / 10}em`,
};
const BODY = {
  fontFamily: Type.FONT_FAMILY,
  fontWeight: Type.FONT_WEIGHT_REGULAR,
  fontSize: "1em",
  lineHeight: 1.375,
};
const BODY_ITALIC = {
  ...BODY,
  fontStyle: "italic",
};
const BODY_BOLD = {
  ...BODY,
  fontWeight: Type.FONT_WEIGHT_BOLD,
};
const CAPTION = {
  fontFamily: Type.FONT_FAMILY,
  fontWeight: Type.FONT_WEIGHT_REGULAR,
  fontSize: "0.75em",
  lineHeight: 1.25,
};
const CAPTION_ITALIC = {
  ...CAPTION,
  fontStyle: "italic",
};

export const TypeStyles = {
  SCORE,
  SCORE_MEDIUM,
  SCORE_SMALL,
  HEADLINE_1,
  HEADLINE_2,
  HEADLINE_3,
  OVERLINE,
  OVERLINE_SMALL,
  BODY,
  BODY_ITALIC,
  BODY_BOLD,
  CAPTION,
  CAPTION_ITALIC,
};

export const BorderRadius = {
  SMALL: "4px",
  SMALL_LEAF: "4px 0 4px",
  MEDIUM: "12px",
  MEDIUM_RIGHT: "0 12px 12px 0",
  LARGE: "24px",
  LARGE_LEAF: "24px 0 24px",
  ROUNDED: "1000px",
  ROUNDED_LEFT: "1000px 0 0 1000px",
};

export const Headline2 = styled.div`
  ${TypeStyles.HEADLINE_2}
`;
export const Headline3 = styled.div`
  ${TypeStyles.HEADLINE_3}
`;
export const Overline = styled.div`
  ${TypeStyles.OVERLINE}
`;
