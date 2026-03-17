"use client";

import { useState } from "react";

export default function LegalWriter() {

const [issue,setIssue]=useState("");
const [draft,setDraft]=useState("");

const generateDraft=()=>{

if(!issue){
alert("Please describe your issue");
return;
}

const text=`

LEGAL NOTICE

Subject: Legal Complaint

This notice is issued regarding the following matter:

${issue}

You are hereby requested to resolve this issue immediately.
Failure to do so may result in legal action as per applicable laws.

Sincerely,
Legal Assistant
Date: ${new Date().toLocaleDateString()}

`;

setDraft(text);

}

return (

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-10 rounded-xl shadow-md text-center max-w-xl w-full">

<h1 className="text-3xl font-bold mb-4">
Legal Writer
</h1>

<p className="text-gray-600 mb-6">
Generate legal notices, complaints, and applications using AI.
</p>

<textarea
placeholder="Describe your legal issue..."
className="w-full border rounded-lg p-3 mb-4"
rows={4}
onChange={(e)=>setIssue(e.target.value)}
/>

<button
onClick={generateDraft}
className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
>
Generate Draft
</button>

{draft && (

<div className="mt-6 text-left bg-gray-100 p-4 rounded-lg">

<h2 className="font-semibold mb-2">
Generated Draft
</h2>

<pre className="whitespace-pre-wrap text-sm">
{draft}
</pre>

</div>

)}

</div>

</div>

);
}