import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Profile from "./Profile.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

async function enableMocking() {
  if (!import.meta.env.VITE_ENABLE_MSW) {
    return;
  }

  const worker = await import("../../../packages/core/mocks/worker");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.serviceWorker.start();
}
enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <Profile />
    </React.StrictMode>,
  );
});
