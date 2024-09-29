import { border, borderRadius, colors } from "@/styles/core";

const height = 80;
const gap = 12;
const baseStyles = {
  position: "relative",
  height: `${height}px`,
  overflow: "hidden",
  background: colors.white,
  borderRadius: borderRadius.medium,
  outline: border.thin,
};

export default {
  height,
  gap,
  baseStyles,
};
