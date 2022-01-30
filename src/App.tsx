import { PropsWithChildren, ReactElement } from "react";
import { Switch, SwitchProps } from "@mui/material";
import "./App.css";
import { toggleActions, ToggleProvider, useToggle } from "./ToggleContext";

const Toggle = ({
  initialOn = false,
  children
}: PropsWithChildren<{ initialOn?: boolean }>) => {
  return <ToggleProvider on={initialOn}>{children}</ToggleProvider>;
};

const ToggleOn = ({ children }: PropsWithChildren<unknown>): ReactElement => {
  const [{ on }] = useToggle();
  return <>{on ? children : null}</>;
};

const ToggleOff = ({ children }: PropsWithChildren<unknown>): ReactElement => {
  const [{ on }] = useToggle();
  return <>{on ? null : children}</>;
};

const ToggleButton = (props: Omit<SwitchProps, "checked" | "onClick">) => {
  const [{ on }, dispatch] = useToggle();
  const handleToggle = () => toggleActions.toggleMenu(dispatch);
  return <Switch checked={on} onClick={handleToggle} {...props} />;
};

function App() {
  return (
    <div className="App">
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  );
}

export default App;
