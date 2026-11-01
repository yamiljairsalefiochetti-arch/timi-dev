export const WHATSAPP_NUMBER = "5492616002822";

export function getWhatsAppLink(message) {
  const defaultMessage = "¡Hola timi.dev! Me pongo en contacto desde Mendoza. Me gustaría consultar por una página web para mi negocio.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || defaultMessage)}`;
}
