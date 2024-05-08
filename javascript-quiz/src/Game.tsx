import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Card,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { useQuestionsStore } from "./store/questions";
import { type Question as QuestionType } from "./types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";

const getBackgroundColor = (info: QuestionType, idx: number) => {
  const { userSelectedAnswer, correctAnswer } = info;

  // User hasn't choose any answer yet
  if (userSelectedAnswer == null) return "transparent";

  // we are looking an incorrect answer not chosen by the user
  if (idx !== correctAnswer && idx !== userSelectedAnswer) return "transparent";

  // we are looking the correct answer
  if (idx === correctAnswer) return "green";

  // we are looking the answer chosen by the user
  if (idx === userSelectedAnswer) return "red";

  return "transparent";
};

const Question = ({ info }: { info: QuestionType }) => {
  const { selectAnswer } = useQuestionsStore();

  const createHandleClick = (answerIdx: number) => () => {
    selectAnswer(info.id, answerIdx);
  };

  return (
    <Card variant="outlined" sx={{ p: 2, mt: 2 }}>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        {info.question}
      </Typography>
      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ backgroundColor: "#f5f5f5" }}>
        {info.answers.map((answer, idx) => (
          <ListItem key={idx} divider>
            <ListItemButton
              onClick={createHandleClick(idx)}
              sx={{ backgroundColor: getBackgroundColor(info, idx) }}
              disabled={info.userSelectedAnswer != null}
            >
              <ListItemText
                primary={answer}
                sx={{ textAlign: "center" }}
              ></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export function Game() {
  const { questions, currentQuestion, goNextQuestion, goPreviousQuestion } =
    useQuestionsStore();
  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          onClick={goPreviousQuestion}
          disabled={currentQuestion === 0}
        >
          <ArrowBackIosNew></ArrowBackIosNew>
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion === questions.length - 1}
        >
          <ArrowForwardIos></ArrowForwardIos>
        </IconButton>
      </Stack>

      <Question info={questionInfo}></Question>
      <Footer></Footer>
    </>
  );
}
