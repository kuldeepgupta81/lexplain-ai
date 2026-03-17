"use client";

import { useState } from "react";
import jsPDF from "jspdf";

export default function FIRHelper() {

  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [listening, setListening] = useState(false);

  // -------- DATE --------
  const getDate = () => {
    const d = new Date();
    return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
  };

  // -------- LANGUAGE (STRICT) --------
  const detectLanguage = (text: string) => {
    if (/[ऀ-ॿ]/.test(text)) return "HI";
    return "EN";
  };

  // -------- INCIDENT --------
  const detectIncident = (text: string, lang: "EN" | "HI") => {
    const lower = text.toLowerCase();

    if (lang === "EN") {
      if (lower.includes("phone") || lower.includes("mobile")) return "mobile phone theft";
      if (lower.includes("bike") || lower.includes("car")) return "vehicle theft";
      if (lower.includes("wallet")) return "wallet loss";
      if (lower.includes("fraud")) return "financial fraud";
      return "theft";
    } else {
      if (lower.includes("मोबाइल")) return "मोबाइल चोरी";
      if (lower.includes("बाइक") || lower.includes("गाड़ी")) return "वाहन चोरी";
      if (lower.includes("पर्स")) return "पर्स खोना";
      if (lower.includes("धोखाधड़ी")) return "धोखाधड़ी";
      return "चोरी";
    }
  };

  // -------- IPC --------
  const getIPC = (text: string, lang: "EN" | "HI") => {
    const lower = text.toLowerCase();

    if (lower.includes("fraud") || lower.includes("धोखाधड़ी")) {
      return lang === "HI" ? "भारतीय दंड संहिता धारा 420" : "IPC Section 420";
    }

    if (lower.includes("theft") || lower.includes("चोरी")) {
      return lang === "HI" ? "भारतीय दंड संहिता धारा 379" : "IPC Section 379";
    }

    return lang === "HI" ? "प्रासंगिक धाराएं" : "Relevant IPC Sections";
  };

  // -------- EXTRACT --------
  const extract = (text: string) => {
    const name =
      text.match(/my name is ([a-z]+)/i)?.[1] ||
      text.match(/i am ([a-z]+)/i)?.[1] ||
      text.match(/मेरा नाम ([\u0900-\u097F]+)/)?.[1] || "";

    const place =
      text.match(/in ([a-z]+)/i)?.[1] ||
      text.match(/([a-z]+) (station|market|road|area)/i)?.[1] ||
      text.match(/([\u0900-\u097F]+) में/)?.[1] || "";

    return { name, place };
  };

  // -------- AI REWRITE --------
  const rewrite = (text: string, lang: "EN" | "HI") => {
    if (lang === "EN") {
      return `The complainant states that ${text}. The incident occurred unexpectedly and caused significant inconvenience and loss.`;
    } else {
      return `शिकायतकर्ता के अनुसार ${text}। यह घटना अचानक हुई जिससे उसे नुकसान और असुविधा हुई।`;
    }
  };

  // -------- GENERATE FIR --------
  const generateFIR = () => {

    if (!input.trim()) return alert("Enter something");

    const lang = detectLanguage(input);
    const { name, place } = extract(input);
    const incident = detectIncident(input, lang);
    const ipc = getIPC(input, lang);

    const today = getDate();
    const firNumber = "FIR-" + Math.floor(Math.random() * 100000);

    let fir = "";

    if (lang === "EN") {

      const improved = rewrite(input, "EN");

      fir = `
FIRST INFORMATION REPORT
(Under Section 154 CrPC)

FIR No: ${firNumber}
Date: ${today}

To,
The Station House Officer,
${place || "[Police Station]"}

Subject: Complaint regarding ${incident}

Sir/Madam,

I, ${name || "[Full Name]"}, hereby state that an incident of ${incident} occurred at ${place || "[Location]"}.

${improved}

Applicable Law: ${ipc}

I request you to kindly register this FIR and take strict legal action.

I am ready to cooperate in the investigation.

Yours faithfully,
${name || "[Full Name]"}

Contact: [Phone Number]
Signature: __________
`;

    } else {

      const improved = rewrite(input, "HI");

      fir = `
प्रथम सूचना रिपोर्ट
(धारा 154 दं.प्र.सं.)

एफआईआर संख्या: ${firNumber}
तारीख: ${today}

सेवा में,
थाना प्रभारी,
${place || "[थाना]"}

विषय: ${incident} के संबंध में शिकायत

महोदय,

मैं, ${name || "[पूरा नाम]"}, यह निवेदन करता/करती हूँ कि ${place || "[स्थान]"} पर मेरे साथ ${incident} की घटना हुई।

${improved}

लागू धाराएं: ${ipc}

अतः आपसे निवेदन है कि कृपया आवश्यक कानूनी कार्यवाही करें।

मैं जांच में सहयोग करूंगा/करूंगी।

भवदीय,
${name || "[पूरा नाम]"}

संपर्क: [मोबाइल नंबर]
हस्ताक्षर: __________
`;
    }

    setResult(fir);
    setCopied(false);
  };

  // -------- VOICE --------
  const startListening = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const rec = new SpeechRecognition();

    rec.lang = "en-IN";
    rec.start();
    setListening(true);

    rec.onresult = (e: any) => {
      const speech = e.results[0][0].transcript;
      setInput(speech);
      setListening(false);
    };
  };

  // -------- COPY --------
  const copyFIR = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
  };

  // -------- PDF --------
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("FIRST INFORMATION REPORT", 105, 18, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("(Generated FIR Document)", 105, 25, { align: "center" });

    doc.line(15, 30, 195, 30);

    const lines = doc.splitTextToSize(result, 170);
    doc.setFontSize(11);
    doc.text(lines, 20, 40);

    doc.setTextColor(200, 0, 0);
    doc.setFontSize(20);
    doc.text("GENERATED FIR", 130, 250, { angle: 25 });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text("Authorized Digital Copy", 135, 270);

    doc.setFontSize(8);
    doc.text(
      "This is a system-generated document for assistance purposes only.",
      105,
      290,
      { align: "center" }
    );

    doc.save("FIR.pdf");
  };

  // -------- WHATSAPP --------
  const shareWhatsApp = () => {
    const text = encodeURIComponent(result);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-center mb-10">
        FIR Generator (AI Voice + Multi Language)
      </h1>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

        <textarea
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          className="w-full h-32 border p-4 rounded-lg"
          placeholder="Hindi ya English me likho..."
        />

        <button
          onClick={generateFIR}
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Generate FIR
        </button>

        <button
          onClick={startListening}
          className="mt-3 w-full bg-purple-600 text-white py-3 rounded-lg"
        >
          {listening ? "🎤 Listening..." : "🎤 Speak FIR"}
        </button>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg whitespace-pre-wrap min-h-[200px]">
          {result || "FIR will appear here..."}
        </div>

        {result && (
          <>
            <button
              onClick={downloadPDF}
              className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg"
            >
              Download FIR
            </button>

            <button
              onClick={copyFIR}
              className="mt-3 w-full bg-gray-700 text-white py-3 rounded-lg"
            >
              {copied ? "Copied!" : "Copy FIR"}
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
  );
}