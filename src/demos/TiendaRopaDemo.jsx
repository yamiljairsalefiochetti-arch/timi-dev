import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Send, Check, Filter, Heart } from 'lucide-react';

const PRODUCTOS = [
  {
    id: 1,
    nombre: 'Buzo Oversize Cotton',
    categoria: 'Buzos',
    precio: 38500,
    imagen: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop',
    talles: ['S', 'M', 'L', 'XL'],
    colores: ['Negro', 'Beige', 'Gris'],
    destacado: true
  },
  {
    id: 2,
    nombre: 'Jean Wide Leg Vintage',
    categoria: 'Pantalones',
    precio: 45000,
    imagen: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop',
    talles: ['36', '38', '40', '42'],
    colores: ['Azul Denin', 'Negro Lavado'],
    destacado: true
  },
  {
    id: 3,
    nombre: 'Remera Pima Cotton Essential',
    categoria: 'Remeras',
    precio: 22000,
    imagen: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
    talles: ['S', 'M', 'L'],
    colores: ['Blanco', 'Negro', 'Verde Oliva'],
    destacado: false
  },
  {
    id: 4,
    nombre: 'Campera Puffer Minimal',
    categoria: 'Abrigos',
    precio: 89000,
    imagen: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop',
    talles: ['M', 'L', 'XL'],
    colores: ['Negro Matte', 'Marrón Chocolate'],
    destacado: true
  },
  {
    id: 5,
    nombre: 'Gafas de Sol Retro Oval',
    categoria: 'Accesorios',
    precio: 18500,
    imagen: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop',
    talles: ['Único'],
    colores: ['Negro', 'Carey'],
    destacado: false
  },
  {
    id: 6,
    nombre: 'Cinto de Cuero Garra',
    categoria: 'Accesorios',
    precio: 16000,
    imagen: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=600&auto=format&fit=crop',
    talles: ['85', '95', '105'],
    colores: ['Suela', 'Negro'],
    destacado: false
  }
];

export default function TiendaRopaDemo() {
  const [categoriaSel, setCategoriaSel] = useState('Todos');
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [modalProducto, setModalProducto] = useState(null);
  
  // Selección en Modal
  const [talleSel, setTalleSel] = useState('');
  const [colorSel, setColorSel] = useState('');

  const categorias = ['Todos', 'Buzos', 'Pantalones', 'Remeras', 'Abrigos', 'Accesorios'];

  const productosFiltrados = categoriaSel === 'Todos' 
    ? PRODUCTOS 
    : PRODUCTOS.filter(p => p.categoria === categoriaSel);

  // Abrir Modal de selección
  const abrirModal = (producto) => {
    setModalProducto(producto);
    setTalleSel(producto.talles[0] || '');
    setColorSel(producto.colores[0] || '');
  };

  // Agregar al Carrito
  const agregarAlCarrito = () => {
    if (!modalProducto) return;

    const itemExistenteIndex = carrito.findIndex(
      item => item.id === modalProducto.id && item.talle === talleSel && item.color === colorSel
    );

    if (itemExistenteIndex > -1) {
      const nuevoCarrito = [...carrito];
      nuevoCarrito[itemExistenteIndex].cantidad += 1;
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([
        ...carrito,
        {
          id: modalProducto.id,
          nombre: modalProducto.nombre,
          precio: modalProducto.precio,
          imagen: modalProducto.imagen,
          talle: talleSel,
          color: colorSel,
          cantidad: 1
        }
      ]);
    }

    setModalProducto(null);
    setCarritoAbierto(true);
  };

  // Actualizar Cantidades
  const cambiarCantidad = (index, delta) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad += delta;
    if (nuevoCarrito[index].cantidad <= 0) {
      nuevoCarrito.splice(index, 1);
    }
    setCarrito(nuevoCarrito);
  };

  // Calcular Total
  const totalCarrito = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Enviar Pedido por WhatsApp
  const enviarPedidoWhatsApp = () => {
    if (carrito.length === 0) return;

    let mensaje = "🛍️ *¡Hola AURA Studio! Quisiera realizar el siguiente pedido:*\n\n";
    carrito.forEach((item, index) => {
      mensaje += `*${index + 1}. ${item.nombre}*\n`;
      mensaje += `   • Talle: ${item.talle} | Color: ${item.color}\n`;
      mensaje += `   • Cantidad: ${item.cantidad} x $${item.precio.toLocaleString('es-AR')} = *$${(item.precio * item.cantidad).toLocaleString('es-AR')}*\n\n`;
    });

    mensaje += `💳 *TOTAL A PAGAR: $${totalCarrito.toLocaleString('es-AR')} ARS*\n\n`;
    mensaje += "📍 *Método de entrega:* Envío a domicilio en Mendoza / Retiro por showroom\n";
    mensaje += "¿Me confirman el stock para proceder con la transferencia?";

    const url = `https://wa.me/5492610000000?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans">
      
      {/* Banner Superior Demo */}
      <div className="bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-400 py-2 px-4 text-center text-xs sm:text-sm font-mono flex items-center justify-between">
        <span className="truncate">⚡ DEMO INTERACTIVA CREADA POR <strong>TIMI.DEV</strong></span>
        <button 
          onClick={() => window.history.back()}
          className="bg-emerald-500 text-slate-950 font-sans font-semibold px-3 py-1 rounded-md text-xs hover:bg-emerald-400 transition"
        >
          Volver a timi.dev
        </button>
      </div>

      {/* Header de la Tienda */}
      <header className="sticky top-0 z-30 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-widest uppercase text-white">AURA <span className="text-neutral-400 font-light text-sm">STUDIO</span></h1>
          <p className="text-xs text-neutral-400">Mendoza, Argentina</p>
        </div>

        {/* Botón Carrito */}
        <button 
          onClick={() => setCarritoAbierto(true)}
          className="relative bg-neutral-800 hover:bg-neutral-700 text-white p-3 rounded-full transition flex items-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          {totalUnidades > 0 && (
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-slate-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
              {totalUnidades}
            </span>
          )}
        </button>
      </header>

      {/* Hero Store */}
      <section className="relative bg-neutral-950 py-12 px-4 sm:px-8 text-center border-b border-neutral-800">
        <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800/40">
          Nueva Colección 2026
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
          ESTILO URBANO & MINIMALISTA
        </h2>
        <p className="text-neutral-400 max-w-xl mx-auto mt-2 text-sm sm:text-base">
          Envíos a todo Mendoza y retiro en Showroom Capital. Elegí tus prendas y hacé tu pedido por WhatsApp en 1 click.
        </p>

        {/* Categorías (Filtros) */}
        <div className="flex items-center justify-center gap-2 mt-8 overflow-x-auto pb-2 scrollbar-none">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaSel(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition whitespace-nowrap ${
                categoriaSel === cat 
                  ? 'bg-white text-neutral-950 font-bold' 
                  : 'bg-neutral-800/80 text-neutral-400 hover:bg-neutral-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grilla de Productos */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {productosFiltrados.map(prod => (
            <div 
              key={prod.id} 
              className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square overflow-hidden bg-neutral-900">
                  <img 
                    src={prod.imagen} 
                    alt={prod.nombre} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {prod.destacado && (
                    <span className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md border border-neutral-700 uppercase">
                      Bestseller
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <span className="text-xs text-neutral-500 uppercase tracking-wider">{prod.categoria}</span>
                  <h3 className="text-lg font-semibold text-white mt-1 group-hover:text-emerald-400 transition">{prod.nombre}</h3>
                  <p className="text-xl font-bold text-emerald-400 mt-2">
                    ${prod.precio.toLocaleString('es-AR')} ARS
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button 
                  onClick={() => abrirModal(prod)}
                  className="w-full bg-neutral-800 hover:bg-white hover:text-neutral-950 text-white font-medium py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" /> Seleccionar Talle & Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal de Selección de Talle / Color */}
      {modalProducto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setModalProducto(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-4 items-center mb-6">
              <img src={modalProducto.imagen} alt={modalProducto.nombre} className="w-20 h-20 object-cover rounded-xl" />
              <div>
                <h3 className="font-bold text-white">{modalProducto.nombre}</h3>
                <p className="text-emerald-400 font-bold">${modalProducto.precio.toLocaleString('es-AR')} ARS</p>
              </div>
            </div>

            {/* Talles */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Seleccionar Talle:</label>
              <div className="flex gap-2">
                {modalProducto.talles.map(talle => (
                  <button
                    key={talle}
                    onClick={() => setTalleSel(talle)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${
                      talleSel === talle 
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400' 
                        : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    {talle}
                  </button>
                ))}
              </div>
            </div>

            {/* Colores */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-neutral-400 uppercase mb-2">Seleccionar Color:</label>
              <div className="flex flex-wrap gap-2">
                {modalProducto.colores.map(color => (
                  <button
                    key={color}
                    onClick={() => setColorSel(color)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      colorSel === color 
                        ? 'bg-white text-neutral-950 border-white' 
                        : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-500'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={agregarAlCarrito}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" /> Confirmar & Agregar al Carrito
            </button>
          </div>
        </div>
      )}

      {/* Drawer del Carrito Sidebar */}
      {carritoAbierto && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="bg-neutral-950 w-full max-w-md h-full flex flex-col justify-between p-6 border-l border-neutral-800 relative animate-in slide-in-from-right duration-300">
            
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-lg text-white">Tu Carrito ({totalUnidades})</h3>
                </div>
                <button onClick={() => setCarritoAbierto(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Lista de Items */}
              <div className="mt-6 space-y-4 max-h-[55vh] overflow-y-auto pr-1">
                {carrito.length === 0 ? (
                  <p className="text-center text-neutral-500 py-12">El carrito está vacío por ahora.</p>
                ) : (
                  carrito.map((item, idx) => (
                    <div key={idx} className="flex gap-4 bg-neutral-900 p-3 rounded-xl border border-neutral-800 items-center justify-between">
                      <img src={item.imagen} alt={item.nombre} className="w-14 h-14 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-white leading-tight">{item.nombre}</h4>
                        <p className="text-xs text-neutral-400 mt-0.5">Talle: {item.talle} | {item.color}</p>
                        <p className="text-sm font-bold text-emerald-400 mt-1">${(item.precio * item.cantidad).toLocaleString('es-AR')}</p>
                      </div>

                      {/* Botones Cantidad */}
                      <div className="flex items-center gap-2 bg-neutral-800 rounded-lg p-1 border border-neutral-700">
                        <button onClick={() => cambiarCantidad(idx, -1)} className="p-1 hover:text-white text-neutral-400">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">{item.cantidad}</span>
                        <button onClick={() => cambiarCantidad(idx, 1)} className="p-1 hover:text-white text-neutral-400">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Total y Checkout */}
            {carrito.length > 0 && (
              <div className="pt-4 border-t border-neutral-800">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-neutral-400 text-sm">Total a pagar:</span>
                  <span className="text-2xl font-extrabold text-emerald-400">${totalCarrito.toLocaleString('es-AR')} ARS</span>
                </div>

                <button
                  onClick={enviarPedidoWhatsApp}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 text-base shadow-lg shadow-emerald-500/20"
                >
                  <Send className="w-5 h-5" /> Enviar Pedido a WhatsApp
                </button>
                <p className="text-[11px] text-center text-neutral-500 mt-2">
                  🔒 El pedido llegará detallado al WhatsApp del comercio.
                </p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}