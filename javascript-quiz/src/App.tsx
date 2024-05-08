import { Container, Typography, Stack } from "@mui/material";
import { JavaScriptLogo } from "./JavaScriptLogo";
import { Start } from "./Start.tsx";
import { useQuestionsStore } from "./store/questions.ts";
import { Game } from "./Game.tsx";

function App() {
  const { questions } = useQuestionsStore();

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <JavaScriptLogo></JavaScriptLogo>
          <Typography variant="h2" component="h1">
            JavaScript Quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start></Start>}
        {questions.length > 0 && <Game></Game>}
      </Container>
    </main>
  );
}

export default App;
