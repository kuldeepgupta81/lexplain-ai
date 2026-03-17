"use client";

import { useState } from "react";
import Tesseract from "tesseract.js";
import { explainDocument } from "@/lib/explainDocument";

export default function BillExplainer() {

  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [risk, setRisk] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // ---------------- OCR ----------------

  const handleImage = async (file: File) => {
    setLoading(true);
    setResult("Scanning document...");

    const { data } = await Tesseract.recognize(file, "eng");

    setText(data.text);
    setLoading(false);
    setResult("Text extracted. Click Analyze.");
  };

  // ---------------- ANALYZE ----------------

  const analyzeDoc = () => {
    if (!text.trim()) {
      setResult("Please upload or paste a document.");
      return;
    }

    const output = explainDocument(text);

    setResult(output);
    setCopied(false);

    if (output.includes("Risk Level:* High")) setRisk("High");
    else if (output.includes("Risk Level:* Medium")) setRisk("Medium");
    else setRisk("Low");
  };

  // ---------------- DOWNLOAD ----------------

  const downloadReport = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "lexplain-report.txt";
    a.click();
  };

  // ---------------- COPY ----------------

  const copyReport = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
  };

  // ---------------- WHATSAPP ----------------

  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(result)}`;
    window.open(url, "_blank");
  };

  // ---------------- UI ----------------

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Lexplain AI – Document Analyzer
      </h1>

      <div className="grid grid-cols-2 gap-10 max-w-7xl mx-auto">

        {/* LEFT */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            Upload Document / OCR
          </h2>

          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleImage(e.target.files[0]);
              }
            }}
            className="mb-4"
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-[420px] border rounded-lg p-4"
            placeholder="Document text will appear here..."
          />

          <button
            onClick={analyzeDoc}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Analyze Document
          </button>

        </div>

        {/* RIGHT */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            AI Explanation
          </h2>

          {/* RESULT BOX */}
          <div className="border rounded-lg p-4 h-[350px] overflow-auto whitespace-pre-wrap text-sm leading-relaxed">
            {loading ? "Processing..." : result}
          </div>

          {/* RISK */}
          {risk && (
            <div className={`mt-4 p-4 rounded-lg font-semibold ${
              risk === "High"
                ? "bg-red-200 text-red-800"
                : risk === "Medium"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-green-200 text-green-800"
            }`}>
              ⚠️ Document Risk Score: {risk}
            </div>
          )}

          {/* BUTTONS */}
          {result && (
            <>
              <button
                onClick={downloadReport}
                className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg"
              >
                Download Report
              </button>

              <button
                onClick={copyReport}
                className="mt-3 w-full bg-gray-700 text-white py-3 rounded-lg"
              >
                {copied ? "✅ Copied!" : "Copy Report"}
              </button>

              <button
                onClick={shareWhatsApp}
                className="mt-3 w-full bg-green-500 text-white py-3 rounded-lg"
              >
                Share on WhatsApp
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}