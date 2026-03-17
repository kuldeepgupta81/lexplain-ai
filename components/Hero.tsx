export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center">

      {/* HERO IMAGE */}
      <img
        src="/hero-image.png"
        alt="Hero"
        className="absolute w-full h-full object-cover"
      />

      {/* TEXT */}
      <div className="relative text-white text-center">

        <h1 className="text-5xl font-bold mb-4">
          Find Government Schemes Instantly
        </h1>

        <p className="text-lg">
          Discover schemes you are eligible for in seconds
        </p>

      </div>

    </section>
  );
}