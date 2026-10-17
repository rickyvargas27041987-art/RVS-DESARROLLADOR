const SETTINGS = {
  // Reemplazá estos valores antes de publicar.
  // WhatsApp: código de país + número, sin +, espacios ni guiones.
  whatsappNumber: "549XXXXXXXXXX",
  instagramUrl: "https://instagram.com/",
};

const message =
  "Hola RVS Desarrollador, tengo una idea/proyecto y me gustaría consultar.";

const whatsappButton = document.getElementById("whatsappButton");
const instagramButton = document.getElementById("instagramButton");

if (whatsappButton) {
  const configured = !SETTINGS.whatsappNumber.includes("X");
  whatsappButton.href = configured
    ? `https://wa.me/${SETTINGS.whatsappNumber}?text=${encodeURIComponent(message)}`
    : "#contacto";

  if (!configured) {
    whatsappButton.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Antes de publicar, completá tu número de WhatsApp en script.js.");
    });
  }
}

if (instagramButton) {
  instagramButton.href = SETTINGS.instagramUrl;
}

document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

function closeMenu() {
  mobileMenu?.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuButton?.setAttribute("aria-expanded", "false");
  mobileMenu?.setAttribute("aria-hidden", "true");
}

menuButton?.addEventListener("click", () => {
  const open = !mobileMenu.classList.contains("open");
  mobileMenu.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  mobileMenu.setAttribute("aria-hidden", String(!open));
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

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
