const SETTINGS = {
  whatsappNumber: "542236955735",
  instagramUrl: "https://instagram.com/rvsdesarrollador/",
};

function projectGuide(plan = "", price = "") {
  const selectedPlan =
    plan && price
      ? `Plan consultado: ${plan} - ${price}

`
      : "";

  return `Hola RVS Desarrollador

Quiero solicitar una cotizacion para mi proyecto.

${selectedPlan}Para poder orientarme mejor, completo estos datos:

1. Nombre / empresa:
2. Rubro o actividad:
3. Ciudad / localidad:
4. Que quiero lograr con la web o sistema?
5. Que productos o servicios quiero mostrar?
6. Secciones que imagino (Inicio, Nosotros, Servicios, Galeria, Contacto, etc.):
7. Ya tengo logo? Si / No
8. Ya tengo dominio? Si / No - Cual?
9. Redes sociales actuales:
10. Colores o estilo que me gustaria:
11. Funciones que necesito (WhatsApp, Maps, formularios, catalogo, reservas, pagos, usuarios, otras):
12. Tengo textos, fotos y material preparado?
13. Fecha aproximada en la que me gustaria publicar:
14. Otros comentarios o ideas:

Gracias.`;
}

function openWhatsApp(message) {
  const url = `https://wa.me/${SETTINGS.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelectorAll(".js-plan-whatsapp").forEach((button) => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan || "";
    const price = button.dataset.price || "";
    openWhatsApp(projectGuide(plan, price));
  });
});

document.querySelectorAll(".js-general-quote").forEach((button) => {
  button.addEventListener("click", () => {
    openWhatsApp(projectGuide());
  });
});

const instagramButton = document.getElementById("instagramButton");

if (instagramButton) {
  instagramButton.href = SETTINGS.instagramUrl;
}

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

function closeMenu() {
  mobileMenu?.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuButton?.setAttribute("aria-expanded", "false");
  mobileMenu?.setAttribute("aria-hidden", "true");
}

menuButton?.addEventListener("click", () => {
  const open = !mobileMenu?.classList.contains("open");

  mobileMenu?.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  mobileMenu?.setAttribute("aria-hidden", String(!open));
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));
