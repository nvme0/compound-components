import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer
} from "react";

/**
 * State
 */

export interface ToggleState {
  on: boolean;
}

/**
 * Actions
 */

type ToggleAction = { type: "TOGGLE" };

export const toggleActions = {
  toggleMenu: (dispatch: Dispatch<ToggleAction>) => {
    dispatch({ type: "TOGGLE" });
  }
};

/**
 * Reducer
 */

const reducer = (state: ToggleState, action: ToggleAction) => {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, on: !state.on };

    default:
      return state;
  }
};

/**
 * Context
 */

const ToggleContext = createContext<[ToggleState, Dispatch<ToggleAction>]>(
  undefined!
);
ToggleContext.displayName = "ToggleContext";

export const ToggleProvider = ({
  children,
  on
}: PropsWithChildren<ToggleState>) => {
  const [state, dispatch] = useReducer(reducer, { on });
  return (
    <ToggleContext.Provider value={[state, dispatch]}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = () => {
  const context = useContext(ToggleContext);
  if (context === undefined) {
    throw new Error("ToggleContext must be used within a ToggleProvider");
  }
  return context;
};
