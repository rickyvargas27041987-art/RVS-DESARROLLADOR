const SETTINGS = {
  whatsappNumber: "542236955735",
  instagramUrl: "https://instagram.com/rvsdesarrollador/",
};

function trackAnalyticsEvent(eventName, params = {}) {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", eventName, {
    ...params,
    page_location: window.location.href,
    page_title: document.title,
  });
}

function trackLead(detailEvent, leadType, leadName, leadPrice = "") {
  trackAnalyticsEvent(detailEvent, {
    lead_type: leadType,
    lead_name: leadName,
    lead_price: leadPrice,
  });

  trackAnalyticsEvent("generate_lead", {
    lead_source: "rvs_website",
    lead_type: leadType,
    lead_name: leadName,
    lead_price: leadPrice,
  });
}

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

const PLAN_EVENTS = {
  "Web Básica": "lead_web_basica",
  "Web Profesional": "lead_web_profesional",
  "Web Empresa": "lead_web_empresa",
};

document.querySelectorAll(".js-plan-whatsapp").forEach((button) => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan || "Plan web";
    const price = button.dataset.price || "";
    const detailEvent = PLAN_EVENTS[plan] || "lead_plan_web";

    trackLead(detailEvent, "plan_web", plan, price);
    openWhatsApp(projectGuide(plan, price));
  });
});

document.querySelectorAll(".js-general-quote").forEach((button) => {
  button.addEventListener("click", () => {
    trackLead(
      "lead_cotizacion_general",
      "cotizacion_general",
      "Cotizacion general"
    );
    openWhatsApp(projectGuide());
  });
});


/* ===== SERVICIOS ADMINISTRADOS RVS ===== */
function serviceGuide(service = "", price = "") {
  return `Hola RVS Desarrollador

Quiero consultar por un servicio adicional.

Servicio: ${service}
Valor orientativo: ${price}

Mis datos:

1. Nombre / empresa:
2. Rubro o actividad:
3. Ciudad / localidad:
4. Ya tengo una web o sistema? Si / No
5. Dominio actual, si tengo:
6. Que necesito resolver?
7. Cantidad aproximada de usuarios o cuentas:
8. Otros comentarios:

Gracias.`;
}

function serviceEventName(service) {
  const normalized = service.toLowerCase();

  if (normalized.includes("hosting")) return "lead_hosting";
  if (normalized.includes("correo")) return "lead_correo";
  if (normalized.includes("mantenimiento")) return "lead_mantenimiento";
  if (normalized.includes("dominio")) return "lead_dominio_dns";
  if (normalized.includes("automatización") || normalized.includes("automatizacion")) {
    return "lead_automatizacion_ia";
  }
  if (normalized.includes("infraestructura")) return "lead_infraestructura_apps";

  return "lead_servicio";
}

document.querySelectorAll(".js-service-whatsapp").forEach((button) => {
  button.addEventListener("click", () => {
    const service = button.dataset.service || "Servicio RVS";
    const price = button.dataset.price || "";

    trackLead(
      serviceEventName(service),
      "servicio_administrado",
      service,
      price
    );

    openWhatsApp(serviceGuide(service, price));
  });
});


const instagramButton = document.getElementById("instagramButton");

if (instagramButton) {
  instagramButton.href = SETTINGS.instagramUrl;

  instagramButton.addEventListener("click", () => {
    trackAnalyticsEvent("click_instagram", {
      destination: SETTINGS.instagramUrl,
    });
  });
}


/* ===== SECCIONES VISTAS ===== */
const SECTION_EVENTS = {
  servicios: "view_services",
  planes: "view_plans",
  continuidad: "view_hosting_support",
  proyectos: "view_projects",
  proceso: "view_process",
  contacto: "view_contact",
};

const viewedSections = new Set();

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const sectionId = entry.target.id;
      const eventName = SECTION_EVENTS[sectionId];

      if (!eventName || viewedSections.has(sectionId)) return;

      viewedSections.add(sectionId);
      trackAnalyticsEvent(eventName, {
        section_id: sectionId,
      });
    });
  },
  { threshold: 0.35 }
);

Object.keys(SECTION_EVENTS).forEach((sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) sectionObserver.observe(section);
});


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
