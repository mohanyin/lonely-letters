import { styled } from "@linaria/react";
import { useEffect } from "react";

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
  max-width: 38vh;
  padding: 12px 32px max(env(safe-area-inset-bottom), 20px);
`;

function App() {
  const start = useGameStore((store) => store.start);

  useEffect(() => start(), [start]);

  return (
    <AppStyles>
      <AppBar />

      <MainStyles>
        <Display />
        <Grid />
        <Footer />
      </MainStyles>
    </AppStyles>
  );
}

export default App;
