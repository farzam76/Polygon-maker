import { createRoot } from "react-dom/client";
import "tailwindcss/tailwind.css";
import App from "App";
import { Provider } from "react-redux";
import { store, persistor } from "modules/store";
import { PersistGate } from "redux-persist/integration/react";
import "./i18n";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
