import { useState } from 'react';
import { ArrowRight, BusFront, CalendarDays, Check, Clock3, MapPin, Plane } from 'lucide-react';
import { getWhatsAppLink } from '../whatsapp.js';

const PAQUETES = [
  {
    id: 'mendoza',
    destino: 'Mendoza & alta montaña',
    duracion: '4 días / 3 noches',
    precio: 389000,
    transporte: 'Avión o colectivo',
    imagen: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1100&auto=format&fit=crop',
    detalle: 'Ciudad, bodegas y un recorrido inolvidable por la cordillera.',
  },
  {
    id: 'bariloche',
    destino: 'Bariloche & lagos',
    duracion: '6 días / 5 noches',
    precio: 645000,
    transporte: 'Avión o colectivo',
    imagen: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1100&auto=format&fit=crop',
    detalle: 'Circuito chico, navegación y paisajes patagónicos.',
  },
  {
    id: 'buenos-aires',
    destino: 'Buenos Aires',
    duracion: '3 días / 2 noches',
    precio: 298000,
    transporte: 'Avión o colectivo',
    imagen: 'https://images.unsplash.com/photo-1612294037637-ec328d0e075e?q=80&w=1100&auto=format&fit=crop',
    detalle: 'Cultura, gastronomía y tiempo libre en la ciudad.',
  },
];

const PRECIO = new Intl.NumberFormat('es-AR');

export default function TurismoDemo({ onVolver }) {
  const [transporte, setTransporte] = useState('Avión');
  const [pasajeros, setPasajeros] = useState('2');
  const [salida, setSalida] = useState('');

  const consultar = (paquete) => {
    const fecha = salida ? new Date(`${salida}T12:00:00`).toLocaleDateString('es-AR') : 'a coordinar';
    const mensaje = `Hola, vi el paquete "${paquete.destino}" en la web de Andina Viajes y quisiera cotizarlo.\n\nTransporte: ${transporte}\nPasajeros: ${pasajeros}\nFecha de salida: ${fecha}\nDuración: ${paquete.duracion}\nPrecio publicado desde: $${PRECIO.format(paquete.precio)} ARS por persona`;
    window.open(getWhatsAppLink(mensaje), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#15253a] font-sans">
      <div className="sticky top-0 z-30 flex items-center justify-between gap-3 bg-[#14263d] px-4 py-3 text-xs text-white sm:px-6">
        <span className="truncate">DEMO DE TURISMO <strong className="text-amber-300">· TIMI.DEV</strong></span>
        <button onClick={onVolver} className="shrink-0 rounded-lg bg-white/10 px-3 py-2 font-semibold transition hover:bg-white/20">Volver al portfolio</button>
      </div>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#viajes" className="text-lg font-black tracking-tight">andina<span className="text-sky-600">.</span> viajes</a>
        <a href="#paquetes" className="hidden text-sm font-semibold text-[#56677b] transition hover:text-sky-700 sm:inline">Paquetes</a>
        <a href="#paquetes" className="rounded-full bg-sky-700 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-sky-800 sm:text-sm">Ver viajes</a>
      </header>

      <main>
        <section id="viajes" className="relative isolate overflow-hidden bg-[#14263d] text-white">
          <div className="absolute inset-0 -z-10">
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1800&auto=format&fit=crop" alt="Cordillera de los Andes" className="h-full w-full object-cover opacity-40" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#10233b]/95 via-[#10233b]/75 to-[#10233b]/15" />
          </div>
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">Salidas desde Mendoza</span>
              <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">El próximo viaje empieza con un sí.</h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-lg">Paquetes a medida en avión o colectivo, con asesoramiento cercano y todo organizado para que disfrutes.</p>
              <a href="#paquetes" className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3.5 text-sm font-bold text-[#14263d] transition hover:bg-amber-200">Explorar destinos <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-md sm:p-7">
              <h2 className="text-xl font-bold">Armá tu viaje</h2>
              <p className="mt-1 text-sm text-white/70">Elegí cómo y cuándo querés viajar.</p>
              <div className="mt-5">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/70">Transporte</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { nombre: 'Avión', Icono: Plane },
                    { nombre: 'Colectivo', Icono: BusFront },
                  ].map(({ nombre, Icono }) => (
                    <button key={nombre} type="button" onClick={() => setTransporte(nombre)} aria-pressed={transporte === nombre} className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${transporte === nombre ? 'border-amber-300 bg-amber-300 text-[#14263d]' : 'border-white/20 bg-white/5 text-white hover:bg-white/10'}`}>
                      <Icono className="h-4 w-4" /> {nombre}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-semibold text-white/70">
                  Pasajeros
                  <select value={pasajeros} onChange={(event) => setPasajeros(event.target.value)} className="mt-2 w-full rounded-xl border border-white/20 bg-[#20344c] px-3 py-3 text-sm text-white">
                    <option value="1">1 pasajero</option><option value="2">2 pasajeros</option><option value="3">3 pasajeros</option><option value="4">4 o más</option>
                  </select>
                </label>
                <label className="text-xs font-semibold text-white/70">
                  Fecha estimada
                  <input type="date" min={new Date().toISOString().slice(0, 10)} value={salida} onChange={(event) => setSalida(event.target.value)} className="mt-2 w-full min-w-0 rounded-xl border border-white/20 bg-[#20344c] px-3 py-3 text-sm text-white [color-scheme:dark]" />
                </label>
              </div>
              <p className="mt-4 inline-flex items-center gap-2 text-xs text-white/70"><MapPin className="h-4 w-4 text-amber-300" /> Salidas y asesoramiento en Mendoza</p>
            </div>
          </div>
        </section>

        <section id="paquetes" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">Escapadas seleccionadas</span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Lugares que se quedan con vos.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#627187]">Precios de referencia por persona. Consultá disponibilidad, fechas y opciones de transporte.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PAQUETES.map((paquete) => (
              <article key={paquete.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#e3e7ed] transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                  <img src={paquete.imagen} alt={`Destino turístico: ${paquete.destino}`} loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#14263d]"><Clock3 className="h-3.5 w-3.5" /> {paquete.duracion}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-800"><MapPin className="h-3.5 w-3.5" /> {paquete.transporte}</div>
                  <h3 className="mt-2 text-xl font-bold">{paquete.destino}</h3>
                  <p className="mt-2 min-h-10 text-sm leading-relaxed text-[#627187]">{paquete.detalle}</p>
                  <div className="mt-4 flex items-end justify-between gap-3 border-t border-[#edf0f4] pt-4">
                    <div><span className="block text-xs text-[#627187]">Desde / persona</span><strong className="text-lg">${PRECIO.format(paquete.precio)} ARS</strong></div>
                    <button type="button" onClick={() => consultar(paquete)} className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-sky-800">Consultar <ArrowRight className="h-4 w-4" /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-[#627187]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" /> Los paquetes son una propuesta de muestra. El valor final se confirma según fechas, transporte y disponibilidad.</p>
          <a href="#viajes" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-sky-800 hover:text-sky-950"><CalendarDays className="h-4 w-4" /> Personalizar mi viaje</a>
        </section>
      </main>
    </div>
  );
}
