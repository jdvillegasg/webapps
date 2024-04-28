export interface TranslatorState {
  fromLanguage: InputLangs;
  toLanguage: OutputLangs;
  fromText: string;
  result: string;
  loading: boolean;
}

export type InputLangs = "auto" | "en" | "fr" | "es" | "de";
export type OutputLangs = "auto" | "en" | "fr" | "es" | "de";

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
  | { type: "SET_FROM_LANGUAGE"; payload: InputLangs }
  | { type: "SET_TO_LANGUAGE"; payload: OutputLangs }
  | { type: "SET_FROM_TEXT"; payload: string }
  | { type: "SET_RESULT"; payload: string };
