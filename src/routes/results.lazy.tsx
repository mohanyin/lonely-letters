import { styled } from "@linaria/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";

import { useGameStore } from "@/store/game";
import { Border, BorderRadius, Colors, TypeStyles } from "@/styles/core";
import { getScore } from "@/utils/scoring";

export const Route = createLazyFileRoute("/results")({
  component: About,
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
  border-radius: ${BorderRadius.LARGE} 0;
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
  border-radius: ${BorderRadius.LARGE} 0;

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
  "border-radius": `${BorderRadius.LARGE} 0 ${BorderRadius.LARGE}`,
};
const Button = styled.button`
  ${ButtonStyles}
`;

function About() {
  const score = useGameStore((state) => state.score);
  const id = useGameStore((state) => state.id);
  const words = useGameStore((state) => state.words);

  const bestWords = words
    .map((word) => ({ word, score: getScore(word) }))
    .sort((a, b) => b.score - a.score);
  const bestWordsToShow = bestWords.slice(0, 3);

  const shareResults = useCallback(() => {
    const medals = ["🥇", "🥈", "🥉"];
    const shareDetails = {
      title: `Woggle #${id}`,
      text: `🤩 ${score} pts 🤩

Best Words:
${bestWordsToShow
  .map(({ word, score }, index) => `${medals[index]} ${word} - (${score} pts)`)
  .join("\n")}`,
    };
    if (!navigator.share) {
      console.info(shareDetails);
    } else {
      navigator.share(shareDetails);
    }
  }, [id, score, bestWordsToShow]);

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

      <Button onClick={shareResults}>Share</Button>
    </Page>
  );
}
