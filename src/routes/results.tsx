import { styled } from "@linaria/react";
import { createFileRoute } from "@tanstack/react-router";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useCallback, useMemo, useState } from "react";
import { loadFull } from "tsparticles";

import { useStore } from "@/store";
import { Button } from "@/styles/buttons";
import { border, borderRadius, colors, page, type } from "@/styles/core";
import { COLUMN, Row } from "@/styles/layout";
import Text from "@/styles/typography";
import { useConfettiConfig } from "@/utils/confetti";
import { MEDALS, numberAsEmojis } from "@/utils/emojis";

export const Route = createFileRoute("/results")({
  component: Component,
  loader: async ({ navigate }) => {
    const currentPuzzle = useStore.getState().currentPuzzle;
    const lastPlayedPuzzle = useStore.getState().game.puzzle;

    if (currentPuzzle !== lastPlayedPuzzle) {
      navigate({ to: "/", replace: true });
    }

    await initParticlesEngine(async (engine) => {
      await loadFull(engine);
    });
  },
});

const Results = styled.div`
  ${COLUMN}
  gap: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PageBody = styled.div`
  z-index: 1;
  flex: 1 1 auto;
  width: 100%;
  max-width: ${page.maxWidth};
  padding: 12px 20px;
  overflow-y: auto;
`;

const Title = styled.h1`
  ${type.headline2}
  margin-bottom: 20px;
`;

const ScoreContainer = styled(Row)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 16px;
  background: ${colors.white};
  border: ${border.thin};
  border-radius: ${borderRadius.medium};
`;

const ScoreLabel = styled.h2`
  ${type.overline}
  color: ${colors.black};
`;

const Score = styled.div`
  ${type.score}
`;

const CardHeader = styled.h2`
  ${type.overline}
`;

const Card = styled.div<{ row?: boolean }>`
  display: flex;
  flex-flow: ${({ row }) => (row ? "row" : "column")} nowrap;
  align-items: ${({ row }) => (row ? "center" : "flex-start")};
  justify-content: ${({ row }) => (row ? "space-between" : "flex-start")};
  margin-bottom: 8px;
  padding: 24px 16px;
  color: ${colors.black};
  background: ${colors.green500};
  border: ${border.thin};
  border-radius: ${borderRadius.medium};

  /* stylelint-disable-next-line selector-class-pattern */
  ${CardHeader} {
    margin-bottom: ${({ row }) => (row ? "0" : "8px")};
  }
`;

const ResultLabel = styled.div`
  ${type.headline3}
`;

const ResultValue = styled.div`
  ${type.scoreSmall}
`;

const ResultValueRow = styled(ResultValue)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 12px;

  & + & {
    margin-top: 12px;
    border-top: ${border.thin};
  }
`;

const PageFooter = styled.footer`
  z-index: 1;
  flex: none;
  width: 100%;
  max-width: ${page.maxWidth};
  padding: 8px 20px max(env(safe-area-inset-bottom), 12px);
  overflow: hidden;
  background: ${colors.green500};
  border-top: ${border.thin};
`;

const ShareButton = styled(Button)`
  position: relative;
  width: 100%;
  overflow: visible;

  &::before {
    position: absolute;
    z-index: -1;
    border-radius: ${borderRadius.medium};
    opacity: 0;
    animation: rotate 4s linear infinite;
    content: " ";
    pointer-events: none;
    inset: 0;
  }

  @keyframes rotate {
    0% {
      outline: none;
      opacity: 0;
    }

    5% {
      outline: 0 solid ${colors.gold500};
      opacity: 1;
    }

    40% {
      outline: 100px solid ${colors.white};
      opacity: 0;
    }

    100% {
      outline: 100px solid ${colors.gold500};
      opacity: 0;
    }
  }
`;

// Position absolute prevents layout glitch while particles library is starting
// up.
const ConfettiBackground = styled(Particles)`
  position: absolute;
`;

function censorWord(word: string) {
  const censoredWord = word.charAt(0) + word.slice(1).replace(/./g, "_");
  return censoredWord.split("").join(" ");
}

function Component() {
  const [copied, setCopied] = useState(false);

  const score = useStore((state) => state.game.score);
  const words = useStore((state) => state.game.words);
  const id = useStore((state) => state.game.puzzle);

  const bestWords = useMemo(
    () => [...words].sort((a, b) => b.score - a.score),
    [words],
  );
  const bestWordsToShow = useMemo(() => bestWords.slice(0, 3), [bestWords]);
  const bestWordsFormatted = useMemo(() => {
    return bestWordsToShow
      .map(({ word, score }, index) => {
        return `${MEDALS[index]} ${censorWord(word)} (${score} pts)`;
      })
      .join("\n");
  }, [bestWordsToShow]);

  const shareResults = useCallback(() => {
    const shareDetails = {
      title: `Woggle #${id}`,
      text: `
==  Woggle #${id}  ==
= playwoggle.com =

Score: ${numberAsEmojis(score)} pts

Best words:
${bestWordsFormatted}

`.trim(),
    };

    if (navigator.share) {
      navigator.share(shareDetails);
    } else {
      navigator.clipboard.writeText(shareDetails.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  }, [id, score, bestWordsFormatted]);

  const options = useConfettiConfig();

  return (
    <Results>
      <ConfettiBackground options={options} />
      <PageBody>
        <Title>Results</Title>
        <ScoreContainer>
          <Score>{score}</Score>
          <ScoreLabel>Score</ScoreLabel>
        </ScoreContainer>
        <Card row>
          <Text style="headline3">{words.length}</Text>
          <CardHeader>Words Swiped</CardHeader>
        </Card>
        <Card>
          <CardHeader>Best Words</CardHeader>
          {bestWords.map(({ word, score }) => (
            <ResultValueRow key={word}>
              <ResultLabel>{word.toLowerCase()}</ResultLabel>
              <span>{score} pts</span>
            </ResultValueRow>
          ))}
        </Card>
      </PageBody>

      <PageFooter>
        <ShareButton onClick={shareResults}>
          {copied ? "Copied!" : "Share results"}
        </ShareButton>
      </PageFooter>
    </Results>
  );
}
