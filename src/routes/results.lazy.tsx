import { styled } from "@linaria/react";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";

import { useStore } from "@/store";
import { Border, BorderRadius, Colors, TypeStyles } from "@/styles/core";
import { MEDALS, numberAsEmojis } from "@/utils/emojis";

export const Route = createFileRoute("/results")({
  component: Results,
  loader: ({ navigate }) => {
    const currentPuzzle = useStore.getState().currentPuzzle;
    const lastPlayedPuzzle = useStore.getState().game.puzzle;

    if (currentPuzzle !== lastPlayedPuzzle) {
      navigate({ to: "/", replace: true });
    }
  },
});

const Page = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100%;
  padding: 20px;
`;

const Title = styled.h1`
  ${TypeStyles.HEADLINE_2}
  margin-bottom: 20px;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 24px 20px;
  background: ${Colors.WHITE};
  border: ${Border.THIN};
  border-radius: ${BorderRadius.MEDIUM} 0;
`;

const ScoreLabel = styled.h2`
  ${TypeStyles.OVERLINE}
  color: ${Colors.BLACK};
`;

const Score = styled.div`
  ${TypeStyles.SCORE}
`;

const DetailsContainer = styled.div`
  padding-left: 16px;
  border-left: ${Border.THIN};
`;

const CardHeader = styled.h2`
  ${TypeStyles.OVERLINE}
`;

const Card = styled.div<{ row?: boolean }>`
  display: flex;
  flex-flow: ${({ row }) => (row ? "row" : "column")} nowrap;
  align-items: ${({ row }) => (row ? "center" : "flex-start")};
  justify-content: ${({ row }) => (row ? "space-between" : "flex-start")};
  margin-bottom: 8px;
  padding: 24px 20px;
  color: ${Colors.WHITE};
  background: ${Colors.BLACK};
  border-radius: ${BorderRadius.MEDIUM} 0;

  /* stylelint-disable-next-line selector-class-pattern */
  ${CardHeader} {
    margin-bottom: ${({ row }) => (row ? "0" : "8px")};
  }
`;

const ResultValue = styled.div`
  ${TypeStyles.HEADLINE_3}
  color: ${Colors.WHITE};
`;

const ResultValueRow = styled(ResultValue)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 4px 0;
`;

const ButtonStyles = {
  ...TypeStyles.HEADLINE_3,
  padding: "12px 16px",
  background: Colors.GOLD,
  border: Border.THIN,
  width: "100%",
  "margin-top": "32px",
  "border-bottom-width": "4px",
  "border-radius": `${BorderRadius.MEDIUM} 0 ${BorderRadius.MEDIUM}`,
};
const Button = styled.button`
  ${ButtonStyles}
`;

function censorWord(word: string) {
  const censoredWord = word.charAt(0) + word.slice(1).replace(/./g, "_");
  return censoredWord.split("").join(" ");
}

function Results() {
  const score = useStore((state) => state.game.score);
  const words = useStore((state) => state.game.words);
  const id = useStore((state) => state.puzzle.id);

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
Woggle #${id}
Score: ${numberAsEmojis(score)} pts

Best words:
${bestWordsFormatted}`.trim(),
    };

    navigator.share
      ? navigator.share(shareDetails)
      : console.info(shareDetails);
  }, [id, score, bestWordsFormatted]);

  return (
    <Page>
      <Title>Results</Title>
      <ScoreContainer>
        <ScoreLabel>Score</ScoreLabel>
        <Score>{score} pts</Score>
      </ScoreContainer>
      <DetailsContainer>
        <Card row>
          <CardHeader>Words Swiped</CardHeader>
          <ResultValue>{words.length}</ResultValue>
        </Card>
        <Card>
          <CardHeader>Best Words</CardHeader>
          {bestWordsToShow.map(({ word, score }) => (
            <ResultValueRow key={word}>
              <span>“{word.toLowerCase()}”</span>
              <span>{score} pts</span>
            </ResultValueRow>
          ))}
        </Card>
      </DetailsContainer>

      <Button onClick={shareResults}>Share results</Button>
    </Page>
  );
}
