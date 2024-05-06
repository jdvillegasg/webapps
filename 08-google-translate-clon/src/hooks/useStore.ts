import { AUTO_LANGUAGE } from "../constants";
import { TranslatorState, Action, Language, FromLanguage } from "../types";
import { useReducer } from "react";

const initialState: TranslatorState = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  result: "",
  loading: false,
};

const reducer = (state: TranslatorState, action: Action): TranslatorState => {
  const { type } = action;
  switch (type) {
    case "INTERCHANGE_LANGUAGES": {
      if (state.fromLanguage === AUTO_LANGUAGE) return state;
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
      };
    }
    case "SET_FROM_LANGUAGE": {
      return {
        ...state,
        fromLanguage: action.payload,
      };
    }
    case "SET_TO_LANGUAGE": {
      return {
        ...state,
        toLanguage: action.payload,
      };
    }
    case "SET_FROM_TEXT": {
      return {
        ...state,
        loading: true,
        fromText: action.payload,
      };
    }
    case "SET_RESULT": {
      return {
        ...state,
        loading: false,
        result: action.payload,
      };
    }
  }
  return state;
};

export function useStore() {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  const interchangeLanguages = () =>
    dispatch({ type: "INTERCHANGE_LANGUAGES" });

  const setFromLanguage = (payload: FromLanguage) =>
    dispatch({ type: "SET_FROM_LANGUAGE", payload });

  const setToLanguage = (payload: Language) =>
    dispatch({ type: "SET_TO_LANGUAGE", payload });

  const setFromText = (payload: string) =>
    dispatch({ type: "SET_FROM_TEXT", payload });

  const setResult = (payload: string) =>
    dispatch({ type: "SET_RESULT", payload });

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}
