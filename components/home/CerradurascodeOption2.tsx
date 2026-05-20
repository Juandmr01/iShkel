'use client';

import Image from 'next/image';

const products = [
  {
    id: 1,
    name: 'Fx Camon',
    image: '/Images_Icons/lock 1.png',
    recommended: true,
    camara: true,
    faceId: true,
    huella: true,
    bateria: '4200mAh',
    proteccion: 'IP 66',
    proteccionDesc: 'Resistente al agua y sol',
    cilindro: 'Grado C',
    palma: true,
    ppf: false,
    wifi: 'Powered By Tuya',
    mecanismo: '5 Pasadores (Compatible a 8)',
    vaultGuard: true,
    videoportero: true,
    idioma: 'ES · EN · RU',
    garantia: '12–24 meses',
    encriptacion: 'AES-256',
    accesorios: '2 Llaves | 2 Tags',
  },
  {
    id: 2,
    name: 'Fx Under',
    image: '/Images_Icons/lock 1.png',
    recommended: false,
    camara: true,
    faceId: true,
    huella: true,
    bateria: '4200mAh',
    proteccion: 'IP 55',
    proteccionDesc: '',
    cilindro: 'Grado C',
    palma: true,
    ppf: true,
    wifi: 'Tuya | Apertura remota',
    mecanismo: '5 Pasadores (Compatible a 8)',
    vaultGuard: true,
    videoportero: true,
    idioma: 'ES · EN · RU',
    garantia: '12–24 meses',
    encriptacion: 'AES-256',
    accesorios: '2 Llaves | 2 Tags',
  },
  {
    id: 3,
    name: 'X | R',
    image: '/Images_Icons/lock 1.png',
    recommended: false,
    camara: false,
    faceId: false,
    huella: true,
    bateria: '3200mAh',
    proteccion: 'IP 55',
    proteccionDesc: '',
    cilindro: 'Grado C',
    palma: false,
    ppf: false,
    wifi: 'Tuya | Remota | Clave temporal',
    mecanismo: '5 Pasadores (Compatible a 8)',
    vaultGuard: true,
    videoportero: false,
    idioma: 'EN',
    garantia: '12–24 meses',
    encriptacion: 'AES-256',
    accesorios: '2 Llaves | 2 Tags',
  },
];

type Product = typeof products[number];

const GradientText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span
    className={`bg-clip-text text-transparent ${className}`}
    style={{
      backgroundImage: 'linear-gradient(180deg, #8C857E 0%, #C4B6A6 25%, #F2F2F2 50%, #C4B6A6 75%, #8C857E 100%)',
    }}
  >
    {children}
  </span>
);

const Check = () => <span className="text-white text-lg font-semibold">✓</span>;
const Cross = () => <span className="text-[#444] text-xl font-light">—</span>;

function BoolCell({ value, label }: { value: boolean; label?: string }) {
  return value ? (
    <span className="text-[#f2f2f2] text-[15px] text-center leading-snug">
      {label ?? <Check />}
    </span>
  ) : (
    <Cross />
  );
}

const desktopRows: { label: string; render: (p: Product) => React.ReactNode }[] = [
  {
    label: 'CÁMARA & FACE ID',
    render: (p) => (
      <BoolCell value={p.camara && p.faceId} label={p.camara ? 'Cámara + Face ID 3D' : undefined} />
    ),
  },
  {
    label: 'HUELLA · CLAVE · TAG',
    render: (p) => <BoolCell value={p.huella} label="Huella | Contraseña | Tag ID" />,
  },
  {
    label: 'BATERÍA',
    render: (p) => (
      <span className="text-[#f2f2f2] text-[20px] font-medium">{p.bateria}</span>
    ),
  },
  {
    label: 'PROTECCIÓN IP',
    render: (p) => (
      <div className="text-center">
        <span className="text-[#f2f2f2] text-[20px] font-medium block">{p.proteccion}</span>
        {p.proteccionDesc && (
          <span className="text-[#888] text-[13px] mt-1 block">{p.proteccionDesc}</span>
        )}
      </div>
    ),
  },
  {
    label: 'PALMA',
    render: (p) => <BoolCell value={p.palma} label="Reconocimiento de palma" />,
  },
  {
    label: 'REVESTIMIENTO PPF',
    render: (p) => <BoolCell value={p.ppf} label='Revestimiento tipo PPF' />,
  },
  {
    label: 'WIFI',
    render: (p) => (
      <span className="text-[#f2f2f2] text-[14px] text-center leading-snug">{p.wifi}</span>
    ),
  },
  {
    label: 'VIDEOPORTERO 24/7',
    render: (p) => <BoolCell value={p.videoportero} label="Videoportero + registro" />,
  },
  {
    label: 'VAULT GUARD',
    render: (p) => <BoolCell value={p.vaultGuard} label="Incluido" />,
  },
  {
    label: 'CILINDRO',
    render: (p) => (
      <span className="text-[#f2f2f2] text-[15px]">{p.cilindro}</span>
    ),
  },
  {
    label: 'MECANISMO',
    render: (p) => (
      <span className="text-[#f2f2f2] text-[14px] text-center leading-snug">{p.mecanismo}</span>
    ),
  },
  {
    label: 'ENCRIPTACIÓN',
    render: (p) => (
      <span className="text-[#f2f2f2] text-[15px] font-semibold">{p.encriptacion}</span>
    ),
  },
  {
    label: 'IDIOMA',
    render: (p) => (
      <span className="text-[#f2f2f2] text-[14px]">{p.idioma}</span>
    ),
  },
  {
    label: 'GARANTÍA',
    render: (p) => (
      <span className="text-[#f2f2f2] text-[15px]">{p.garantia}</span>
    ),
  },
  {
    label: 'ACCESORIOS',
    render: (p) => (
      <span className="text-[#f2f2f2] text-[14px] text-center">{p.accesorios}</span>
    ),
  },
];

export default function ComparisonTable() {
  return (
    <section className="w-full bg-[#070707] py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-[1360px] mx-auto">

        {/* Header */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-medium mb-12 md:mb-16 lg:mb-20">
          <span className="text-white">¿Cuál iShkel es la mejor </span>
          <GradientText>para ti?</GradientText>
        </h2>

        {/* Desktop Table */}
        <div className="hidden lg:block">

          {/* Product Headers */}
          <div className="grid grid-cols-[220px_1fr_1fr_1fr] gap-0">
            <div />
            {products.map((product) => (
              <div
                key={product.id}
                className={`flex flex-col items-center px-4 pb-6 pt-6 rounded-t-[20px] transition-colors ${
                  product.recommended ? 'bg-white/[0.05]' : ''
                }`}
              >
                {product.recommended && (
                  <span className="mb-3 px-4 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border border-white/20 text-white/60">
                    Recomendado
                  </span>
                )}
                <div className="relative w-[140px] h-[150px] mb-4">
                  <Image src={product.image} alt={product.name} fill className="object-contain" />
                </div>
                <p className="text-[22px] font-medium text-center">
                  <GradientText>{product.name}</GradientText>
                </p>
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="border-t border-[#222]">
            {desktopRows.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[220px_1fr_1fr_1fr] border-b border-[#222] hover:bg-white/[0.02] transition-colors"
              >
                <div className="py-8 px-2 flex items-center">
                  <span className="text-[16px] font-medium tracking-[1.4px] uppercase">
                    <GradientText>{row.label}</GradientText>
                  </span>
                </div>
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`py-8 px-4 flex items-center justify-center transition-colors ${
                      product.recommended ? 'bg-white/[0.05]' : ''
                    }`}
                  >
                    {row.render(product)}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-end mt-16">
            <button className="px-16 py-4 border-2 border-white rounded-[15px] text-white text-[20px] font-medium hover:bg-white hover:text-[#070707] transition-colors duration-300">
              Comparar ahora
            </button>
          </div>
        </div>

        {/* Tablet Table */}
        <div className="hidden md:block lg:hidden overflow-x-auto">
          <div className="min-w-[680px]">
            <div className="grid grid-cols-[160px_1fr_1fr_1fr] gap-0 mb-6">
              <div />
              {products.map((product) => (
                <div key={product.id} className="flex flex-col items-center px-2">
                  {product.recommended && (
                    <span className="mb-2 px-3 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase border border-white/20 text-white/60">
                      Top
                    </span>
                  )}
                  <div className="relative w-[90px] h-[110px] mb-3">
                    <Image src={product.image} alt={product.name} fill className="object-contain" />
                  </div>
                  <p className="text-[14px] font-medium text-center">
                    <GradientText>{product.name}</GradientText>
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#222]">
              {[
                { label: 'CÁMARA & FACE ID', values: ['✓', '✓', '—'] },
                { label: 'HUELLA · CLAVE · TAG', values: ['✓', '✓', '✓'] },
                { label: 'BATERÍA', values: ['4200mAh', '4200mAh', '3200mAh'] },
                { label: 'PROTECCIÓN', values: ['IP 66', 'IP 55', 'IP 55'] },
                { label: 'PALMA', values: ['✓', '✓', '—'] },
                { label: 'PPF', values: ['—', '✓', '—'] },
                { label: 'WIFI', values: ['Tuya', 'Tuya+Remota', 'Tuya+Remota+Temp'] },
                { label: 'VIDEOPORTERO', values: ['✓', '✓', '—'] },
                { label: 'VAULT GUARD', values: ['✓', '✓', '✓'] },
                { label: 'ENCRIPTACIÓN', values: ['AES-256', 'AES-256', 'AES-256'] },
                { label: 'IDIOMA', values: ['ES·EN·RU', 'ES·EN·RU', 'EN'] },
                { label: 'GARANTÍA', values: ['12–24m', '12–24m', '12–24m'] },
                { label: 'ACCESORIOS', values: ['2L | 2T', '2L | 2T', '2L | 2T'] },
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-[160px_1fr_1fr_1fr] border-b border-[#222] hover:bg-white/[0.02] transition-colors">
                  <div className="py-5 px-2 flex items-center">
                    <span className="text-white text-[12px] tracking-wider uppercase">{row.label}</span>
                  </div>
                  {row.values.map((val, i) => (
                    <div
                      key={i}
                      className={`py-5 px-2 flex items-center justify-center ${
                        i === 0 ? 'bg-white/[0.05]' : ''
                      }`}
                    >
                      <span className={`text-[13px] font-medium text-center ${val === '—' ? 'text-[#444]' : 'text-[#f2f2f2]'}`}>
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-10">
              <button className="px-10 py-3 border-2 border-white rounded-[15px] text-white text-[16px] font-medium hover:bg-white hover:text-[#070707] transition-colors duration-300">
                Comparar ahora
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`rounded-2xl p-5 border transition-colors ${
                product.recommended
                  ? 'bg-white/[0.07] border-white/20'
                  : 'bg-[#111] border-[#222]'
              }`}
            >
              {product.recommended && (
                <div className="mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase border border-white/20 text-white/60">
                    Recomendado
                  </span>
                </div>
              )}
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#333]">
                <div className="relative w-[60px] h-[80px]">
                  <Image src={product.image} alt={product.name} fill className="object-contain" />
                </div>
                <p className="text-lg font-medium">
                  <GradientText>{product.name}</GradientText>
                </p>
              </div>

              <div className="space-y-3 text-sm">
                {[
                  { label: 'Cámara & Face ID', value: product.camara && product.faceId ? '✓ Incluido' : '—', ok: product.camara },
                  { label: 'Huella · Clave · Tag', value: '✓ Incluido', ok: true },
                  { label: 'Batería', value: product.bateria, ok: true },
                  { label: 'Protección', value: `${product.proteccion}${product.proteccionDesc ? ' · ' + product.proteccionDesc : ''}`, ok: true },
                  { label: 'Palma', value: product.palma ? '✓ Incluido' : '—', ok: product.palma },
                  { label: 'Revestimiento PPF', value: product.ppf ? '✓ Incluido' : '—', ok: product.ppf },
                  { label: 'Wifi', value: product.wifi, ok: true },
                  { label: 'Videoportero 24/7', value: product.videoportero ? '✓ Incluido' : '—', ok: product.videoportero },
                  { label: 'Vault Guard', value: '✓ Incluido', ok: true },
                  { label: 'Encriptación', value: product.encriptacion, ok: true },
                  { label: 'Idioma', value: product.idioma, ok: true },
                  { label: 'Garantía', value: product.garantia, ok: true },
                  { label: 'Accesorios', value: product.accesorios, ok: true },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between gap-2">
                    <span className="text-[#888] uppercase tracking-wide shrink-0">{row.label}</span>
                    <span className={`text-right ${row.ok ? 'text-white font-medium' : 'text-[#444]'}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-8">
            <button className="w-full max-w-xs px-8 py-3 border-2 border-white rounded-[15px] text-white text-base font-medium hover:bg-white hover:text-[#070707] transition-colors duration-300">
              Comparar ahora
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
