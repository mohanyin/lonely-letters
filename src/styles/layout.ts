import { styled } from "@linaria/react";

export const ROW = {
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px",
};

export const Row = styled.div<{ gap?: string }>`
  ${ROW}
  gap: ${({ gap }) => gap || "8px"};
`;

export const CENTER = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const Center = styled.div`
  ${CENTER}
`;

export const CENTER_COLUMN = {
  ...CENTER,
  flexFlow: "column nowrap",
};

export const CenterColumn = styled.div`
  ${CENTER_COLUMN}
`;

export const COLUMN = {
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
  gap: "8px",
};

export const Column = styled.div<{ gap?: string }>`
  ${COLUMN}
  gap: ${({ gap }) => gap || "8px"};
`;
