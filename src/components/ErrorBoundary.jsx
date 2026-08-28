import { Component } from "react";

/** Keeps one unexpected render failure from turning the whole story world white. */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    // Keep diagnostics available to the browser console without exposing them
    // in the child-facing recovery screen.
    console.error("Snackville could not render", error, info);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <main className="error-screen">
        <div className="error-card">
          <span className="error-mark" aria-hidden="true">🍓</span>
          <p className="eyebrow">A tiny detour</p>
          <h1>Snackville lost a little magic.</h1>
          <p>Piper is already looking for it. Refresh the page and the path should appear again.</p>
          <button className="btn b-straw" type="button" onClick={() => window.location.reload()}>
            Return to Snackville
          </button>
        </div>
      </main>
    );
  }
}
