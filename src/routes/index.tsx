import { styled } from "@linaria/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import Display from "@/components/game/Display";
import Footer from "@/components/game/Footer";
import Grid from "@/components/game/Grid";
import { useStore } from "@/store";
import { importTries } from "@/utils/dictionary";

export const Route = createFileRoute("/")({
  component: Index,
});

const Main = function ({
  className,
  children,
  styles,
}: {
  className?: string;
  children?: React.ReactNode;
  styles?: React.CSSProperties;
}) {
  return (
    <main className={className} style={styles}>
      {children}
    </main>
  );
};
const MainStyles = styled(Main)`
  display: flex;
  flex: 1 1 auto;
  flex-flow: column nowrap;
  gap: 16px;
  justify-content: space-around;
  width: 100%;
  max-width: 49vh;
  padding: 12px 32px max(env(safe-area-inset-bottom), 20px);
`;

function Index() {
  const startOrResume = useStore((store) => store.startOrResume);
  const placeTile = useStore((store) => store.placeTile);

  useEffect(() => {
    importTries();
    startOrResume();
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
