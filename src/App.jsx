import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Smartphone, 
  TrendingUp, 
  MessageSquare, 
  Check, 
  ChevronDown, 
  Code2, 
  Rocket, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  Utensils, 
  Wrench, 
  ShoppingBag, 
  Calculator, 
  HelpCircle,
  Menu,
  X,
  Sparkles,
  MapPin,
  CheckCircle2,
  Send,
  Flame,
  Gauge,
  Clock,
  Briefcase,
  ChevronRight,
  Shield,
  Layers,
  Award
} from 'lucide-react';

// Custom Hook para Scroll Reveal Animation
function useScrollReveal() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
}

// Componente Wrapper para secciones con animación
function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, isVisible] = useScrollReveal();
  
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 transform ${
        isVisible 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-12 scale-[0.98]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);
  const [comparisonTab, setComparisonTab] = useState('timi'); // 'timi' vs 'traditional'

  // Número de WhatsApp oficial
  const whatsappNumber = "549261600282"; // Número formato internacional Mendoza

  // Estados para la Calculadora de Presupuesto en ARS
  const [siteType, setSiteType] = useState('landing'); // landing, pyme, catalog
  const [selectedExtras, setSelectedExtras] = useState({
    seo: true,
    domain: true,
    whatsapp: true,
    maintenance: false
  });

  // Precios en ARS (Pesos Argentinos)
  const basePricesARS = {
    landing: 180000,
    pyme: 320000,
    catalog: 550000
  };

  const extraPricesARS = {
    seo: 45000,
    domain: 35000,
    whatsapp: 25000,
    maintenance: 40000
  };

  const calculateTotalARS = () => {
    let total = basePricesARS[siteType] || 0;
    if (selectedExtras.seo) total += extraPricesARS.seo;
    if (selectedExtras.domain) total += extraPricesARS.domain;
    if (selectedExtras.whatsapp) total += extraPricesARS.whatsapp;
    if (selectedExtras.maintenance) total += extraPricesARS.maintenance;
    return total;
  };

  const formatARS = (amount) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount);
  };

  const toggleExtra = (key) => {
    setSelectedExtras(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getWhatsAppLink = (message) => {
    const defaultMsg = "¡Hola timi.dev! Me pongo en contacto desde Mendoza. Me gustaría consultar por una página web para mi negocio.";
    const encoded = encodeURIComponent(message || defaultMsg);
    return `https://wa.me/${whatsappNumber}?text=${encoded}`;
  };

  const handleCalculatorWhatsApp = () => {
    const typeNames = {
      landing: 'Landing Page Express Mendoza',
      pyme: 'Sitio Web Pyme Comercial',
      catalog: 'Catálogo / Tienda Digital'
    };
    const extrasList = [];
    if (selectedExtras.seo) extrasList.push('Posicionamiento SEO Local Mendoza');
    if (selectedExtras.domain) extrasList.push('Dominio .com.ar / .com + Hosting');
    if (selectedExtras.whatsapp) extrasList.push('Botón Directo WhatsApp Ventas');
    if (selectedExtras.maintenance) extrasList.push('Mantenimiento Mensual');

    const msg = `¡Hola timi.dev! Armé un presupuesto en su web para Mendoza:\n📌 *Tipo:* ${typeNames[siteType]}\n✨ *Extras:* ${extrasList.join(', ') || 'Ninguno'}\n💰 *Estimado:* ${formatARS(calculateTotalARS())} ARS.\n\n¿Cuándo podríamos ponernos en contacto para coordinar?`;
    window.open(getWhatsAppLink(msg), '_blank');
  };

  // Demos interactivos orientados a Mendoza
  const demos = [
    {
      id: 1,
      title: "Bodega & Restó Chacras",
      category: "gastronomia",
      imageName: "Gastronomía & Enoturismo",
      icon: Utensils,
      location: "Chacras de Coria, Mendoza",
      desc: "Menú interactivo QR con reserva de mesas y compras directas por WhatsApp con integración a Maps.",
      tags: ["Menú QR", "Reservas WhatsApp", "Ultra Rápido"],
      color: "from-amber-500/20 via-orange-500/10 to-transparent",
      accent: "text-amber-400"
    },
    {
      id: 2,
      title: "Mendoza Clima Fix",
      category: "servicios",
      imageName: "Refrigeración & Servicios",
      icon: Wrench,
      location: "Godoy Cruz / Guaymallén",
      desc: "Web con cotizador express de presupuestos de reparación de aire acondicionado y urgencias 24h.",
      tags: ["SEO Local Mendoza", "Botón Urgencias", "Carga en 0.4s"],
      color: "from-cyan-500/20 via-blue-500/10 to-transparent",
      accent: "text-cyan-400"
    },
    {
      id: 3,
      title: "Moda & Calzados San Martín",
      category: "tienda",
      imageName: "Catálogo de Indumentaria",
      icon: ShoppingBag,
      location: "Mendoza Capital",
      desc: "Catálogo dinámico de ropa y accesorios sin comisiones por ventas. Actualización sencilla desde celular.",
      tags: ["Sin Comisión", "Filtros en Vivo", "Cobro con MercadoPago"],
      color: "from-emerald-500/20 via-teal-500/10 to-transparent",
      accent: "text-emerald-400"
    }
  ];

  const filteredDemos = activeTab === 'all' ? demos : demos.filter(d => d.category === activeTab);

  // FAQs adaptadas a Mendoza
  const faqs = [
    {
      q: "¿Atienden de forma presencial o remota en Mendoza?",
      a: "¡Ambas! Estamos radicados en Gran Mendoza. Podemos agendar una reunión presencial en tu local/oficina o coordinar todo mediante videollamada y WhatsApp según tu comodidad."
    },
    {
      q: "¿Cuáles son las formas de pago en Pesos Argentinos?",
      a: "Ofrecemos modalidades súper flexibles: 50% al iniciar el proyecto y 50% contra entrega final satisfecho. Aceptamos Transferencia Bancaria (CBU/CVU), Mercado Pago o efectivo."
    },
    {
      q: "¿En cuántos días tengo mi web publicada?",
      a: "Una Landing Page Express Mendoza se entrega en solo 3 a 5 días hábiles. Sitios corporativos completos o catálogos se entregan en un promedio de 7 a 10 días hábiles."
    },
    {
      q: "¿Incluyen el registro del dominio .com.ar?",
      a: "Sí, te asesoramos y configuramos tu dominio en NIC.ar (.com.ar) o .com para que la web quede 100% registrada a tu nombre con total propiedad."
    },
    {
      q: "¿Por qué es mejor React y Tailwind que una web en WordPress lenta?",
      a: "Las webs tradicionales suelen ser pesadas y lentas en celulares con redes 4G/3G de Mendoza. Nosotros programamos código a medida super liviano que abre de inmediato, dándole a tu cliente una experiencia impecable que Google premia posicionándote más arriba."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* BACKGROUND DECORATIVE GLOWS & ANIMATED PARTICLES */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px]"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* BANNER NOTIFICACIÓN MENDOZA */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-slate-950 py-1.5 px-4 text-center text-xs font-bold tracking-wide flex items-center justify-center gap-2 relative z-50">
        <span className="inline-block w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>
        <span>🚀 Impulsando comercios y pymes en Gran Mendoza y toda la provincia. ¡Consultá hoy y tené tu web esta semana!</span>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-400 p-[1.5px] shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-0.5">
                timi<span className="text-emerald-400 font-mono">.dev</span>
              </span>
              <span className="text-[10px] text-emerald-400/90 font-mono tracking-widest uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Mendoza, ARG
              </span>
            </div>
          </a>

          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#inicio" className="hover:text-emerald-400 transition-colors">Inicio</a>
            <a href="#ventajas" className="hover:text-emerald-400 transition-colors">Ventajas</a>
            <a href="#rendimiento" className="hover:text-emerald-400 transition-colors">Rendimiento</a>
            <a href="#demos" className="hover:text-emerald-400 transition-colors">Demos</a>
            <a href="#cotizador" className="hover:text-emerald-400 transition-colors">Cotizador ARS</a>
            <a href="#planes" className="hover:text-emerald-400 transition-colors">Planes</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
          </nav>

          {/* CTA Header */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href={getWhatsAppLink("¡Hola timi.dev! Quisiera consultar desde Mendoza por una web para mi comercio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 flex items-center gap-2 active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              WhatsApp Directo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 border-b border-slate-800 backdrop-blur-2xl px-6 pt-4 pb-8 space-y-4 animate-fadeIn">
            <a href="#inicio" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-emerald-400 py-1 font-medium">Inicio</a>
            <a href="#ventajas" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-emerald-400 py-1 font-medium">Ventajas</a>
            <a href="#rendimiento" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-emerald-400 py-1 font-medium">Test de Rendimiento</a>
            <a href="#demos" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-emerald-400 py-1 font-medium">Demos en Vivo</a>
            <a href="#cotizador" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-emerald-400 py-1 font-medium">Cotizador en ARS</a>
            <a href="#planes" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-emerald-400 py-1 font-medium">Planes</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-emerald-400 py-1 font-medium">FAQ</a>
            
            <a 
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <MessageSquare className="w-5 h-5 fill-slate-950" />
              Enviar Consulta por WhatsApp
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative pt-12 pb-24 md:pt-28 md:pb-36 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Columna Izquierda - Copywriting enfocado en Mendoza */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              {/* Badge de Ubicación y Estado */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium shadow-inner shadow-emerald-500/10 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-slate-200">Desarrollo Web Profesional en Mendoza</span>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400 font-mono">En Línea</span>
              </div>

              {/* H1 Principal con Gradiente Animado */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                Vendé más en tu negocio de Mendoza con una web <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 animate-gradient">ultrarrápida y moderna</span>.
              </h1>

              {/* Subtítulo / Eslogan */}
              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Transformamos comercios, gastronómicos y profesionales mendocinos en sitios de alto impacto visual. 100% adaptados a celulares y conectados a tu WhatsApp en Pesos Argentinos.
              </p>

              {/* Botones CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a 
                  href={getWhatsAppLink("¡Hola timi.dev! Me interesa pedir un presupuesto para mi negocio en Mendoza.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-base transition-all duration-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-1 flex items-center justify-center gap-3 active:scale-95 group"
                >
                  <MessageSquare className="w-5 h-5 fill-slate-950 group-hover:scale-110 transition-transform" />
                  Pedir Presupuesto en ARS
                </a>
                
                <a 
                  href="#cotizador" 
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-200 font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg backdrop-blur-md"
                >
                  Calculadora Transparente
                  <Calculator className="w-4 h-4 text-emerald-400" />
                </a>
              </div>

              {/* Garantías de confianza locales */}
              <div className="pt-6 border-t border-slate-900/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div className="space-y-1">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono flex items-center justify-center lg:justify-start gap-1">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> 100%
                  </div>
                  <div className="text-xs text-slate-400">Propiedad de tu web</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono flex items-center justify-center lg:justify-start gap-1">
                    <Clock className="w-5 h-5 text-emerald-400" /> 3-5 Días
                  </div>
                  <div className="text-xs text-slate-400">Entrega Express</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xl sm:text-2xl font-black text-white font-mono flex items-center justify-center lg:justify-start gap-1">
                    <Shield className="w-5 h-5 text-emerald-400" /> 50/50
                  </div>
                  <div className="text-xs text-slate-400">Pago Flexible ARS</div>
                </div>
              </div>

            </div>

            {/* Columna Derecha - Tarjeta Interactiva / Performance Visual */}
            <div className="lg:col-span-5 relative">
              
              {/* Glow exterior resplandeciente */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 via-teal-500/20 to-cyan-500/30 rounded-3xl blur-3xl transform rotate-2 animate-pulse"></div>

              {/* Mockup Interactivo de Web SaaS */}
              <div className="relative bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl transition-all duration-500 group">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    tu-comercio-mendoza.com.ar
                  </div>
                </div>

                {/* Simulated Google PageSpeed Audit */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">Google PageSpeed Audit</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">Verificado 100%</span>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2.5 text-center">
                      <div className="p-3 bg-slate-950/90 rounded-2xl border border-emerald-500/40 hover:scale-105 transition-transform">
                        <div className="text-emerald-400 font-black text-xl sm:text-2xl font-mono">100</div>
                        <div className="text-[9px] text-slate-400 mt-0.5">Velocidad</div>
                      </div>
                      <div className="p-3 bg-slate-950/90 rounded-2xl border border-emerald-500/40 hover:scale-105 transition-transform">
                        <div className="text-emerald-400 font-black text-xl sm:text-2xl font-mono">100</div>
                        <div className="text-[9px] text-slate-400 mt-0.5">Celular</div>
                      </div>
                      <div className="p-3 bg-slate-950/90 rounded-2xl border border-emerald-500/40 hover:scale-105 transition-transform">
                        <div className="text-emerald-400 font-black text-xl sm:text-2xl font-mono">100</div>
                        <div className="text-[9px] text-slate-400 mt-0.5">Prácticas</div>
                      </div>
                      <div className="p-3 bg-slate-950/90 rounded-2xl border border-emerald-500/40 hover:scale-105 transition-transform">
                        <div className="text-emerald-400 font-black text-xl sm:text-2xl font-mono">100</div>
                        <div className="text-[9px] text-slate-400 mt-0.5">SEO Local</div>
                      </div>
                    </div>
                  </div>

                  {/* Widget métricas técnicas */}
                  <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-400" /> Apertura instantánea 4G/5G
                      </span>
                      <span className="font-mono text-emerald-400 font-bold">0.3 Segundos</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[99%] rounded-full animate-pulse"></div>
                    </div>

                    <div className="flex justify-between items-center text-xs pt-2">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-emerald-400" /> Conversión a WhatsApp
                      </span>
                      <span className="font-mono text-emerald-400 font-bold">+300% Mensajes</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5">
                      <div className="bg-gradient-to-r from-teal-400 to-cyan-400 h-full w-[95%] rounded-full"></div>
                    </div>
                  </div>

                  {/* Destacado de ubicación */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Diseñado en Mendoza para vender más</span>
                    </div>
                    <span className="font-mono text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300 font-bold">100% Código Limpio</span>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VENTAJAS COMPETITIVAS CON SCROLL REVEAL */}
      <section id="ventajas" className="py-24 bg-slate-950/80 border-y border-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">Por qué timi.dev</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Diseño web de nivel internacional para negocios de <span className="text-emerald-400">Mendoza</span>
            </p>
            <p className="text-slate-400 text-base sm:text-lg">
              No vendemos plantillas genéricas de WordPress que tardan una eternidad en cargar. Desarrollamos código rápido, ligero y enfocado en generar clientes reales.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            <AnimatedSection delay={100}>
              <div className="h-full p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 group shadow-xl backdrop-blur-md">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Velocidad Extrema</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Webs construidas con React + Vite. Carga instantánea en 0.4s en celulares con conexión móvil en Mendoza.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="h-full p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 group shadow-xl backdrop-blur-md">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all">
                  <Smartphone className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Pensado para Celular</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  El 85% de las compras en Argentina se inician desde el smartphone. Garantizamos una navegación cómoda y rápida.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="h-full p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 group shadow-xl backdrop-blur-md">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">WhatsApp Directo</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Integración inteligente de botones que abren mensajes pre-armados para que el cliente compre con un solo toque.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="h-full p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 group shadow-xl backdrop-blur-md">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">SEO Local Mendoza</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Optimizamos tu estructura para que aparezcas cuando la gente busque tus servicios en Google desde Mendoza.
                </p>
              </div>
            </AnimatedSection>

          </div>

        </div>
      </section>

      {/* SECCIÓN INTERACTIVA COMPARATIVA DE RENDIMIENTO */}
      <section id="rendimiento" className="py-24 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <Gauge className="w-4 h-4" /> Test de Velocidad Real
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              ¿Por qué las webs viejas pierden clientes en Mendoza?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Si tu sitio tarda más de 3 segundos en abrir en 4G, el usuario se va a la competencia. Mirá la diferencia:
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
              
              {/* Selector de Comparación */}
              <div className="flex justify-center mb-10">
                <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 flex gap-2">
                  <button
                    onClick={() => setComparisonTab('timi')}
                    className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                      comparisonTab === 'timi' 
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    Web timi.dev (React + Vite)
                  </button>

                  <button
                    onClick={() => setComparisonTab('traditional')}
                    className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                      comparisonTab === 'traditional' 
                        ? 'bg-red-500/20 border border-red-500/40 text-red-400 shadow-lg' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    Web Tradicional / Lenta
                  </button>
                </div>
              </div>

              {/* Contenido Dinámico de la Comparación */}
              <div className="grid md:grid-cols-12 gap-8 items-center">
                
                <div className="md:col-span-6 space-y-6">
                  {comparisonTab === 'timi' ? (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-mono font-bold">
                        ⚡ Rendimiento Optimizado
                      </div>
                      <h3 className="text-2xl font-black text-white">Página Ultra Liviana (Bajo consumo de datos)</h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Carga instantánea en cualquier celular en Mendoza. Los botones de WhatsApp responden sin demoras y las fotos abren en alta definición sin pesar.
                      </p>
                      
                      <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                        <li className="flex items-center gap-2 text-emerald-400 font-semibold">
                          <Check className="w-4 h-4" /> Carga en menos de 0.5 segundos
                        </li>
                        <li className="flex items-center gap-2 text-emerald-400 font-semibold">
                          <Check className="w-4 h-4" /> Puntaje Google Lighthouse 95-100%
                        </li>
                        <li className="flex items-center gap-2 text-emerald-400 font-semibold">
                          <Check className="w-4 h-4" /> Retención del 98% de los visitantes
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs font-mono font-bold">
                        ⚠️ Problemas Frecuentes
                      </div>
                      <h3 className="text-2xl font-black text-white">Web Pesada con Plantillas Antiguas</h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Páginas cargadas de plugins innecesarios que tardan hasta 6 segundos en abrir. El cliente se frustra, cierra la pestaña y le compra a otro negocio.
                      </p>
                      
                      <ul className="space-y-2.5 text-xs text-slate-400 pt-2">
                        <li className="flex items-center gap-2 text-red-400 font-semibold">
                          <X className="w-4 h-4" /> Demora de 4 a 8 segundos en cargar
                        </li>
                        <li className="flex items-center gap-2 text-red-400 font-semibold">
                          <X className="w-4 h-4" /> Desajustes visuales en teléfonos
                        </li>
                        <li className="flex items-center gap-2 text-red-400 font-semibold">
                          <X className="w-4 h-4" /> Pérdida de hasta el 50% de las consultas
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Métricas Visuales Simuladas */}
                <div className="md:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-400 font-mono">Velocidad de Carga Celular</span>
                      <span className={`font-mono font-bold ${comparisonTab === 'timi' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {comparisonTab === 'timi' ? '0.4 Segundos' : '5.8 Segundos'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${
                          comparisonTab === 'timi' ? 'w-[98%] bg-emerald-400' : 'w-[25%] bg-red-500'
                        }`}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-400 font-mono">Posicionamiento SEO Local</span>
                      <span className={`font-mono font-bold ${comparisonTab === 'timi' ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {comparisonTab === 'timi' ? 'Excelente (100%)' : 'Deficiente (40%)'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${
                          comparisonTab === 'timi' ? 'w-[100%] bg-teal-400' : 'w-[40%] bg-amber-500'
                        }`}
                      ></div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border text-xs flex items-center gap-3 ${
                    comparisonTab === 'timi' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'
                  }`}>
                    {comparisonTab === 'timi' ? (
                      <>
                        <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>Con <strong>timi.dev</strong> aprovechás el 100% de tu publicidad y tráfico en Mendoza.</span>
                      </>
                    ) : (
                      <>
                        <Flame className="w-5 h-5 text-red-400 shrink-0" />
                        <span>Estás malgastando presupuesto de anuncios si tu web tarda en cargar.</span>
                      </>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* PORTAFOLIO / DEMOS INTERACTIVAS */}
      <section id="demos" className="py-24 bg-slate-950/60 border-t border-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold mb-2">Demos Diseñadas en Mendoza</h2>
              <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Modelos de webs de alta conversión
              </p>
            </div>

            {/* Filtros de Pestañas */}
            <div className="flex flex-wrap gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'all' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Todos
              </button>
              <button 
                onClick={() => setActiveTab('gastronomia')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'gastronomia' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Gastronomía
              </button>
              <button 
                onClick={() => setActiveTab('servicios')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'servicios' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Servicios Locales
              </button>
              <button 
                onClick={() => setActiveTab('tienda')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'tienda' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Tienda / Catálogo
              </button>
            </div>
          </AnimatedSection>

          {/* Grilla de Demos */}
          <div className="grid md:grid-cols-3 gap-8">
            {filteredDemos.map((demo, idx) => {
              const IconComp = demo.icon;
              return (
                <AnimatedSection key={demo.id} delay={idx * 150}>
                  <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-emerald-500/40 transition-all duration-300 flex flex-col group shadow-xl hover:-translate-y-2">
                    
                    {/* Header Demo */}
                    <div className={`h-52 bg-gradient-to-br ${demo.color} p-6 relative flex flex-col justify-between border-b border-slate-800/80`}>
                      <div className="flex justify-between items-start">
                        <span className="text-[11px] font-mono bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-slate-300 border border-slate-800 flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-emerald-400" />
                          {demo.location}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <IconComp className={`w-5 h-5 ${demo.accent}`} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-2xl font-black text-white tracking-tight">{demo.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          Demo optimizada para WhatsApp
                        </div>
                      </div>
                    </div>

                    {/* Cuerpo tarjeta */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {demo.desc}
                      </p>

                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {demo.tags.map((tag, i) => (
                            <span key={i} className="text-[11px] font-semibold bg-slate-950 text-slate-300 px-3 py-1 rounded-lg border border-slate-800">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <a 
                          href={getWhatsAppLink(`¡Hola timi.dev! Me interesó la demo "${demo.title}". Quisiera consultar para armar una opción similar en Mendoza.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-emerald-400 text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg"
                        >
                          Quiero algo así para mi negocio
                          <ArrowRight className="w-4 h-4 text-emerald-400" />
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

        </div>
      </section>

      {/* COTIZADOR DINÁMICO EN PESOS ARGENTINOS (ARS) */}
      <section id="cotizador" className="py-24 bg-slate-950 border-y border-slate-900 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
              <Calculator className="w-4 h-4" />
              Presupuestos en ARS Transparentes
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Calculá tu web para Mendoza en tiempo real</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Elegí las opciones que necesita tu comercio y enviá la cotización directa a nuestro WhatsApp. Sin costos ocultos.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl grid md:grid-cols-12 gap-8 items-start backdrop-blur-xl">
              
              {/* Opciones de Selección */}
              <div className="md:col-span-7 space-y-8">
                
                {/* Paso 1: Tipo de Web */}
                <div>
                  <label className="block text-xs font-mono uppercase text-emerald-400 font-bold mb-3">1. Tipo de Página Web</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    <button
                      onClick={() => setSiteType('landing')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        siteType === 'landing' 
                          ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm text-white">Landing Express</div>
                      <div className="text-[11px] text-slate-400 mt-1">1 Sección rápida para promociones</div>
                      <div className="text-xs font-mono text-emerald-400 font-bold mt-2">{formatARS(basePricesARS.landing)}</div>
                    </button>

                    <button
                      onClick={() => setSiteType('pyme')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        siteType === 'pyme' 
                          ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm text-white">Web Pyme</div>
                      <div className="text-[11px] text-slate-400 mt-1">Multi-sección (Servicios, Historia, Galería)</div>
                      <div className="text-xs font-mono text-emerald-400 font-bold mt-2">{formatARS(basePricesARS.pyme)}</div>
                    </button>

                    <button
                      onClick={() => setSiteType('catalog')}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        siteType === 'catalog' 
                          ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm text-white">Catálogo / Tienda</div>
                      <div className="text-[11px] text-slate-400 mt-1">Productos dinámicos sin comisiones</div>
                      <div className="text-xs font-mono text-emerald-400 font-bold mt-2">{formatARS(basePricesARS.catalog)}</div>
                    </button>

                  </div>
                </div>

                {/* Paso 2: Opciones adicionales */}
                <div>
                  <label className="block text-xs font-mono uppercase text-emerald-400 font-bold mb-3">2. Agregados Recomendados</label>
                  <div className="space-y-3">
                    
                    <div 
                      onClick={() => toggleExtra('seo')}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedExtras.seo ? 'bg-slate-950 border-emerald-500/50' : 'bg-slate-950/50 border-slate-800 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${selectedExtras.seo ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                          {selectedExtras.seo && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">Posicionamiento SEO Local Mendoza</div>
                          <div className="text-xs text-slate-400">Optimización de palabras clave para aparecer en búsquedas locales de Google</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold shrink-0 pl-2">+{formatARS(extraPricesARS.seo)}</span>
                    </div>

                    <div 
                      onClick={() => toggleExtra('domain')}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedExtras.domain ? 'bg-slate-950 border-emerald-500/50' : 'bg-slate-950/50 border-slate-800 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${selectedExtras.domain ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                          {selectedExtras.domain && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">Dominio .com.ar / .com + Hosting Anual</div>
                          <div className="text-xs text-slate-400">Trámite de registro en Nic.ar y servidor rápido en la nube</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold shrink-0 pl-2">+{formatARS(extraPricesARS.domain)}</span>
                    </div>

                    <div 
                      onClick={() => toggleExtra('whatsapp')}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedExtras.whatsapp ? 'bg-slate-950 border-emerald-500/50' : 'bg-slate-950/50 border-slate-800 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${selectedExtras.whatsapp ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                          {selectedExtras.whatsapp && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">Integración Botón Inteligente WhatsApp</div>
                          <div className="text-xs text-slate-400">Botón flotante con mensaje personalizado para cerrar ventas al instante</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold shrink-0 pl-2">+{formatARS(extraPricesARS.whatsapp)}</span>
                    </div>

                    <div 
                      onClick={() => toggleExtra('maintenance')}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedExtras.maintenance ? 'bg-slate-950 border-emerald-500/50' : 'bg-slate-950/50 border-slate-800 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${selectedExtras.maintenance ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                          {selectedExtras.maintenance && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">Soporte y Cambios Mensuales</div>
                          <div className="text-xs text-slate-400">Nos encargamos de actualizar fotos, precios o datos cuando lo pidas</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold shrink-0 pl-2">+{formatARS(extraPricesARS.maintenance)}/mes</span>
                    </div>

                  </div>
                </div>

              </div>

              {/* Resumen del Presupuesto */}
              <div className="md:col-span-5 bg-slate-950 p-6 sm:p-7 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6 shadow-xl">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
                    <span>Desglose ARS</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 font-bold">Sin sorpresas</span>
                  </h3>

                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between text-slate-300">
                      <span className="capitalize">Base ({siteType})</span>
                      <span className="font-mono font-semibold text-white">{formatARS(basePricesARS[siteType])}</span>
                    </div>

                    {selectedExtras.seo && (
                      <div className="flex justify-between text-slate-400 text-xs">
                        <span>+ SEO Local Mendoza</span>
                        <span className="font-mono text-slate-300">+{formatARS(extraPricesARS.seo)}</span>
                      </div>
                    )}
                    {selectedExtras.domain && (
                      <div className="flex justify-between text-slate-400 text-xs">
                        <span>+ Dominio & Hosting</span>
                        <span className="font-mono text-slate-300">+{formatARS(extraPricesARS.domain)}</span>
                      </div>
                    )}
                    {selectedExtras.whatsapp && (
                      <div className="flex justify-between text-slate-400 text-xs">
                        <span>+ Botón WhatsApp</span>
                        <span className="font-mono text-slate-300">+{formatARS(extraPricesARS.whatsapp)}</span>
                      </div>
                    )}
                    {selectedExtras.maintenance && (
                      <div className="flex justify-between text-slate-400 text-xs">
                        <span>+ Mantenimiento</span>
                        <span className="font-mono text-slate-300">+{formatARS(extraPricesARS.maintenance)}/m</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex flex-col gap-1">
                    <div className="text-xs text-slate-400">Inversión Estimada Total:</div>
                    <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight text-emerald-400">
                      {formatARS(calculateTotalARS())} <span className="text-xs text-slate-400 font-sans font-normal">ARS</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Facilidad de pago:</strong> 50% al iniciar y 50% al momento de la entrega final.</span>
                  </div>
                </div>

                <button
                  onClick={handleCalculatorWhatsApp}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm transition-all duration-200 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4 fill-slate-950" />
                  Enviar Cotización por WhatsApp
                </button>
              </div>

            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* PROCESO DE TRABAJO EN 3 PASOS */}
      <section className="py-24 bg-slate-950/70 border-b border-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">Proceso Transparente</h2>
            <p className="text-3xl sm:text-4xl font-black text-white">¿Cómo trabajamos en timi.dev?</p>
            <p className="text-slate-400 text-sm sm:text-base">Sin vueltas ni demoras innecesarias. 3 pasos simples para tener tu web lista.</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 relative">
            
            <AnimatedSection delay={100}>
              <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 relative space-y-4 hover:border-emerald-500/40 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-black text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold text-white">1. Charla & Relevamiento</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Nos contás sobre tu negocio en Mendoza, tus productos y lo que querés transmitir. Se define el diseño y se abona el 50% inicial.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 relative space-y-4 hover:border-emerald-500/40 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-mono font-black text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold text-white">2. Desarrollo Express</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Programamos la web en React con velocidad máxima. Te mostramos el progreso en vivo para que nos des tu visto bueno o ajustes.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 relative space-y-4 hover:border-emerald-500/40 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-black text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold text-white">3. Publicación & Ventas</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Vinculamos tu dominio (.com.ar), configuramos WhatsApp y lanzamos el sitio al público. Cancelás el 50% restante al estar satisfecho.
                </p>
              </div>
            </AnimatedSection>

          </div>

        </div>
      </section>

      {/* PLANES DE PRECIOS EN PESOS ARGENTINOS (ARS) */}
      <section id="planes" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">Precios Claros en Mendoza</h2>
            <p className="text-3xl sm:text-4xl font-black text-white">Paquetes para cada tipo de negocio</p>
            <p className="text-slate-400 text-base">Elegí la propuesta que mejor se adapte a tus metas comerciales.</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            
            {/* Plan Express ARS */}
            <AnimatedSection delay={100} className="h-full">
              <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 flex flex-col justify-between hover:border-slate-700 transition-all h-full">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Landing Express</h3>
                    <p className="text-slate-400 text-xs mt-1">Ideal para lanzar promociones o dar el primer paso online.</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white font-mono">{formatARS(180000)}</span>
                    <span className="text-slate-400 text-xs">ARS</span>
                  </div>

                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Diseño de 1 Sección Rápida</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Optimización para Celulares</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Botón Directo a WhatsApp</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Entrega estimada en 3-5 días</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-slate-500 line-through">
                      <X className="w-4 h-4 text-slate-600 shrink-0" />
                      <span>Posicionamiento SEO Multi-Página</span>
                    </li>
                  </ul>
                </div>

                <a 
                  href={getWhatsAppLink(`¡Hola timi.dev! Me interesa el plan Landing Express (${formatARS(180000)} ARS) para mi comercio en Mendoza.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs text-center block transition-all hover:text-white"
                >
                  Elegir Landing Express
                </a>
              </div>
            </AnimatedSection>

            {/* Plan Pyme Comercial ARS (Destacado) */}
            <AnimatedSection delay={200} className="h-full">
              <div className="rounded-3xl bg-slate-900 border-2 border-emerald-500 p-8 flex flex-col justify-between relative shadow-2xl shadow-emerald-500/10 h-full">
                
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  Más Elegido en Mendoza
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Web Pyme Comercial</h3>
                    <p className="text-slate-400 text-xs mt-1">Para negocios que buscan transmitir máxima autoridad e imagen.</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white font-mono">{formatARS(320000)}</span>
                    <span className="text-slate-400 text-xs">ARS</span>
                  </div>

                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Web Multi-sección (Hasta 5 pestañas)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Formulario de Contacto + Botón WhatsApp</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>SEO Local Mendoza para Google</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Integración Google Maps e Instagram</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Asesoramiento para Dominio .com.ar</span>
                    </li>
                  </ul>
                </div>

                <a 
                  href={getWhatsAppLink(`¡Hola timi.dev! Quisiera contratar el plan Web Pyme Comercial (${formatARS(320000)} ARS) para mi negocio.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs text-center block transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  Elegir Web Pyme Comercial
                </a>
              </div>
            </AnimatedSection>

            {/* Plan Catálogo ARS */}
            <AnimatedSection delay={300} className="h-full">
              <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 flex flex-col justify-between hover:border-slate-700 transition-all h-full">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Catálogo / Tienda</h3>
                    <p className="text-slate-400 text-xs mt-1">Para mostrar productos o menú interactivo sin comisiones.</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white font-mono">{formatARS(550000)}</span>
                    <span className="text-slate-400 text-xs">ARS</span>
                  </div>

                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Catálogo Interactivo con Categorías</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>0% Comisiones por cada venta realizada</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Buscador y filtros instantáneos</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Envío de pedido estructurado a WhatsApp</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Capacitación simple para cargar productos</span>
                    </li>
                  </ul>
                </div>

                <a 
                  href={getWhatsAppLink(`¡Hola timi.dev! Me interesa el plan Catálogo / Tienda (${formatARS(550000)} ARS) para mi comercio.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs text-center block transition-all hover:text-white"
                >
                  Elegir Catálogo Digital
                </a>
              </div>
            </AnimatedSection>

          </div>

        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (FAQ) */}
      <section id="faq" className="py-24 bg-slate-950 border-t border-slate-900 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatedSection className="text-center mb-14 space-y-3">
            <h2 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">Respuesta a tus dudas</h2>
            <p className="text-3xl sm:text-4xl font-black text-white">Preguntas Frecuentes</p>
          </AnimatedSection>

          <AnimatedSection className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition-all duration-300 hover:border-slate-700"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <span className="font-bold text-white text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-emerald-400 transition-transform duration-300 shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                
                {openFaq === index && (
                  <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-800/50 pt-4 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </AnimatedSection>

        </div>
      </section>

      {/* FOOTER & CONTACTO FINAL MENDOZA */}
      <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-12 gap-12 pb-12 border-b border-slate-900">
            
            {/* Col 1: Marca */}
            <div className="md:col-span-5 space-y-4">
              <a href="#" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-400 to-teal-400 p-[1px]">
                  <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
                <span className="text-xl font-black tracking-tight text-white">
                  timi<span className="text-emerald-400 font-mono">.dev</span>
                </span>
              </a>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                Desarrollo de páginas web de alta velocidad y rendimiento comercial para comercios, profesionales y pymes de Mendoza, Argentina.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mendoza, Argentina • Atención Presencial y Remota</span>
              </div>
            </div>

            {/* Col 2: Enlaces Rápidos */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-mono uppercase text-emerald-400 tracking-wider font-bold">Secciones</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#inicio" className="hover:text-emerald-400 transition-colors">Inicio</a></li>
                <li><a href="#ventajas" className="hover:text-emerald-400 transition-colors">Por qué elegirnos</a></li>
                <li><a href="#rendimiento" className="hover:text-emerald-400 transition-colors">Test de Velocidad</a></li>
                <li><a href="#demos" className="hover:text-emerald-400 transition-colors">Demos Interactivas</a></li>
                <li><a href="#cotizador" className="hover:text-emerald-400 transition-colors">Calculadora ARS</a></li>
                <li><a href="#planes" className="hover:text-emerald-400 transition-colors">Planes y Precios</a></li>
              </ul>
            </div>

            {/* Col 3: Contacto Directo */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-mono uppercase text-emerald-400 tracking-wider font-bold">Atención Comercial Mendoza</h4>
              <p className="text-slate-400 text-sm">
                Envianos un mensaje por WhatsApp y armamos una propuesta a la medida de tu presupuesto.
              </p>
              <a 
                href={getWhatsAppLink("¡Hola timi.dev! Me gustaría agendar una consulta sobre una web en Mendoza.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                Contactar por WhatsApp
              </a>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © {new Date().getFullYear()} <strong className="text-slate-400">timi.dev Studio</strong>. Mendoza, Argentina.
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] text-emerald-400/80">React 18 • Tailwind CSS • Vite</span>
            </div>
          </div>

        </div>
      </footer>

      {/* BOTÓN FLOTANTE DE WHATSAPP MENDOZA */}
      <a 
        href={getWhatsAppLink("¡Hola timi.dev! Estoy en Mendoza y quiero consultar por una página web.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all group duration-300 flex items-center justify-center border border-emerald-300/40"
        title="Contactar por WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-slate-950" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-black text-xs pl-0 group-hover:pl-2">
          ¡Consultá desde Mendoza!
        </span>
      </a>

    </div>
  );
}