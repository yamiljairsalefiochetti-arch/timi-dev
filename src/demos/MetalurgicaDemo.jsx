import { ArrowRight, BadgeCheck, Cog, Factory, Gauge, ShieldCheck, Wrench } from 'lucide-react';
import { getWhatsAppLink } from '../whatsapp.js';

const SOLUCIONES = [
  { titulo: 'Estructuras y montaje', descripcion: 'Ingeniería, fabricación y montaje de estructuras para plantas e instalaciones industriales.', Icono: Factory },
  { titulo: 'Mantenimiento industrial', descripcion: 'Intervenciones planificadas, reparación de equipos y soporte técnico en campo.', Icono: Wrench },
  { titulo: 'Equipos para energía', descripcion: 'Componentes y soluciones metalmecánicas para operaciones de petróleo y gas.', Icono: Cog },
];

const CAPACIDADES = ['Trazabilidad de materiales', 'Procedimientos de calidad', 'Seguridad como prioridad', 'Coordinación de obra y paradas'];

export default function MetalurgicaDemo({ onVolver }) {
  const consultar = (servicio = 'Consulta industrial') => {
    const mensaje = `Hola, quisiera contactar a NORTEK Industrial.\n\nMotivo: ${servicio}\nNecesito conversar sobre una solución metalúrgica para una operación de petróleo, gas o industria.`;
    window.open(getWhatsAppLink(mensaje), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#101820] font-sans text-slate-100">
      <div className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-white/10 bg-[#111b24] px-4 py-3 text-xs text-white sm:px-6">
        <span className="truncate">DEMO INDUSTRIAL <strong className="text-amber-400">· TIMI.DEV</strong></span>
        <button onClick={onVolver} className="shrink-0 rounded-lg bg-white/10 px-3 py-2 font-semibold transition hover:bg-white/20">Volver al portfolio</button>
      </div>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#nortek-inicio" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center border border-amber-500/60 bg-amber-500/10 text-amber-400"><Factory className="h-5 w-5" /></span>
          <span><strong className="block text-lg font-black tracking-[0.16em]">NORTEK</strong><span className="block text-[9px] font-semibold uppercase tracking-[0.28em] text-slate-400">Industrial Solutions</span></span>
        </a>
        <a href="#contacto-industrial" className="rounded-md border border-amber-500/70 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-amber-300 transition hover:bg-amber-400 hover:text-[#101820] sm:text-sm">Contactar ingeniería</a>
      </header>

      <main>
        <section id="nortek-inicio" className="relative isolate overflow-hidden border-y border-white/10 bg-[#17232d]">
          <div className="absolute inset-0 -z-10">
            <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1800&auto=format&fit=crop" alt="Trabajo de precisión en una planta industrial" className="h-full w-full object-cover opacity-25" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#101820] via-[#101820]/90 to-[#101820]/45" />
          </div>
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 border-l-2 border-amber-400 pl-3 text-xs font-bold uppercase tracking-[0.22em] text-amber-300">Ingeniería metalúrgica · Energía · Industria</span>
              <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Soluciones industriales para operaciones que no se detienen.</h1>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-lg">Fabricación, montaje y mantenimiento metalmecánico con foco en seguridad, calidad y continuidad operativa para petróleo, gas e industria pesada.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#soluciones" className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-400 px-6 py-3.5 text-sm font-black text-[#101820] transition hover:bg-amber-300">Conocer capacidades <ArrowRight className="h-4 w-4" /></a>
                <button type="button" onClick={() => consultar('Solicitud de reunión técnica')} className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:border-amber-300 hover:text-amber-300">Solicitar reunión técnica</button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[#141f28]">
          <div className="mx-auto grid max-w-7xl gap-0 px-5 sm:grid-cols-3 sm:px-8">
            {[
              ['Ingeniería aplicada', 'Del relevamiento a la puesta en marcha'],
              ['Trabajo planificado', 'Alcances claros y coordinación en campo'],
              ['Seguridad operacional', 'Criterios de prevención en cada etapa'],
            ].map(([titulo, bajada]) => (
              <div key={titulo} className="border-b border-white/10 py-5 sm:border-b-0 sm:border-r sm:px-6 sm:py-7 sm:first:pl-0 sm:last:border-r-0">
                <p className="text-sm font-bold text-white">{titulo}</p><p className="mt-1 text-xs leading-relaxed text-slate-400">{bajada}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="soluciones" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">Capacidades</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Respaldo técnico en cada etapa del proyecto.</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">Un equipo preparado para integrarse a los requerimientos del cliente, desde trabajos específicos hasta servicios industriales coordinados.</p>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {SOLUCIONES.map(({ titulo, descripcion, Icono }) => (
              <article key={titulo} className="border border-white/10 bg-[#17232d] p-5 transition hover:border-amber-500/50 sm:p-6">
                <span className="flex h-11 w-11 items-center justify-center border border-amber-500/30 bg-amber-500/10 text-amber-400"><Icono className="h-5 w-5" /></span>
                <h3 className="mt-5 text-lg font-bold">{titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{descripcion}</p>
                <button type="button" onClick={() => consultar(titulo)} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-amber-300 transition hover:text-amber-200">Consultar servicio <ArrowRight className="h-4 w-4" /></button>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#17232d]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-18 md:grid-cols-2 md:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">Estándares de trabajo</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Confiabilidad construida con método.</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">Cada servicio se define de acuerdo con el alcance, las condiciones del sitio y los requisitos técnicos y de seguridad del cliente.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {CAPACIDADES.map((capacidad) => (
                <div key={capacidad} className="flex items-start gap-3 border border-white/10 bg-[#101820]/60 p-4 text-sm font-medium">
                  <BadgeCheck className="h-5 w-5 shrink-0 text-amber-400" /> {capacidad}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto-industrial" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col gap-7 border border-amber-500/30 bg-gradient-to-br from-[#1c2a34] to-[#141f28] p-6 sm:p-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-300"><ShieldCheck className="h-4 w-4" /> Petróleo · Gas · Industria</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Hablemos del próximo desafío.</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">Compartinos el alcance, la ubicación y el plazo estimado. Coordinamos una primera conversación técnica.</p>
            </div>
            <button type="button" onClick={() => consultar('Proyecto o solicitud de presupuesto')} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-amber-400 px-6 py-4 text-sm font-black text-[#101820] transition hover:bg-amber-300">Contactar por WhatsApp <ArrowRight className="h-4 w-4" /></button>
          </div>
          <div className="mt-5 flex items-center gap-2 text-xs text-slate-500"><Gauge className="h-4 w-4 text-amber-500" /> Sitio de muestra. Capacidades, certificaciones y datos comerciales deben validarse antes de publicar.</div>
        </section>
      </main>
    </div>
  );
}
