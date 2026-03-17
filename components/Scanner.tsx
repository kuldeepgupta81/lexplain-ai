"use client";

import { useState } from "react";
import Tesseract from "tesseract.js";
import { explainDocument } from "../lib/explainDocument";

export default function Scanner() {

  const [file,setFile] = useState<File | null>(null);
  const [result,setResult] = useState("");
  const [loading,setLoading] = useState(false);

  const scanDocument = async () => {

    if(!file) return;

    setLoading(true);
    setResult("🔍 AI is scanning the document...");

    try{

      const { data } = await Tesseract.recognize(
        file,
        "eng",
        { logger: m => console.log(m) }
      );

      const extractedText = data.text;

      const explanation = explainDocument(extractedText);

      setResult(explanation);

    }
    catch{
      setResult("❌ Error scanning document");
    }

    setLoading(false);
  };

  return(

    <div className="flex flex-col items-center gap-5">

      <h2 className="text-2xl font-bold">
        AI Document Scanner
      </h2>

      <p className="text-gray-500 text-center">
        Upload any document and AI will identify and explain it.
      </p>

      <input
        type="file"
        onChange={(e)=>{
          if(e.target.files)
          setFile(e.target.files[0])
        }}
      />

      {file && (
        <img
          src={URL.createObjectURL(file)}
          className="max-w-xs rounded shadow"
          alt="preview"
        />
      )}

      <button
        onClick={scanDocument}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        Scan Document
      </button>

      {loading && (
        <p className="text-blue-600">
          AI is scanning the document...
        </p>
      )}

      <div className="bg-gray-100 p-6 rounded-xl shadow w-full max-w-xl whitespace-pre-wrap">

        <h3 className="font-bold mb-3">
          AI Explanation
        </h3>

        {result}

      </div>

    </div>

  );

}