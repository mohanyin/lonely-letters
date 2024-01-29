import { styled } from "@linaria/react";

export const ROW = `
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

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
