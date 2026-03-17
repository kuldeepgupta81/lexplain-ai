export function simplifyLegal(text:string){

const lower=text.toLowerCase();

if(lower.includes("payment")){
return "This notice says you must pay a pending amount.";
}

if(lower.includes("court")){
return "This document is related to a court matter.";
}

if(lower.includes("agreement")){
return "This document describes a legal agreement.";
}

return "Legal document detected but explanation is limited.";
}