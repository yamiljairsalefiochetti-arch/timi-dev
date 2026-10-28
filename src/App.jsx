import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Zap, 
  Smartphone, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Gauge, 
  ShoppingBag,
  Wrench,
  UtensilsCrossed,
  X,
  Plus,
  Minus,
  Send,
  ChevronRight,
  ShieldCheck,
  Check,
  Calendar,
  Sparkles,
  HelpCircle,
  Layers,
  Globe,
  Star,
  Flame,
  Award
} from 'lucide-react';

// ==========================================
// CONFIGURACIÓN GLOBAL DE TIMI.DEV
// ==========================================
const WHATSAPP_NUMBER = "+54 9 261 600 2822"; // Reemplazar con tu número real de Mendoza

function useScrollReveal(triggerKey) {
  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
            entry.target.classList.remove('opacity-0', 'translate-y-12', 'scale-95');
          }
        });
      },
      { threshold: 0.08 }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => {
      el.classList.add('transition-all', 'duration-700', 'ease-out');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [triggerKey]);
}

// ==========================================
// DEMO 1: AURA STUDIO (TIENDA DE ROPA)
// ==========================================
const PRODUCTOS_ROPA = [
  {
    id: 1,
    nombre: 'Buzo Oversize Heavy Cotton',
    categoria: 'Buzos',
    precio: 42000,
    imagen: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
    talles: ['S', 'M', 'L', 'XL'],
    colores: ['Negro Crudo', 'Beige Melange', 'Gris'],
    destacado: true
  },
  {
    id: 2,
    nombre: 'Jean Wide Leg Vintage Denim',
    categoria: 'Pantalones',
    precio: 48500,
    imagen: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop',
    talles: ['36', '38', '40', '42'],
    colores: ['Azul Classic', 'Negro Lavado'],
    destacado: true
  },
  {
    id: 3,
    nombre: 'Remera Pima Cotton Essential',
    categoria: 'Remeras',
    precio: 24000,
    imagen: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
    talles: ['S', 'M', 'L'],
    colores: ['Blanco Puro', 'Negro Matte', 'Verde Oliva'],
    destacado: false
  },
  {
    id: 4,
    nombre: 'Campera Puffer Minimal Edition',
    categoria: 'Abrigos',
    precio: 95000,
    imagen: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop',
    talles: ['M', 'L', 'XL'],
    colores: ['Negro Obsidian', 'Marrón Chocolate'],
    destacado: true
  },
  {
    id: 5,
    nombre: 'Gafas de Sol Retro Oval Black',
    categoria: 'Accesorios',
    precio: 19500,
    imagen: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop',
    talles: ['Único'],
    colores: ['Negro Gloss', 'Carey Vintage'],
    destacado: false
  },
  {
    id: 6,
    nombre: 'Cinto de Cuero Legítimo Garra',
    categoria: 'Accesorios',
    precio: 17500,
    imagen: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=600&auto=format&fit=crop',
    talles: ['85', '95', '105'],
    colores: ['Suela', 'Negro'],
    destacado: false
  }
];

function TiendaRopaDemo({ onVolver }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [categoriaSel, setCategoriaSel] = useState('Todos');
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [modalProducto, setModalProducto] = useState(null);
  const [talleSel, setTalleSel] = useState('');
  const [colorSel, setColorSel] = useState('');

  const categorias = ['Todos', 'Buzos', 'Pantalones', 'Remeras', 'Abrigos', 'Accesorios'];
  const productosFiltrados = categoriaSel === 'Todos' ? PRODUCTOS_ROPA : PRODUCTOS_ROPA.filter(p => p.categoria === categoriaSel);

  const abrirModal = (producto) => {
    setModalProducto(producto);
    setTalleSel(producto.talles[0] || '');
    setColorSel(producto.colores[0] || '');
  };

  const agregarAlCarrito = () => {
    if (!modalProducto) return;
    const idx = carrito.findIndex(i => i.id === modalProducto.id && i.talle === talleSel && i.color === colorSel);
    if (idx > -1) {
      const nc = [...carrito];
      nc[idx].cantidad += 1;
      setCarrito(nc);
    } else {
      setCarrito([...carrito, { ...modalProducto, talle: talleSel, color: colorSel, cantidad: 1 }]);
    }
    setModalProducto(null);
    setCarritoAbierto(true);
  };

  const cambiarCantidad = (idx, delta) => {
    const nc = [...carrito];
    nc[idx].cantidad += delta;
    if (nc[idx].cantidad <= 0) nc.splice(idx, 1);
    setCarrito(nc);
  };

  const totalCarrito = carrito.reduce((acc, i) => acc + (i.precio * i.cantidad), 0);
  const totalUnidades = carrito.reduce((acc, i) => acc + i.cantidad, 0);

  const enviarPedidoWhatsApp = () => {
    if (carrito.length === 0) return;
    let msg = "🛍️ *¡Hola AURA Studio! Quisiera realizar el siguiente pedido:*\n\n";
    carrito.forEach((i, idx) => {
      msg += `*${idx + 1}. ${i.nombre}* (${i.talle} / ${i.color}) - Cant: ${i.cantidad} x $${i.precio.toLocaleString('es-AR')}\n`;
    });
    msg += `\n💳 *TOTAL: $${totalCarrito.toLocaleString('es-AR')} ARS*\n¿Tienen stock disponible para transferir?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-serif">
      <div className="bg-stone-900 text-stone-200 py-3 px-4 text-center text-xs font-sans flex items-center justify-between sticky top-0 z-50 border-b border-stone-800 shadow-md">
        <span className="truncate">✨ DEMO TIENDA DE ROPA — DESARROLLADO POR <strong>TIMI.DEV</strong></span>
        <button onClick={onVolver} className="bg-emerald-500 text-slate-950 font-bold px-4 py-1.5 rounded text-xs hover:bg-emerald-400 font-sans transition shadow-lg">
          Volver a timi.dev
        </button>
      </div>

      <header className="bg-white border-b border-stone-200 px-6 py-6 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-light tracking-[0.25em] uppercase text-stone-900">A U R A</h1>
            <p className="text-[10px] tracking-widest text-stone-500 uppercase mt-0.5">Mendoza Studio & Showroom</p>
          </div>
          <button onClick={() => setCarritoAbierto(true)} className="relative bg-stone-900 text-white p-3 rounded-full hover:bg-stone-800 transition">
            <ShoppingBag className="w-5 h-5" />
            {totalUnidades > 0 && <span className="absolute -top-1 -right-1 bg-stone-900 text-white border border-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">{totalUnidades}</span>}
          </button>
        </div>
      </header>

      <section className="py-16 px-6 text-center bg-stone-100 border-b border-stone-200">
        <span className="text-xs uppercase tracking-[0.3em] text-stone-500 font-sans">Colección 2026</span>
        <h2 className="text-3xl sm:text-5xl font-normal text-stone-900 mt-2 tracking-tight">Elegancia Minimalista</h2>
        <div className="flex justify-center gap-3 mt-8 overflow-x-auto pb-2 font-sans">
          {categorias.map(cat => (
            <button key={cat} onClick={() => setCategoriaSel(cat)} className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition ${categoriaSel === cat ? 'bg-stone-900 text-white' : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-400'}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12 font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productosFiltrados.map(prod => (
            <div key={prod.id} className="bg-white border border-stone-200 rounded-lg overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div>
                <div className="aspect-[4/5] overflow-hidden bg-stone-100 relative">
                  <img src={prod.imagen} alt={prod.nombre} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400">{prod.categoria}</span>
                  <h3 className="text-base font-medium text-stone-900 mt-1">{prod.nombre}</h3>
                  <p className="text-lg font-bold text-stone-900 mt-2">${prod.precio.toLocaleString('es-AR')} ARS</p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button onClick={() => abrirModal(prod)} className="w-full bg-stone-900 hover:bg-stone-800 text-white py-3 text-xs font-semibold uppercase tracking-wider transition rounded shadow">
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {modalProducto && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans animate-fadeIn">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative shadow-2xl">
            <button onClick={() => setModalProducto(null)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-900"><X className="w-5 h-5" /></button>
            <div className="flex gap-4 items-center mb-6">
              <img src={modalProducto.imagen} alt={modalProducto.nombre} className="w-20 h-24 object-cover rounded" />
              <div>
                <h3 className="font-medium text-stone-900">{modalProducto.nombre}</h3>
                <p className="text-stone-900 font-bold mt-1">${modalProducto.precio.toLocaleString('es-AR')} ARS</p>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs uppercase font-bold text-stone-500 mb-2">Talle:</label>
              <div className="flex gap-2">
                {modalProducto.talles.map(t => (
                  <button key={t} onClick={() => setTalleSel(t)} className={`px-4 py-2 text-xs font-bold rounded border transition ${talleSel === t ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-200 text-stone-700'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-xs uppercase font-bold text-stone-500 mb-2">Color:</label>
              <div className="flex flex-wrap gap-2">
                {modalProducto.colores.map(c => (
                  <button key={c} onClick={() => setColorSel(c)} className={`px-3 py-1.5 text-xs rounded border transition ${colorSel === c ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-200 text-stone-700'}`}>{c}</button>
                ))}
              </div>
            </div>
            <button onClick={agregarAlCarrito} className="w-full bg-stone-900 text-white py-4 font-bold text-xs uppercase tracking-widest rounded hover:bg-stone-800 transition">Confirmar Selección</button>
          </div>
        </div>
      )}

      {carritoAbierto && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end font-sans">
          <div className="bg-white w-full max-w-md h-full flex flex-col justify-between p-6 border-l border-stone-200 shadow-2xl animate-slideLeft">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <h3 className="font-bold text-stone-900">Tu Carrito ({totalUnidades})</h3>
                <button onClick={() => setCarritoAbierto(false)}><X className="w-5 h-5 text-stone-500" /></button>
              </div>
              <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto">
                {carrito.length === 0 ? <p className="text-center text-stone-400 py-12 text-sm">El carrito está vacío.</p> : carrito.map((item, idx) => (
                  <div key={idx} className="flex gap-3 bg-stone-50 p-3 rounded border border-stone-200 items-center justify-between">
                    <img src={item.imagen} alt={item.nombre} className="w-12 h-14 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-stone-900">{item.nombre}</h4>
                      <p className="text-[11px] text-stone-500">{item.talle} / {item.color}</p>
                      <p className="text-xs font-bold text-stone-900 mt-1">${(item.precio * item.cantidad).toLocaleString('es-AR')}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-stone-200 rounded px-2 py-1">
                      <button onClick={() => cambiarCantidad(idx, -1)} className="text-xs text-stone-500 font-bold">-</button>
                      <span className="text-xs font-bold">{item.cantidad}</span>
                      <button onClick={() => cambiarCantidad(idx, 1)} className="text-xs text-stone-500 font-bold">+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {carrito.length > 0 && (
              <div className="pt-4 border-t border-stone-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-stone-500 text-sm">Total:</span>
                  <span className="text-xl font-bold text-stone-900">${totalCarrito.toLocaleString('es-AR')} ARS</span>
                </div>
                <button onClick={enviarPedidoWhatsApp} className="w-full bg-stone-900 text-white font-bold py-4 text-xs uppercase tracking-widest rounded hover:bg-stone-800 flex items-center justify-center gap-2 shadow-lg transition">
                  <Send className="w-4 h-4" /> Finalizar Pedido por WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// DEMO 2: LOS TONELES (GASTRONOMÍA & BODEGA)
// ==========================================
const MENU_GASTRO = [
  { id: 1, categoria: 'Entradas', nombre: 'Empanadas de Ojo de Bife al Barro', descripcion: 'Receta tradicional cortada a cuchillo (2 unidades).', precio: 6500, foto: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=600&auto=format&fit=crop' },
  { id: 2, categoria: 'Parrilla', nombre: 'Ojo de Bife Madurado 450g', descripcion: 'Acompañado de papas rústicas al romero y chimichurri casero.', precio: 28000, foto: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop' },
  { id: 3, categoria: 'Parrilla', nombre: 'Parri-Vegetariana a las Brasas', descripcion: 'Verduras de estación grilladas con provoleta ahumada.', precio: 19000, foto: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop' },
  { id: 4, categoria: 'Vinos', nombre: 'Malbec Reserva Gran Luján', descripcion: 'Cosecha seleccionada de Valle de Uco, crianza 18 meses.', precio: 22000, foto: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop' },
  { id: 5, categoria: 'Postres', nombre: 'Volcán de Dulce de Leche', descripcion: 'Con helado artesanal de crema americana y garrapiñada de nuez.', precio: 7500, foto: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=600&auto=format&fit=crop' }
];

function GastroDemo({ onVolver }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [catSel, setCatSel] = useState('Parrilla');
  const [personas, setPersonas] = useState(2);
  const [fecha, setFecha] = useState('Hoy');
  const [hora, setHora] = useState('21:30');

  const enviarReservaWhatsApp = () => {
    let msg = `🍷 *¡Hola Los Toneles! Quisiera reservar una mesa:*\n👥 Comensales: ${personas}\n📅 Fecha: ${fecha}\n⏰ Hora: ${hora} hs\n¿Tienen disponibilidad?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-amber-50 font-serif">
      <div className="bg-amber-600 text-stone-950 py-3 px-4 text-center text-xs font-sans flex items-center justify-between sticky top-0 z-50 border-b border-amber-700 shadow-md">
        <span className="truncate">🍷 DEMO GASTRONOMÍA — DESARROLLADO POR <strong>TIMI.DEV</strong></span>
        <button onClick={onVolver} className="bg-stone-950 text-amber-400 font-bold px-4 py-1.5 rounded text-xs font-sans transition hover:bg-stone-900 shadow">
          Volver a timi.dev
        </button>
      </div>

      <header className="relative bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200')] bg-cover bg-center py-20 px-6 text-center border-b border-amber-900/40">
        <div className="absolute inset-0 bg-black/75"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-amber-400 text-xs tracking-[0.3em] font-sans uppercase">Chacras de Coria • Mendoza</span>
          <h1 className="text-4xl sm:text-6xl font-bold mt-2 text-amber-100">LOS TONELES</h1>
          <p className="text-amber-200/80 text-sm mt-3 font-sans max-w-md mx-auto">Grill, Cocina de Fuegos y Cava de Vinos Mendocinos.</p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-12 font-sans">
        <h2 className="text-center text-2xl font-bold text-amber-400 uppercase tracking-widest font-serif mb-8">Nuestra Carta Digital</h2>
        <div className="flex justify-center gap-3 mb-8">
          {['Entradas', 'Parrilla', 'Vinos', 'Postres'].map(cat => (
            <button key={cat} onClick={() => setCatSel(cat)} className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${catSel === cat ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/20' : 'bg-stone-900 text-amber-200 border border-amber-900/40'}`}>{cat}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MENU_GASTRO.filter(m => m.categoria === catSel).map(item => (
            <div key={item.id} className="bg-stone-900 border border-amber-900/30 rounded-xl p-4 flex gap-4 items-center hover:border-amber-500/40 transition">
              <img src={item.foto} alt={item.nombre} className="w-20 h-20 object-cover rounded-lg" />
              <div>
                <h3 className="font-serif text-lg font-bold text-amber-100">{item.nombre}</h3>
                <p className="text-stone-400 text-xs mt-1">{item.descripcion}</p>
                <p className="text-amber-400 font-bold mt-2 text-sm">${item.precio.toLocaleString('es-AR')} ARS</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-900 border-t border-amber-900/40 py-12 px-6 font-sans">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-bold font-serif text-amber-400">Reservá tu Mesa al Instante</h3>
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div>
              <label className="text-[10px] text-amber-400 uppercase font-bold block mb-1">Personas</label>
              <select value={personas} onChange={e => setPersonas(e.target.value)} className="w-full bg-stone-950 border border-amber-900/50 rounded p-2 text-xs text-amber-100">
                <option value="2">2 Personas</option><option value="4">4 Personas</option><option value="6">6+ Personas</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-amber-400 uppercase font-bold block mb-1">Fecha</label>
              <select value={fecha} onChange={e => setFecha(e.target.value)} className="w-full bg-stone-950 border border-amber-900/50 rounded p-2 text-xs text-amber-100">
                <option value="Hoy">Hoy</option><option value="Mañana">Mañana</option><option value="Fin de Semana">Fin de Semana</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-amber-400 uppercase font-bold block mb-1">Hora</label>
              <select value={hora} onChange={e => setHora(e.target.value)} className="w-full bg-stone-950 border border-amber-900/50 rounded p-2 text-xs text-amber-100">
                <option value="13:00">13:00 hs</option><option value="21:30">21:30 hs</option><option value="23:00">23:00 hs</option>
              </select>
            </div>
          </div>
          <button onClick={enviarReservaWhatsApp} className="w-full mt-6 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg transition">
            <Calendar className="w-4 h-4" /> Enviar Solicitud de Reserva por WhatsApp
          </button>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// DEMO 3: MENDOZA FIX (SERVICIO TÉCNICO)
// ==========================================
function TechDemo({ onVolver }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [equipo, setEquipo] = useState('iPhone');
  const [falla, setFalla] = useState('Pantalla / Modulo');
  const PRECIOS_TECH = { 'Pantalla / Modulo': 45000, 'Cambio de Batería': 28000, 'Puerto de Carga': 19000, 'Limpieza / Placa': 22000 };

  const solicitarTurnoWhatsApp = () => {
    let msg = `🔧 *¡Hola Mendoza Fix! Solicito turno técnico:*\n📱 Dispositivo: ${equipo}\n⚠️ Falla: ${falla}\n💰 Est: $${PRECIOS_TECH[falla].toLocaleString('es-AR')}\n¿Tienen turno?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <div className="bg-sky-500 text-slate-950 py-3 px-4 text-center text-xs font-mono flex items-center justify-between sticky top-0 z-50 border-b border-sky-400 shadow-md">
        <span className="truncate">🔧 DEMO SERVICIO TÉCNICO — DESARROLLADO POR <strong>TIMI.DEV</strong></span>
        <button onClick={onVolver} className="bg-slate-950 text-sky-400 font-bold px-4 py-1.5 rounded text-xs font-sans hover:bg-slate-900 transition">
          Volver a timi.dev
        </button>
      </div>

      <header className="bg-slate-950 border-b border-slate-800 px-6 py-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wrench className="w-6 h-6 text-sky-400" />
            <h1 className="text-xl font-black text-white">MENDOZA <span className="text-sky-400">FIX</span></h1>
          </div>
          <span className="text-xs text-slate-400 font-mono">📍 Microcentro & Godoy Cruz</span>
        </div>
      </header>

      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold px-3 py-1 rounded-full uppercase">Servicio Técnico Especializado</span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-4">Reparamos tu equipo en el día.</h2>
        <div className="mt-10 bg-slate-950 border border-slate-800 p-6 sm:p-8 rounded-2xl text-left max-w-xl mx-auto shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Zap className="w-5 h-5 text-sky-400" /> Cotizador Express</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 font-bold uppercase block mb-2">1. Dispositivo:</label>
              <div className="grid grid-cols-3 gap-2">
                {['iPhone', 'Android', 'Notebook'].map(eq => (
                  <button key={eq} onClick={() => setEquipo(eq)} className={`py-2.5 rounded-lg text-xs font-bold border transition ${equipo === eq ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>{eq}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 font-bold uppercase block mb-2">2. Falla:</label>
              <select value={falla} onChange={e => setFalla(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-slate-200">
                <option value="Pantalla / Modulo">Pantalla o Módulo Roto</option>
                <option value="Cambio de Batería">Batería agotada / Hinchada</option>
                <option value="Puerto de Carga">Puerto de Carga</option>
                <option value="Limpieza / Placa">Limpieza de Placa / Mojado</option>
              </select>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center mt-6">
              <div>
                <span className="text-xs text-slate-400 block">Estimado:</span>
                <span className="text-2xl font-black text-sky-400">${PRECIOS_TECH[falla].toLocaleString('es-AR')} ARS</span>
              </div>
            </div>
            <button onClick={solicitarTurnoWhatsApp} className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-black py-4 rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-lg">
              <MessageSquare className="w-4 h-4" /> Solicitar Turno por WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL TIMI.DEV (LANDING VIVA Y ANIMADA)
// ==========================================
export default function App() {
  const [demoActiva, setDemoActiva] = useState(null); // null, 'ropa', 'gastro', 'tech'
  useScrollReveal(demoActiva);

  const [planBase, setPlanBase] = useState('express');
  const [extraSeo, setExtraSeo] = useState(true);
  const [extraSoporte, setExtraSoporte] = useState(false);
  const [extraDominio, setExtraDominio] = useState(true);

  const PRECIOS_PLANES = { express: 180000, pyme: 320000, catalogo: 550000 };
  const PRECIOS_EXTRAS = { seo: 45000, soporte: 35000, dominio: 25000 };

  const totalPresupuesto = PRECIOS_PLANES[planBase] +
    (extraSeo ? PRECIOS_EXTRAS.seo : 0) +
    (extraSoporte ? PRECIOS_EXTRAS.soporte : 0) +
    (extraDominio ? PRECIOS_EXTRAS.dominio : 0);

  const enviarCotizacionWhatsApp = () => {
    const nombrePlan = planBase === 'express' ? 'Landing Page Express' : planBase === 'pyme' ? 'Web Pyme Comercial' : 'Tienda / Catálogo Digital';
    let mensaje = `👋 ¡Hola timi.dev! Me interesa cotizar una página web para mi negocio en Mendoza.\n\n`;
    mensaje += `📋 *Plan:* ${nombrePlan} ($${PRECIOS_PLANES[planBase].toLocaleString('es-AR')} ARS)\n`;
    if (extraSeo) mensaje += ` • SEO Local ($45.000)\n`;
    if (extraDominio) mensaje += ` • Dominio & Hosting ($25.000)\n`;
    if (extraSoporte) mensaje += ` • Soporte Mensual ($35.000)\n`;
    mensaje += `\n💰 *TOTAL ESTIMADO: $${totalPresupuesto.toLocaleString('es-AR')} ARS*\n¿Coordinamos llamada?`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  // RENDERIZADO CONDICIONAL DE DEMOS
  if (demoActiva === 'ropa') return <TiendaRopaDemo onVolver={() => setDemoActiva(null)} />;
  if (demoActiva === 'gastro') return <GastroDemo onVolver={() => setDemoActiva(null)} />;
  if (demoActiva === 'tech') return <TechDemo onVolver={() => setDemoActiva(null)} />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 relative overflow-hidden">
      
      {/* Fondo Glow Dinámico */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent blur-3xl pointer-events-none z-0 animate-pulse"></div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-xl text-emerald-400 group-hover:scale-110 group-hover:border-emerald-400 transition-all duration-300">
              <Code2 className="w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              timi<span className="text-emerald-400">.dev</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#ventajas" className="hover:text-emerald-400 transition-colors">Ventajas</a>
            <a href="#stack" className="hover:text-emerald-400 transition-colors">Tecnología</a>
            <a href="#portafolio" className="hover:text-emerald-400 transition-colors">Portafolio</a>
            <a href="#metodologia" className="hover:text-emerald-400 transition-colors">Metodología</a>
            <a href="#precios" className="hover:text-emerald-400 transition-colors">Precios</a>
            <a href="#cotizador" className="hover:text-emerald-400 transition-colors">Cotizador</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">Preguntas</a>
          </nav>

          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20timi.dev!%20Quisiera%20consultar%20por%20una%20web`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 fill-slate-950" /> Hablar por WhatsApp
          </a>
        </div>
      </header>

      {/* HERO SECTION CON ANIMACIÓN DENSAMENTE VISUAL */}
      <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-3xl mx-auto reveal-on-scroll">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md shadow-inner shadow-emerald-500/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Agencia de Desarrollo Web en Mendoza, Argentina
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Páginas web rápidas que <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent animate-pulse">atraen clientes</span> a tu negocio.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
            Creamos tu sitio web con el stack tecnológico de las empresas líderes. Carga instantánea en celulares, posicionamiento SEO local e integración comercial con WhatsApp.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#cotizador" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-8 py-4 rounded-xl text-base transition-all duration-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-1 flex items-center justify-center gap-3 group">
              Calcular Presupuesto <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </a>
            <a href="#portafolio" className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-emerald-500/40 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 text-center shadow-lg backdrop-blur-md">
              Ver Demos Interactivas
            </a>
          </div>

          <div className="mt-16 p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl max-w-2xl mx-auto shadow-2xl hover:border-emerald-500/40 transition-all duration-500">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Gauge className="w-4 h-4 text-emerald-400" />
                <span>Auditoría Google PageSpeed</span>
              </div>
              <span className="text-xs font-mono bg-emerald-950/80 text-emerald-400 px-3 py-1 rounded-md border border-emerald-800/60 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                100/100 Rendimiento
              </span>
            </div>
            
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="p-2 rounded-xl hover:bg-slate-800/50 transition"><div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">100</div><div className="text-[10px] sm:text-xs text-slate-400 font-mono mt-1">Rendimiento</div></div>
              <div className="p-2 rounded-xl hover:bg-slate-800/50 transition"><div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">100</div><div className="text-[10px] sm:text-xs text-slate-400 font-mono mt-1">Accesibilidad</div></div>
              <div className="p-2 rounded-xl hover:bg-slate-800/50 transition"><div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">100</div><div className="text-[10px] sm:text-xs text-slate-400 font-mono mt-1">Prácticas</div></div>
              <div className="p-2 rounded-xl hover:bg-slate-800/50 transition"><div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">100</div><div className="text-[10px] sm:text-xs text-slate-400 font-mono mt-1">SEO Google</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* VENTAJAS CON HOVER GLOW 3D */}
      <section id="ventajas" className="py-20 bg-slate-900/40 border-y border-slate-800/60 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">¿Por qué timi.dev?</h2>
            <p className="text-3xl sm:text-4xl font-black text-white mt-2">Tecnología moderna pensada para ventas reales.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2 reveal-on-scroll backdrop-blur-md group">
              <div className="bg-emerald-500/10 border border-emerald-500/30 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all"><Zap className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-white">Velocidad Extrema (React + Vite)</h3>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">Sin plantillas pesadas de WordPress. Tu web carga en menos de 1 segundo en celulares con 4G o 5G en Mendoza.</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2 reveal-on-scroll backdrop-blur-md group">
              <div className="bg-emerald-500/10 border border-emerald-500/30 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all"><Smartphone className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-white">Directo a tu WhatsApp</h3>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">El 85% del tráfico se genera en móviles. Diseñamos con botones flotantes y mensajes de compra directos.</p>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2 reveal-on-scroll backdrop-blur-md group">
              <div className="bg-emerald-500/10 border border-emerald-500/30 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all"><TrendingUp className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-white">Optimizado para Google (SEO Local)</h3>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">Estructura SEO limpia y etiquetado inteligente para posicionar cuando busquen tus productos o servicios en Mendoza.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STACK TECNOLÓGICO */}
      <section id="stack" className="py-20 border-b border-slate-800/60 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 reveal-on-scroll">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">Infraestructura</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Stack de Código Profesional</h2>
            <p className="text-slate-400 text-sm mt-2">Usamos las mismas herramientas que las empresas tecnológicas globales.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center reveal-on-scroll">
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/40 transition duration-300">
              <div className="text-emerald-400 font-mono font-bold text-lg mb-1">React 18</div>
              <p className="text-xs text-slate-400">Interfaces ultra fluidas</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/40 transition duration-300">
              <div className="text-emerald-400 font-mono font-bold text-lg mb-1">Vite</div>
              <p className="text-xs text-slate-400">Bundling instantáneo</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/40 transition duration-300">
              <div className="text-emerald-400 font-mono font-bold text-lg mb-1">Tailwind CSS</div>
              <p className="text-xs text-slate-400">Estilos responsivos</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/40 transition duration-300">
              <div className="text-emerald-400 font-mono font-bold text-lg mb-1">Vercel Edge</div>
              <p className="text-xs text-slate-400">Hosting CDN en la nube</p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTAFOLIO DE DEMOS CON TARJETAS INTERACTIVAS */}
      <section id="portafolio" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">Demos Interactivas</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Probá cómo se vería tu negocio online.</h2>
          <p className="text-slate-400 text-sm mt-3">Hacé clic en cualquier plantilla para navegar la demo en vivo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 flex flex-col justify-between group reveal-on-scroll hover:-translate-y-2">
            <div>
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop" alt="Aura" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <span className="absolute top-3 right-3 bg-emerald-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping"></span> Carrito Activo
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider"><ShoppingBag className="w-4 h-4" /> Moda & Accesorios</div>
                <h3 className="text-xl font-bold text-white mt-2">Aura Studio - Tienda de Ropa</h3>
                <p className="text-slate-400 text-sm mt-2">Catálogo por categorías, selección de talle/color y checkout automático a WhatsApp.</p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button onClick={() => setDemoActiva('ropa')} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-500/20">
                Ver Demo Live <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 flex flex-col justify-between group reveal-on-scroll hover:-translate-y-2">
            <div>
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop" alt="Toneles" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping"></span> Reserva Activa
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider"><UtensilsCrossed className="w-4 h-4" /> Gastronomía & Bodegas</div>
                <h3 className="text-xl font-bold text-white mt-2">Los Toneles - Grill & Cava</h3>
                <p className="text-slate-400 text-sm mt-2">Menú QR interactivo, carta de vinos y reserva de mesa directo a WhatsApp.</p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button onClick={() => setDemoActiva('gastro')} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-500/20">
                Ver Demo Live <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 flex flex-col justify-between group reveal-on-scroll hover:-translate-y-2">
            <div>
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop" alt="Fix" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <span className="absolute top-3 right-3 bg-sky-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping"></span> Cotizador Activo
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider"><Wrench className="w-4 h-4" /> Servicios & Profesionales</div>
                <h3 className="text-xl font-bold text-white mt-2">Mendoza Fix - Servicio Técnico</h3>
                <p className="text-slate-400 text-sm mt-2">Cotizador express de fallas en vivo por equipo y reserva de turnos en tiempo real.</p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button onClick={() => setDemoActiva('tech')} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-500/20">
                Ver Demo Live <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* METODOLOGÍA DE TRABAJO */}
      <section id="metodologia" className="py-20 bg-slate-900/30 border-y border-slate-800/60 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">Paso a Paso</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Proceso de Trabajo Transparente</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center reveal-on-scroll">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl relative hover:border-emerald-500/40 transition duration-300">
              <span className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">1</span>
              <h3 className="font-bold text-white text-lg">Reunión / Briefing</h3>
              <p className="text-slate-400 text-sm mt-2">Definimos objetivos comerciales, diseño visual y productos o servicios a destacar.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl relative hover:border-emerald-500/40 transition duration-300">
              <span className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">2</span>
              <h3 className="font-bold text-white text-lg">Desarrollo en React</h3>
              <p className="text-slate-400 text-sm mt-2">Programamos tu sitio a medida, integrando carritos, formularios y WhatsApp.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl relative hover:border-emerald-500/40 transition duration-300">
              <span className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">3</span>
              <h3 className="font-bold text-white text-lg">Publicación & Vercel</h3>
              <p className="text-slate-400 text-sm mt-2">Desplegamos tu web en servidores CDN globales con tu propio dominio .com.ar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN PRECIOS */}
      <section id="precios" className="py-20 bg-slate-900/40 border-y border-slate-800/60 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">Planes Transparentes</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">Inversión clara sin costos ocultos.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between reveal-on-scroll hover:border-emerald-500/40 transition">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Inicial</span>
                <h3 className="text-2xl font-bold text-white mt-1">Landing Page Express</h3>
                <div className="mt-6 mb-6"><span className="text-3xl font-black text-white">$180.000</span><span className="text-slate-400 text-sm"> ARS</span></div>
                <ul className="space-y-3 text-sm text-slate-300 border-t border-slate-800 pt-6">
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400" /> Single-Page Ultrarrápido</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400" /> Botón directo a WhatsApp</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400" /> Entrega rápida en 5 días</li>
                </ul>
              </div>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Interesa%20Plan%20Express`} target="_blank" rel="noopener noreferrer" className="mt-8 w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 rounded-xl text-center text-sm block transition">Elegir Plan Express</a>
            </div>

            <div className="bg-slate-900 border-2 border-emerald-500 p-8 rounded-2xl flex flex-col justify-between relative shadow-2xl shadow-emerald-500/10 reveal-on-scroll">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-xs font-black uppercase px-4 py-1 rounded-full shadow-lg">Más Elegido</span>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">Comercial</span>
                <h3 className="text-2xl font-bold text-white mt-1">Web Pyme Comercial</h3>
                <div className="mt-6 mb-6"><span className="text-3xl font-black text-emerald-400">$320.000</span><span className="text-slate-400 text-sm"> ARS</span></div>
                <ul className="space-y-3 text-sm text-slate-300 border-t border-slate-800 pt-6">
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400" /> Hasta 4 Secciones personalizadas</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400" /> Optimización SEO para Google Mendoza</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400" /> Galería de servicios y contacto</li>
                </ul>
              </div>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Interesa%20Plan%20Comercial`} target="_blank" rel="noopener noreferrer" className="mt-8 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3.5 rounded-xl text-center text-sm block shadow-lg shadow-emerald-500/25 transition">Elegir Plan Comercial</a>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between reveal-on-scroll hover:border-emerald-500/40 transition">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Ventas</span>
                <h3 className="text-2xl font-bold text-white mt-1">Catálogo / Tienda Digital</h3>
                <div className="mt-6 mb-6"><span className="text-3xl font-black text-white">$550.000</span><span className="text-slate-400 text-sm"> ARS</span></div>
                <ul className="space-y-3 text-sm text-slate-300 border-t border-slate-800 pt-6">
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400" /> Catálogo interactivo</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400" /> Carrito de compras funcional</li>
                  <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-400" /> Envío de pedido a WhatsApp</li>
                </ul>
              </div>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Interesa%20Plan%20Catalogo`} target="_blank" rel="noopener noreferrer" className="mt-8 w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 rounded-xl text-center text-sm block transition">Elegir Plan Catálogo</a>
            </div>
          </div>
        </div>
      </section>

      {/* COTIZADOR INTERACTIVO */}
      <section id="cotizador" className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl reveal-on-scroll">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">Calculadora Personalizada</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Armá tu presupuesto a medida</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">1. Tipo de Sitio:</label>
                <div className="space-y-2">
                  <button onClick={() => setPlanBase('express')} className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${planBase === 'express' ? 'bg-emerald-950/50 border-emerald-500 text-white shadow-lg' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                    <div><div className="font-bold text-sm">Landing Page Express</div><div className="text-xs text-slate-400">Single-page veloz</div></div>
                    <span className="font-mono text-sm font-bold text-emerald-400">$180.000 ARS</span>
                  </button>
                  <button onClick={() => setPlanBase('pyme')} className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${planBase === 'pyme' ? 'bg-emerald-950/50 border-emerald-500 text-white shadow-lg' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                    <div><div className="font-bold text-sm">Web Pyme Comercial</div><div className="text-xs text-slate-400">Multi-sección SEO</div></div>
                    <span className="font-mono text-sm font-bold text-emerald-400">$320.000 ARS</span>
                  </button>
                  <button onClick={() => setPlanBase('catalogo')} className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${planBase === 'catalogo' ? 'bg-emerald-950/50 border-emerald-500 text-white shadow-lg' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                    <div><div className="font-bold text-sm">Catálogo / Tienda Digital</div><div className="text-xs text-slate-400">Con Carrito & WhatsApp</div></div>
                    <span className="font-mono text-sm font-bold text-emerald-400">$550.000 ARS</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">2. Extras Opcionales:</label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                    <div className="flex items-center gap-3"><input type="checkbox" checked={extraSeo} onChange={e => setExtraSeo(e.target.checked)} className="accent-emerald-500 w-4 h-4 cursor-pointer" /><span className="text-sm font-medium text-slate-300">SEO Google Maps & Mendoza</span></div>
                    <span className="text-xs font-mono text-emerald-400">+$45.000 ARS</span>
                  </label>
                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                    <div className="flex items-center gap-3"><input type="checkbox" checked={extraDominio} onChange={e => setExtraDominio(e.target.checked)} className="accent-emerald-500 w-4 h-4 cursor-pointer" /><span className="text-sm font-medium text-slate-300">Dominio .com.ar & Hosting</span></div>
                    <span className="text-xs font-mono text-emerald-400">+$25.000 ARS</span>
                  </label>
                  <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                    <div className="flex items-center gap-3"><input type="checkbox" checked={extraSoporte} onChange={e => setExtraSoporte(e.target.checked)} className="accent-emerald-500 w-4 h-4 cursor-pointer" /><span className="text-sm font-medium text-slate-300">Soporte Mensual</span></div>
                    <span className="text-xs font-mono text-emerald-400">+$35.000 ARS/mes</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between h-full">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Total Estimado</span>
                <div className="mt-2 mb-6"><span className="text-4xl font-black text-emerald-400">${totalPresupuesto.toLocaleString('es-AR')}</span><span className="text-slate-400 text-sm"> ARS</span></div>
              </div>
              <button onClick={enviarCotizacionWhatsApp} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 hover:-translate-y-0.5">
                <Send className="w-5 h-5" /> Enviar Cotización por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 border-t border-slate-800/60 bg-slate-900/25 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal-on-scroll">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">Dudas Comunes</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-emerald-500/40 transition">
              <h3 className="font-bold text-white text-base">¿Cuánto tiempo tarda el desarrollo de una web?</h3>
              <p className="text-slate-400 text-sm mt-2">El Plan Express se entrega en 5 días hábiles. Las webs comerciales o catálogos toman entre 7 y 12 días laborables.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-emerald-500/40 transition">
              <h3 className="font-bold text-white text-base">¿Tengo que pagar mantenimiento mensual obligatoriamente?</h3>
              <p className="text-slate-400 text-sm mt-2">No. Una vez finalizado el desarrollo la web es 100% tuya y no requiere pagos mensuales obligatorios.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-emerald-500/40 transition">
              <h3 className="font-bold text-white text-base">¿Cómo funciona el envío del pedido o consulta a WhatsApp?</h3>
              <p className="text-slate-400 text-sm mt-2">Cuando tu cliente elige productos o llena el formulario, la web genera un mensaje formateado automáticamente que se abre en el WhatsApp de tu negocio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-xl text-emerald-400"><Code2 className="w-5 h-5" /></div>
            <span className="text-lg font-black text-white">timi<span className="text-emerald-400">.dev</span></span>
          </div>
          <p className="text-xs text-slate-500">© 2026 timi.dev — Desarrollo de páginas web de alto rendimiento. Mendoza, Argentina.</p>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:underline font-mono">WhatsApp Directo</a>
        </div>
      </footer>

      {/* BOTÓN FLOTANTE CON EFECTO PULSE / WING ANIMADO */}
      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border border-emerald-400 group" aria-label="WhatsApp">
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none"></span>
        <MessageSquare className="w-6 h-6 relative z-10 fill-slate-950 group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  );
}