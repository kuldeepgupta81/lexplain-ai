"use client";

import { useState } from "react";
import Tesseract from "tesseract.js";
import { explainDocument } from "@/lib/explainDocument";

export default function Scanner() {

  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const scanDocument = async () => {

    if (!file) return;

    setLoading(true);

    const result = await Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    });

    const cleanText = result.data.text
      .replace(/\n\s*\n/g, "\n")
      .replace(/[^\x00-\x7F]/g, "");

    const explanation = explainDocument(cleanText);

    setText(explanation);

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          width: "420px",
          textAlign: "center",
        }}
      >

        <h1
          style={{
            fontSize: "26px",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          Document Scanner
        </h1>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "25px",
          }}
        >
          Upload a bill or legal document and AI will explain it.
        </p>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        {file && (
          <p
            style={{
              marginTop: "15px",
              color: "#2563eb",
            }}
          >
            Selected: {file.name}
          </p>
        )}

        <button
          onClick={scanDocument}
          style={{
            marginTop: "25px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {loading ? "Scanning..." : "Scan Document"}
        </button>

        {text && (
          <div
            style={{
              marginTop: "30px",
              textAlign: "left",
              background: "#f9fafb",
              padding: "15px",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >

            <strong>AI Explanation:</strong>

            <pre
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: "1.6",
                fontFamily: "monospace",
              }}
            >
              {text}
            </pre>

          </div>
        )}

      </div>
    </div>
  );
}