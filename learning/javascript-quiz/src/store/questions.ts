import { create } from "zustand";
import { type Question } from "../types";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questId: number, ansIdx: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => ({
      questions: [],
      currentQuestion: 0,

      fetchQuestions: async (limit: number) => {
        const res = await fetch("http://localhost:5173/data.json");
        const json = await res.json();

        const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
        set({ questions });
      },

      selectAnswer: (questId: number, ansIdx: number) => {
        const { questions } = get();
        const newQuestions = structuredClone(questions);
        const questionIdx = newQuestions.findIndex(
          (quest) => quest.id === questId
        );
        const questionInfo = newQuestions[questionIdx];
        const isCorrectUserAnswer = questionInfo.correctAnswer === ansIdx;

        if (isCorrectUserAnswer) confetti();

        newQuestions[questionIdx] = {
          ...questionInfo,
          isCorrectUserAnswer,
          userSelectedAnswer: ansIdx,
        };

        set({ questions: newQuestions });
      },

      goNextQuestion: () => {
        const { questions, currentQuestion } = get();
        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < questions.length) {
          set({ currentQuestion: nextQuestion });
        }
      },

      goPreviousQuestion: () => {
        const { currentQuestion } = get();
        const prevQuestion = currentQuestion - 1;

        if (prevQuestion >= 0) {
          set({ currentQuestion: prevQuestion });
        }
      },

      reset: () => {
        set({ currentQuestion: 0, questions: [] });
      },
    }),
    { name: "questions" }
  )
);
