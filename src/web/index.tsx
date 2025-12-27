import React, { Component, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
// @ts-ignore
import "./index.css";

// Error Boundary Minimal
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
    console.log("[CEF] ErrorBoundary initialized.");
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("UI CRASHED:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: "red", backgroundColor: "black", height: "100vh" }}>
          <h1>UI CRASHED</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

console.log("[CEF] Bootstrap starting...");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Fallback: Dacă EventManager nu a trimis deja, trimitem direct către mp
if (window.mp) {
    console.log("[CEF] mp object found, sending ui:ready fallback");
    window.mp.trigger("ui:ready");
} else {
    console.warn("[CEF] mp object NOT found in index.tsx");
}