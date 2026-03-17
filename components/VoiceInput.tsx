"use client";

export default function VoiceInput({ setText }: any) {

  const startVoice = () => {

    const recognition =
      new (window as any).webkitSpeechRecognition();

    recognition.lang = "en-IN";

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setText(text);
    };

    recognition.start();
  };

  return (
    <button
      onClick={startVoice}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      🎤 Speak
    </button>
  );
}