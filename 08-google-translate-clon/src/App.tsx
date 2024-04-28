import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useReducer } from "react";
import { TranslatorState, Action } from "./types";

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

function App() {
  const [{ fromLanguage }, dispatch] = useReducer(reducer, initialState);

  console.log(fromLanguage);

  return (
    <div className="App">
      <h1>Google Translate</h1>
      <button
        onClick={() => {
          dispatch({ type: "SET_FROM_LANGUAGE", payload: "es" });
        }}
      >
        Change to spanish
      </button>
    </div>
  );
}

export default App;
