"use client";

import { useState } from "react";
import { englishSampleData } from "@/lib/notebook/sampleData";

export default function NotebookPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/notebook/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(englishSampleData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate PDF");
      }

      // Download the PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "notebook-sample.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1rem" }}>Bible Transcription Notebook Generator</h1>
      <p style={{ marginBottom: "2rem", color: "#666" }}>
        Generate a PDF notebook with scripture pages and writing lines.
      </p>
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: isGenerating ? "#ccc" : "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: isGenerating ? "not-allowed" : "pointer",
        }}
      >
        {isGenerating ? "Generating..." : "Generate English Sample PDF"}
      </button>
    </div>
  );
}
