import { useState } from 'react';
import { ArrowUpRight, Calendar, Check, Clock3, MapPin, Sparkles } from 'lucide-react';
import { getWhatsAppLink } from '../whatsapp.js';

const SERVICIOS = [
  { nombre: 'Facial hidratante', detalle: 'Limpieza profunda y luminosidad', duracion: '50 min', precio: 18000 },
  { nombre: 'Masaje relajante', detalle: 'Un momento para bajar el ritmo', duracion: '60 min', precio: 22000 },
  { nombre: 'Manicuría soft gel', detalle: 'Diseño y cuidado de uñas', duracion: '75 min', precio: 16000 },
];

const HORARIOS = ['09:00', '10:30', '12:00', '15:00', '16:30', '18:00'];
const formatoPrecio = new Intl.NumberFormat('es-AR');
const fechaDeHoy = () => {
  const hoy = new Date();
  hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
  return hoy.toISOString().slice(0, 10);
};

export default function BienestarDemo({ onVolver }) {
  const [servicio, setServicio] = useState(SERVICIOS[0].nombre);
  const [fecha, setFecha] = useState(fechaDeHoy);
  const [hora, setHora] = useState(HORARIOS[1]);
  const servicioSeleccionado = SERVICIOS.find((opcion) => opcion.nombre === servicio);

  const solicitarTurno = (event) => {
    event.preventDefault();
    const fechaLegible = new Date(`${fecha}T12:00:00`).toLocaleDateString('es-AR');
    const mensaje = `Hola, quiero reservar un turno en Casa Calma.\n\nServicio: ${servicio}\nFecha: ${fechaLegible}\nHorario: ${hora}\nValor de referencia: $${formatoPrecio.format(servicioSeleccionado.precio)} ARS`;
    window.open(getWhatsAppLink(mensaje), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#faf7f5] text-[#302827] font-sans">
      <div className="sticky top-0 z-30 flex items-center justify-between gap-3 bg-[#342b31] px-4 py-3 text-xs text-white sm:px-6">
        <span className="truncate">DEMO DE BIENESTAR <strong className="text-rose-200">· TIMI.DEV</strong></span>
        <button onClick={onVolver} className="shrink-0 rounded-lg bg-white/10 px-3 py-2 font-semibold transition hover:bg-white/20">
          Volver al portfolio
        </button>
      </div>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#inicio" className="text-lg font-semibold tracking-wide">casa calma<span className="text-rose-500">.</span></a>
        <a href="#reservar" className="rounded-full bg-[#342b31] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-rose-700 sm:text-sm">
          Reservar turno
        </a>
      </header>

      <main>
        <section id="inicio" className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-8 sm:px-8 md:grid-cols-2 md:pb-24 md:pt-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-rose-800">
              <Sparkles className="h-4 w-4" /> Estética & bienestar en Mendoza
            </span>
            <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Un espacio para volver a vos.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#746b68] sm:text-lg">
              Tratamientos pensados para que te sientas bien, con atención personalizada y turnos simples desde tu celular.
            </p>
            <a href="#servicios" className="mt-8 inline-flex items-center gap-2 rounded-full bg-rose-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-rose-800">
              Descubrir servicios <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#746b68]">
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-rose-700" /> Quinta Sección, Mendoza</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-rose-700" /> Atención con reserva</span>
            </div>
          </div>
          <div className="relative min-h-[300px] overflow-hidden rounded-[2rem] bg-rose-100 sm:min-h-[440px]">
            <img
              src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop"
              alt="Espacio cálido de bienestar y masajes"
              className="absolute inset-0 h-full w-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#342b31]/55 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/40 bg-white/90 p-4 backdrop-blur sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-xs">
              <p className="text-sm font-semibold">Tu pausa también importa.</p>
              <p className="mt-1 text-xs text-[#746b68]">Elegí el servicio y encontrá un horario para vos.</p>
            </div>
          </div>
        </section>

        <section id="servicios" className="bg-white px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-9 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-700">Nuestros servicios</span>
              <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Cuidado en cada detalle.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {SERVICIOS.map((opcion) => (
                <article key={opcion.nombre} className="rounded-2xl border border-[#eee7e3] bg-[#faf7f5] p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">{opcion.nombre}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#746b68]">{opcion.detalle}</p>
                    </div>
                    <Sparkles className="h-5 w-5 shrink-0 text-rose-700" />
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-[#e9dfdb] pt-4 text-sm">
                    <span className="inline-flex items-center gap-1.5 text-[#746b68]"><Clock3 className="h-4 w-4" /> {opcion.duracion}</span>
                    <strong>${formatoPrecio.format(opcion.precio)} ARS</strong>
                  </div>
                  <button
                    onClick={() => { setServicio(opcion.nombre); document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="mt-4 w-full rounded-xl border border-[#d8c9c4] px-4 py-3 text-sm font-semibold transition hover:border-rose-700 hover:text-rose-800"
                  >
                    Elegir este servicio
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reservar" className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-700">Agenda online</span>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Tu próximo momento empieza acá.</h2>
            <p className="mt-4 max-w-md leading-relaxed text-[#746b68]">Seleccioná servicio, fecha y horario. Te contactamos por WhatsApp para confirmar disponibilidad.</p>
          </div>
          <form onSubmit={solicitarTurno} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#eee7e3] sm:p-8">
            <label className="block text-sm font-semibold" htmlFor="bienestar-servicio">Servicio</label>
            <select id="bienestar-servicio" value={servicio} onChange={(event) => setServicio(event.target.value)} className="mt-2 w-full rounded-xl border border-[#e5dcd8] bg-white px-4 py-3 text-sm">
              {SERVICIOS.map((opcion) => <option key={opcion.nombre} value={opcion.nombre}>{opcion.nombre}</option>)}
            </select>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold" htmlFor="bienestar-fecha">Fecha</label>
                <input id="bienestar-fecha" type="date" min={fechaDeHoy()} value={fecha} onChange={(event) => setFecha(event.target.value)} required className="mt-2 w-full rounded-xl border border-[#e5dcd8] bg-white px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold" htmlFor="bienestar-hora">Horario</label>
                <select id="bienestar-hora" value={hora} onChange={(event) => setHora(event.target.value)} className="mt-2 w-full rounded-xl border border-[#e5dcd8] bg-white px-4 py-3 text-sm">
                  {HORARIOS.map((opcion) => <option key={opcion} value={opcion}>{opcion} hs</option>)}
                </select>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between rounded-xl bg-[#faf7f5] p-4 text-sm">
              <span className="text-[#746b68]">Valor de referencia</span>
              <strong>${formatoPrecio.format(servicioSeleccionado.precio)} ARS</strong>
            </div>
            <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#342b31] px-5 py-4 text-sm font-semibold text-white transition hover:bg-rose-800">
              <Calendar className="h-4 w-4" /> Consultar por WhatsApp
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
