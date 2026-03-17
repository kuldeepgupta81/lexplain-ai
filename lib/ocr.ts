import Tesseract from "tesseract.js";

export async function extractText(file: File) {

  const { data } = await Tesseract.recognize(
    file,
    "eng"
  );

  return data.text;
}