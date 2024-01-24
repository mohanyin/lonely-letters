import { styled } from "@linaria/react";
import { useEffect, useState } from "react";

import AppBar from "@/components/AppBar";
import Display from "@/components/game/Display";
import Footer from "@/components/game/Footer";
import Grid from "@/components/game/Grid";
import { useGameStore } from "@/store/game";
import { Type } from "@/styles/core";

import "@/App.css";

const AppStyles = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  font-family: "${Type.FONT_FAMILY}";
`;

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

function App() {
  const start = useGameStore((store) => store.start);
  const placeTile = useGameStore((store) => store.placeTile);

  useEffect(() => start(), [start]);
  const [dragLocation, setDragLocation] = useState<null | {
    x: number;
    y: number;
  }>(null);
  const [activeTile, setActiveTile] = useState<null | number>(null);
  return (
    <AppStyles>
      <AppBar />

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
    </AppStyles>
  );
}

export default App;
