export function explainBill(text:string){

let result="Bill Summary\n\n";

const amount=text.match(/₹?\s?\d+/);

if(amount){
result+=`Amount: ${amount[0]}\n`;
}

if(text.toLowerCase().includes("electric")){
result+="Type: Electricity Bill\n";
}

if(text.toLowerCase().includes("hospital")){
result+="Type: Medical Bill\n";
}

return result;

}