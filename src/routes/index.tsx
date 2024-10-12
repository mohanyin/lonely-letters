import { styled } from "@linaria/react";
import { createFileRoute } from "@tanstack/react-router";
import { ReactPortal, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import IntroDrawer from "@/components/IntroDrawer";
import Display from "@/components/game/Display";
import Footer from "@/components/game/Footer";
import Grid from "@/components/game/Grid";
import { useStore } from "@/store";
import { page } from "@/styles/core";
import { CENTER_COLUMN } from "@/styles/layout";
import { importTries } from "@/utils/dictionary";

export const Route = createFileRoute("/")({
  component: Index,
});

const Main = styled.main`
  ${CENTER_COLUMN}
  flex: 1 1 auto;
  gap: 16px;
  justify-content: space-between;
  width: 100%;
  padding: 12px 0 max(env(safe-area-inset-bottom), 12px);
`;

const GridAndFooter = styled.div`
  ${CENTER_COLUMN}
  flex: 1 1 100%;
  gap: 16px;
  justify-content: flex-start;
  width: ${page.width};
  max-width: ${page.maxWidth};
  padding: 0 ${page.paddingHorizontal};
`;

function Index() {
  const startOrResume = useStore((store) => store.startOrResume);
  const placeTile = useStore((store) => store.placeTile);
  const [drawer, setDrawer] = useState<ReactPortal | null>(null);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    importTries();
    startOrResume();
    setDrawer(
      createPortal(
        <IntroDrawer />,
        document.querySelector("[data-app-bar-right]")!,
      ),
    );
    setTimeout(() => {
      setInitialized(true);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [dragLocation, setDragLocation] = useState<null | {
    x: number;
    y: number;
  }>(null);
  const [activeTile, setActiveTile] = useState<null | number>(null);

  return (
    <Main>
      {drawer}
      <Display initialized={initialized} />
      <GridAndFooter>
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
      </GridAndFooter>
    </Main>
  );
}
