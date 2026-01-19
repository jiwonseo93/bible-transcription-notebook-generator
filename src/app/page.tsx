import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1rem" }}>Bible Transcription Notebook Generator</h1>
      <p style={{ marginBottom: "2rem" }}>
        <Link href="/notebook" style={{ color: "#0070f3", textDecoration: "underline" }}>
          Go to Notebook Generator →
        </Link>
      </p>
    </div>
  );
}
