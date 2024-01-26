import { styled } from "@linaria/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import Display from "@/components/game/Display";
import Footer from "@/components/game/Footer";
import Grid from "@/components/game/Grid";
import { useGameStore } from "@/store/game";

export const Route = createFileRoute("/")({
  component: Index,
});

const MainStyles = styled.main`
  display: flex;
  flex: 1 1 auto;
  flex-flow: column nowrap;
  gap: 16px;
  justify-content: space-around;
  width: 100%;
  max-width: 50vh;
  padding: 12px 32px max(env(safe-area-inset-bottom), 20px);
`;

function Index() {
  const start = useGameStore((store) => store.start);
  const remainingTiles = useGameStore((store) => store.remainingTiles);
  const placeTile = useGameStore((store) => store.placeTile);

  useEffect(() => {
    if (remainingTiles.length === 0) {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [dragLocation, setDragLocation] = useState<null | {
    x: number;
    y: number;
  }>(null);
  const [activeTile, setActiveTile] = useState<null | number>(null);

  return (
    <MainStyles>
      <Display />
      <Grid highlight={dragLocation} onHighlight={setActiveTile} />
      <Footer
        onDragStart={(pos) => setDragLocation(pos)}
        onDragMove={(pos) => setDragLocation(pos)}
        onDragEnd={() => {
          setDragLocation(null);
          if (activeTile !== null) {
            setActiveTile(null);
            placeTile(activeTile);
          }
        }}
      />
    </MainStyles>
  );
}
