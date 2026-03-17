"use client";

export default function Home() {
  return (
    <main style={{ background: "#f3f4f6", minHeight: "100vh" }}>

      {/* HERO IMAGE */}
      <section style={{ width: "100%" }}>
        <img
          src="/hero-image.png"
          alt="Lexplain AI"
          style={{
            width: "100%",
            display: "block",
            objectFit: "cover",
          }}
        />
      </section>

      {/* SECTIONS */}

      {/* DOCUMENT SCANNER */}
      <Section img="/scanner.png" />

      {/* BILL EXPLAINER */}
      <Section img="/bill.png" />

      {/* LEGAL WRITER */}
      <Section img="/legal.png" />

      {/* FIR HELPER */}
      <Section img="/fir.png" />

      {/* VOICE ASSISTANT */}
      <Section img="/voice.png" />

    </main>
  );
}


// 🔹 REUSABLE SECTION COMPONENT
function Section({ img }: { img: string }) {
  return (
    <section style={{ width: "100%" }}>
      <img
        src={img}
        alt="section"
        style={{
          width: "100%",
          display: "block",
        }}
      />
    </section>
  );
}