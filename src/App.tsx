import { styled } from "@linaria/react";
import { useState } from "react";

import AppBar from "@/components/AppBar";
import Display from "@/components/game/Display";
import Footer from "@/components/game/Footer";
import Grid from "@/components/game/Grid";
import { Type } from "@/styles/core";
import "@/App.css";

const AppStyles = styled.div`
  max-width: 1280px;
  padding: 20px;
  font-family: "${Type.FONT_FAMILY}";
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <AppStyles>
      <AppBar />

      <main>
        <Display />
        <Grid />
        <Footer />
      </main>
    </AppStyles>
  );
}

export default App;
