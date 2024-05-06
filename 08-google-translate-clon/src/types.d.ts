import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "./constants";

export type Language = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;
export type FromLanguage = Language | AutoLanguage;

export interface TranslatorState {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  fromText: string;
  result: string;
  loading: boolean;
}

export type ActionTypes =
  | "INTERCHANGE_LANGUAGES"
  | "SET_FROM_LANGUAGE"
  | "SET_TO_LANGUAGE"
  | "SET_FROM_TEXT"
  | "SET_RESULT";

interface ActionA {
  type: ActionTypes;
  payload: string;
}

export type Action =
  | { type: "INTERCHANGE_LANGUAGES" }
  | { type: "SET_FROM_LANGUAGE"; payload: FromLanguage }
  | { type: "SET_TO_LANGUAGE"; payload: Language }
  | { type: "SET_FROM_TEXT"; payload: string }
  | { type: "SET_RESULT"; payload: string };
