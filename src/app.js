import { AppRegistry } from "react-native";
import { useEffect, useMemo } from "react";
import { name } from "../app";
import { StoreProvider } from "picofly/react";
import { createStore } from "store";
import { init } from "store/init";
import UI from "ui";
import { Cfg } from "const";

function App() {
  const app = useMemo(createStore, []);

  useEffect(() => {
    void init(app, Cfg);
  }, []);

  return (
    <StoreProvider value={app}>
      <UI />
    </StoreProvider>
  );
}

AppRegistry.registerComponent(name, () => App);
