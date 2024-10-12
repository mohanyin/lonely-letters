export const page = {
  width: "55svh",
  maxWidth: "min(100vw, 500px)",
  paddingHorizontal: "20px",
} as const;

export const colors = {
  textPrimary: "#050505",

  white: "#FFFFFF",
  gray100: "#F5F5F5",
  black: "#050505",
  green500: "#00ECA5",
  green600: "#07D194",
  gold500: "#FFBE15",
  gold600: "#EEB011",
  red500: "#EF536D",
  red600: "#E03B5D",
} as const;

export const font = {
  default: "IBM Plex Sans, sans-serif",
  condensed: "IBM Plex Sans Condensed, sans-serif",
  score: "Zen Dots, sans-serif",
} as const;

export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
} as const;

export const border = {
  thin: `1px solid ${colors.black}`,
  dashed: `1px dashed ${colors.black}`,
  thinWhite: `1px solid ${colors.white}`,
} as const;

const scoreBase = {
  fontFamily: font.score,
  lineHeight: 1,
} as const;
const score = { ...scoreBase, fontSize: "2.67em" } as const;
const scoreMedium = { ...scoreBase, fontSize: "2em" } as const;
const scoreSmall = { ...scoreBase, fontSize: "1.125em" } as const;

const headlineBase = {
  fontFamily: font.default,
  fontWeight: fontWeight.semibold,
  lineHeight: 1.2,
} as const;
const headline1 = { ...headlineBase, fontSize: "3.5em" } as const;
const headline2 = { ...headlineBase, fontSize: "1.375em" } as const;
const headline3 = { ...headlineBase, fontSize: "1.125em" } as const;

const overlineBase = {
  fontFamily: font.condensed,
  fontWeight: fontWeight.medium,
  lineHeight: 1,
  textTransform: "uppercase",
} as const;
const overline = {
  ...overlineBase,
  fontSize: "1em",
  letterSpacing: `${2 / 16}em`,
} as const;
const overlineSmall = {
  ...overlineBase,
  fontSize: "0.8125em",
  letterSpacing: `${1 / 10}em`,
} as const;

const body = {
  fontFamily: font.default,
  fontWeight: fontWeight.regular,
  fontSize: "1em",
  lineHeight: 1.375,
} as const;
const bodyItalic = { ...body, fontStyle: "italic" } as const;
const bodyBold = { ...body, fontWeight: fontWeight.semibold } as const;

const caption = {
  fontFamily: font.default,
  fontWeight: fontWeight.regular,
  fontSize: "0.75em",
  lineHeight: 1.25,
} as const;
const captionItalic = { ...caption, fontStyle: "italic" } as const;

export const type = {
  score,
  scoreMedium,
  scoreSmall,
  headline1,
  headline2,
  headline3,
  overline,
  overlineSmall,
  body,
  bodyItalic,
  bodyBold,
  caption,
  captionItalic,
} as const;

export const borderRadius = {
  small: "4px",
  medium: "12px",
  large: "24px",
  round: "1000px",
};
