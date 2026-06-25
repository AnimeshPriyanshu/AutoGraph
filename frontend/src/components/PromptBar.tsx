import { useState } from "react";
import type { FormEvent } from "react";
import { useCanvasStore } from "../store/useCanvasStore";
import { generateDiagram } from "../services/api";

const EXAMPLE_PROMPTS = [
  "Design a scalable chat application architecture",
  "Create a Netflix-like streaming infrastructure",
  "Build a microservices e-commerce platform",
  "Visualize a CI/CD pipeline with Docker and Kubernetes",
];

export default function PromptBar() {
  const { prompt, setPrompt, setGraph, setIsLoading, isLoading, clearGraph } =
    useCanvasStore();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setError(null);
    setIsLoading(true);
    try {
      const data = await generateDiagram(prompt.trim());
      setGraph(data);
    } catch (err) {
      console.error("Generation failed:", err);
      setError("Failed to generate diagram. Make sure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (text: string) => {
    setPrompt(text);
  };

  return (
    <div className="prompt-bar">
      <form onSubmit={handleSubmit} className="prompt-form">
        <div className="prompt-input-wrapper">
          <span className="prompt-icon">✦</span>
          <input
            type="text"
            className="prompt-input"
            placeholder="Describe your diagram…"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="prompt-submit"
            disabled={!prompt.trim() || isLoading}
          >
            {isLoading ? (
              <span className="spinner" />
            ) : (
              <span>Generate</span>
            )}
          </button>
        </div>
      </form>

      <div className="example-chips">
        {EXAMPLE_PROMPTS.map((text) => (
          <button
            key={text}
            className="example-chip"
            onClick={() => handleExampleClick(text)}
            type="button"
          >
            {text}
          </button>
        ))}
      </div>

      {error && <div className="prompt-error">⚠ {error}</div>}

      <div className="prompt-actions">
        <button
          className="clear-btn"
          onClick={() => {
            clearGraph();
            setPrompt("");
          }}
          type="button"
        >
          ↺ Clear canvas
        </button>
      </div>
    </div>
  );
}
