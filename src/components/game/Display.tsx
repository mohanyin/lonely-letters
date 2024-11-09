import { styled } from "@linaria/react";
import { useMemo } from "react";

import DisplayGame from "@/components/game/DisplayGame";
import DisplayWord from "@/components/game/DisplayWord";
import { useIsSelecting } from "@/store";
import { border, borderRadius, colors, page } from "@/styles/core";
import display from "@/styles/display";
import { Column } from "@/styles/layout";

const Container = styled.div`
  width: 100%;
  max-width: ${page.width};
  padding: 0 ${page.paddingHorizontal};
`;

const Wrapper = styled.div<{ initialized: boolean }>`
  height: ${display.height}px;
  overflow: hidden;
  background: ${({ initialized }) =>
    initialized ? colors.green600 : "transparent"};
  border: ${border.thin};
  border-top-width: ${({ initialized }) => (initialized ? "2px" : "1px")};
  border-radius: ${borderRadius.medium};
  transition: all 0.5s ease-in-out;
`;

const animationDistance = display.height + display.gap;
const Track = styled(Column)<{ slide: number }>`
  gap: ${display.gap}px;
  align-items: stretch;
  margin: -2px -1px -1px;
  transform: translateY(${({ slide }) => -1 * slide * animationDistance}px);
  transition: transform 0.4s ease;
`;

function Display({ initialized }: { initialized: boolean }) {
  const isSelecting = useIsSelecting();
  const slide = useMemo(() => {
    if (!initialized) {
      return -1;
    } else if (isSelecting) {
      return 1;
    } else {
      return 0;
    }
  }, [isSelecting, initialized]);

  return (
    <Container>
      <Wrapper initialized={initialized}>
        <Track slide={slide}>
          <DisplayGame />
          <DisplayWord />
        </Track>
      </Wrapper>
    </Container>
  );
}

export default Display;
