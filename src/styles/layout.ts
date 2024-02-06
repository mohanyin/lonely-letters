import { styled } from "@linaria/react";

export const ROW = {
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px",
};

export const Row = styled.div`
  ${ROW}
`;

export const ROW_RIGHT = `
  ${ROW}
  justify-content: flex-end;
`;

export const RowRight = styled.div`
  ${ROW_RIGHT}
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
