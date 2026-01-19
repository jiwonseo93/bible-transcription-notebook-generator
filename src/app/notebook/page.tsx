"use client";

import { useState } from "react";
import { englishSampleData, englishLongSampleData } from "@/lib/notebook/sampleData";

export default function NotebookPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingLong, setIsGeneratingLong] = useState(false);

  const handleGenerate = async (useLongSample = false) => {
    const setIsGeneratingFn = useLongSample ? setIsGeneratingLong : setIsGenerating;
    setIsGeneratingFn(true);
    
    try {
      const sampleData = useLongSample ? englishLongSampleData : englishSampleData;
      const response = await fetch("/api/notebook/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sampleData),
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
      a.download = useLongSample ? "notebook-sample-long.pdf" : "notebook-sample.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Failed to generate PDF");
    } finally {
      setIsGeneratingFn(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1rem" }}>Bible Transcription Notebook Generator</h1>
      <p style={{ marginBottom: "2rem", color: "#666" }}>
        Generate a PDF notebook with scripture pages and writing lines.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button
          onClick={() => handleGenerate(false)}
          disabled={isGenerating || isGeneratingLong}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: isGenerating || isGeneratingLong ? "#ccc" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isGenerating || isGeneratingLong ? "not-allowed" : "pointer",
          }}
        >
          {isGenerating ? "Generating..." : "Generate English Sample PDF"}
        </button>
        <button
          onClick={() => handleGenerate(true)}
          disabled={isGenerating || isGeneratingLong}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            backgroundColor: isGenerating || isGeneratingLong ? "#ccc" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isGenerating || isGeneratingLong ? "not-allowed" : "pointer",
          }}
        >
          {isGeneratingLong ? "Generating..." : "Generate Long Sample PDF (Pagination Test)"}
        </button>
      </div>
    </div>
  );
}
