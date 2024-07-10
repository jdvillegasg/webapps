import { useUserAnswers } from "./hooks/useuserans";
import { Button } from "@mui/material";
import { useQuestionsStore } from "./store/questions";
export const Footer = () => {
  const { correct, incorrect, unanswered } = useUserAnswers();
  const { reset } = useQuestionsStore();

  return (
    <footer style={{ marginTop: "16px", textAlign: "center" }}>
      <strong>{`No. correct: ${correct} - No. incorrect: ${incorrect} - No. unanswered: ${unanswered}`}</strong>
      <div style={{ marginTop: "16px" }}>
        <Button onClick={reset}>Reset game</Button>
      </div>
    </footer>
  );
};
