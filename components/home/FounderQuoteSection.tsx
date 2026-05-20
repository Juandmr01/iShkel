export default function FounderNote() {
  return (
    <section className="w-full bg-[#373434 opacity-15] py-24 px-4 md:py-20 relative overflow-hidden">
      {/* Subtle light glow effect */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Quote */}
        <blockquote className="font-neue font-medium leading-tight mb-8 space-y-4">
          <p className="text-2xl md:text-4xl lg:text-3xl">
            <span className="text-white">&quot;El lujo es la invisibilidad de la preocupación. Hemos fusionado la robustez del </span>
            <span className="text-[#888]">Zamak </span>
            <span className="text-white">con la precisión del </span>
            <span className="text-[#888]">reconocimiento facial 3D </span>
            <span className="text-white">para que su identidad sea la única llave que necesite.&quot;</span>
          </p>
       
        </blockquote>

        {/* Attribution */}
        <p className="text-[#888] text-sm md:text-base font-medium">
          Fundador de iShkel
        </p>
      </div>
    </section>
  );
}