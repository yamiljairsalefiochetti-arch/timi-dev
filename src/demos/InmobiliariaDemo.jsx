import { useMemo, useState } from 'react';
import { ArrowUpRight, BedDouble, Building2, MapPin, Ruler, Search } from 'lucide-react';
import { getWhatsAppLink } from '../whatsapp.js';

const PROPIEDADES = [
  {
    id: 1,
    tipo: 'Casa',
    operacion: 'Venta',
    nombre: 'Casa Patio de Chacras',
    zona: 'Chacras de Coria',
    ambientes: 4,
    superficie: 185,
    precio: 'USD 245.000',
    imagen: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 2,
    tipo: 'Departamento',
    operacion: 'Alquiler',
    nombre: 'Loft en Parque Central',
    zona: 'Ciudad de Mendoza',
    ambientes: 2,
    superficie: 72,
    precio: '$ 620.000 / mes',
    imagen: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 3,
    tipo: 'Casa',
    operacion: 'Venta',
    nombre: 'Casa con jardín y pileta',
    zona: 'Godoy Cruz',
    ambientes: 5,
    superficie: 230,
    precio: 'USD 198.000',
    imagen: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 4,
    tipo: 'Terreno',
    operacion: 'Venta',
    nombre: 'Lote en entorno natural',
    zona: 'Vistalba',
    ambientes: null,
    superficie: 640,
    precio: 'USD 68.000',
    imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop',
  },
];

const FILTROS = ['Todas', 'Venta', 'Alquiler'];

export default function InmobiliariaDemo({ onVolver }) {
  const [filtro, setFiltro] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const propiedadesFiltradas = useMemo(() => PROPIEDADES.filter((propiedad) => {
    const coincideOperacion = filtro === 'Todas' || propiedad.operacion === filtro;
    const consulta = busqueda.trim().toLocaleLowerCase('es-AR');
    const coincideBusqueda = !consulta || `${propiedad.nombre} ${propiedad.zona} ${propiedad.tipo}`.toLocaleLowerCase('es-AR').includes(consulta);
    return coincideOperacion && coincideBusqueda;
  }), [busqueda, filtro]);

  const consultar = (propiedad) => {
    const mensaje = `Hola, vi en la web la propiedad "${propiedad.nombre}" en ${propiedad.zona} (${propiedad.operacion}, ${propiedad.precio}) y quisiera recibir más información.`;
    window.open(getWhatsAppLink(mensaje), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#202622] font-sans">
      <div className="sticky top-0 z-30 flex items-center justify-between gap-3 bg-[#24352d] px-4 py-3 text-xs text-white sm:px-6">
        <span className="truncate">DEMO INMOBILIARIA <strong className="text-lime-300">· TIMI.DEV</strong></span>
        <button onClick={onVolver} className="shrink-0 rounded-lg bg-white/10 px-3 py-2 font-semibold transition hover:bg-white/20">
          Volver al portfolio
        </button>
      </div>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#propiedades" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <Building2 className="h-5 w-5 text-emerald-800" /> raíz<span className="text-emerald-800">.</span>
        </a>
        <a href="#propiedades" className="hidden text-sm font-medium text-[#526056] transition hover:text-emerald-900 sm:inline">Propiedades</a>
        <a href="#propiedades" className="rounded-full bg-[#24352d] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-900 sm:text-sm">
          Encontrá tu lugar
        </a>
      </header>

      <main>
        <section className="relative isolate overflow-hidden bg-[#24352d] text-white">
          <div className="absolute inset-0 -z-10">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1800&auto=format&fit=crop"
              alt="Casa contemporánea rodeada de vegetación"
              className="h-full w-full object-cover opacity-35"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#17271f]/95 via-[#17271f]/70 to-[#17271f]/20" />
          </div>
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-lime-300">Propiedades en Mendoza</span>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Encontrá un lugar para llamar hogar.</h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">Una búsqueda más simple, asesoramiento cercano y propiedades seleccionadas en cada rincón de Mendoza.</p>
            <a href="#propiedades" className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime-300 px-6 py-3.5 text-sm font-bold text-[#24352d] transition hover:bg-lime-200">
              Explorar propiedades <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section id="propiedades" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">Selección destacada</span>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Propiedades para descubrir.</h2>
            </div>
            <label className="flex w-full items-center gap-3 rounded-xl border border-[#dfe3dd] bg-white px-4 py-3 md:max-w-sm">
              <Search className="h-4 w-4 shrink-0 text-[#738077]" />
              <span className="sr-only">Buscar por propiedad o zona</span>
              <input value={busqueda} onChange={(event) => setBusqueda(event.target.value)} placeholder="Buscar por zona o propiedad" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#8b938d]" />
            </label>
          </div>

          <div className="mt-7 flex gap-2 overflow-x-auto pb-2" aria-label="Filtrar propiedades">
            {FILTROS.map((opcion) => (
              <button
                key={opcion}
                onClick={() => setFiltro(opcion)}
                aria-pressed={filtro === opcion}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${filtro === opcion ? 'bg-[#24352d] text-white' : 'bg-white text-[#526056] ring-1 ring-[#dfe3dd] hover:ring-emerald-800'}`}
              >
                {opcion}
              </button>
            ))}
          </div>

          {propiedadesFiltradas.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {propiedadesFiltradas.map((propiedad) => (
                <article key={propiedad.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#e6e8e3] transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e6e8e3]">
                    <img src={propiedad.imagen} alt={propiedad.nombre} loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#24352d]">{propiedad.operacion}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-[#738077]"><MapPin className="h-3.5 w-3.5" /> {propiedad.zona}</div>
                    <h3 className="mt-2 text-lg font-semibold">{propiedad.nombre}</h3>
                    <div className="mt-4 flex flex-wrap gap-4 border-b border-[#edf0eb] pb-4 text-xs text-[#667168]">
                      {propiedad.ambientes && <span className="inline-flex items-center gap-1.5"><BedDouble className="h-4 w-4" /> {propiedad.ambientes} ambientes</span>}
                      <span className="inline-flex items-center gap-1.5"><Ruler className="h-4 w-4" /> {propiedad.superficie} m²</span>
                    </div>
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <strong className="text-base">{propiedad.precio}</strong>
                      <button onClick={() => consultar(propiedad)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#24352d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900">
                        Consultar <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-2xl bg-white p-8 text-center text-sm text-[#667168] ring-1 ring-[#e6e8e3]">No encontramos propiedades con esa búsqueda. Probá con otra zona o filtro.</p>
          )}
        </section>
      </main>
    </div>
  );
}
