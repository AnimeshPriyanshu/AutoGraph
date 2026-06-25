import CanvasView from "../canvas/CanvasView";
import PromptBar from "../components/PromptBar";

export default function Editor() {
  return (
    <div className="editor-root">
      <header className="editor-header">
        <div className="logo">
          <span className="logo-icon">◆</span>
          <span className="logo-text">AutoGraph</span>
        </div>
        <span className="header-tag">AI-Native Diagram Generator</span>
      </header>

      <main className="editor-canvas">
        <CanvasView />
      </main>

      <footer className="editor-footer">
        <PromptBar />
      </footer>
    </div>
  );
}
