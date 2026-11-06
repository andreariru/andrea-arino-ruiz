/* =========================================================
   ANDREA ARIÑO RUIZ — PORTFOLIO
   v6 · main.js
 
   01. Translations (ES / EN / CA)
   02. Language system
   03. Header (scroll state + mobile menu)
   04. Active section in navigation
   05. Scroll reveal
   06. Project modal
   07. Contact form (mailto)
   08. Footer year
========================================================= */


/* =========================================================
   01. TRANSLATIONS
========================================================= */

const translations = {

    es: {
        skip_link: "Saltar al contenido",
        menu_label: "Abrir menú",
        nav_reel: "REEL",
        nav_about: "SOBRE MÍ",
        nav_projects: "TRABAJOS",
        nav_contact: "CONTACTO",

        reel_eyebrow: "ANIMADORA DE PERSONAJES 3D",
        reel_role: "DEMO REEL",
        hero_location: "Barcelona · Disponible en remoto",
        cta_projects: "Ver trabajos",
        cta_contact: "Contactar",

        studios_title: "Proyectos en los que he trabajado",

        about_eyebrow: "Un poco sobre mí",
        about_role: "ANIMADORA DE PERSONAJES 3D",
        sticker_years: "años animando",
        about_highlight: "Combino el pensamiento analítico con la creatividad para dar vida a personajes e historias.",
        about_paragraph_1: "Soy animadora 3D de personajes con más de 5 años de experiencia profesional en series de televisión, largometrajes, cortometrajes, documentales y animación para videojuegos.",
        about_paragraph_2: "A lo largo de mi trayectoria, he tenido la oportunidad de trabajar con equipos internacionales y adaptarme a diferentes pipelines de producción, flujos de trabajo y estilos de animación. Disfruto especialmente de la interpretación de personajes, las escenas con diálogo y la creación de actuaciones sutiles a través de la mecánica corporal y la animación facial.",
        about_paragraph_3: "Mi formación en ingeniería y desarrollo de producto me permite aportar un enfoque analítico y estructurado al trabajo creativo. Aprendo rápido y valoro la colaboración, el aprendizaje continuo y la entrega de animaciones de alta calidad cumpliendo los plazos de producción.",
        feature_experience: "Más de 5 años<br>en producción",
        feature_acting: "Character acting<br>e interpretación",
        feature_approach: "Enfoque analítico<br>y creativo",

        projects_eyebrow: "UNA SELECCIÓN DE MIS TRABAJOS",
        projects_intro: "Selecciona un cartel para ver los detalles.",
        cat_feature: "Largometraje",
        cat_documentary: "Documental",
        cat_series: "Serie de animación",
        label_studio: "Estudio",
        label_role: "Rol",
        label_about: "Sobre el proyecto",
        modal_close: "Cerrar",
        project_role_animator: "Animadora de personajes",
        project_role_layout_animator: "Layout y animación de personajes",
        desc_superthings_movie: "Una película de animación que lleva el universo de SuperThings a la gran pantalla. Cuando los mundos de Kaboom City y Normalópolis chocan, comienza una nueva aventura que reúne a héroes y villanos. Trabajé en la animación de personajes de la película.",
        desc_lady_everest: "Un documental que cuenta la historia de Junko Tabei, la primera mujer en alcanzar la cima del Everest. Combinando imágenes reales y secuencias animadas, la película da vida a momentos clave de su extraordinaria trayectoria. Trabajé en layout y animación de personajes.",
        desc_superthings_rivals: "Una serie de aventuras animada ambientada en Kaboom City, un mundo donde los objetos cotidianos se transforman en superhéroes y villanos. Trabajé en la animación de personajes, contribuyendo a dar vida a la acción y personalidad de su diverso elenco.",
        desc_trotties: "Una serie de animación sobre un grupo de muñecas mágicas que viajan por todo el mundo, descubriendo nuevos lugares y viviendo emocionantes aventuras. Contribuí a la animación de personajes, dando vida a sus personalidades e historias.",
        desc_beas_block: "Una serie de animación preescolar producida por Sesame Workshop, ambientada en un mundo lleno de color donde Bea y sus amigos descubren la importancia de la amabilidad, la empatía y ayudar a los demás. Trabajé en la animación de personajes, dando vida a los protagonistas y sus aventuras cotidianas.",
        desc_friendzspace: "Una serie animada de comedia y aventuras que sigue a tres niños que viajan por el espacio para conocer y hacerse amigos de niños alienígenas. Trabajé en la animación de una gran variedad de personajes, incluidos humanos, bípedos no humanos y cuadrúpedos.",

        contact_eyebrow: "Trabajemos juntos",
        contact_title: "CONTACTO",
        contact_subtitle: "Abierta a nuevas oportunidades y colaboraciones. ¡Hablemos!",
        contact_email_label: "CORREO ELECTRÓNICO",
        contact_location_label: "UBICACIÓN Y DISPONIBILIDAD",
        contact_location: "Barcelona, España",
        contact_availability: "Disponible para oportunidades remotas en todo el mundo",
        contact_linkedin: "Conectemos en LinkedIn",
        contact_form_title: "Envíame un mensaje",
        contact_name_label: "Nombre",
        contact_form_email_label: "Correo electrónico",
        contact_subject_label: "Asunto",
        contact_message_label: "Mensaje",
        contact_submit: "ENVIAR MENSAJE",
        ph_name: "Tu nombre",
        ph_email: "tu@email.com",
        ph_subject: "¿De qué se trata?",
        ph_message: "Cuéntame tu proyecto...",
        form_error: "Rellena todos los campos con un correo válido.",
        form_note: "Se abrirá tu aplicación de correo para enviar el mensaje.",

        footer_rights: "Todos los derechos reservados.",
        footer_role: "ANIMADORA DE PERSONAJES 3D",
        footer_top: "Volver arriba"
    },

    en: {
        skip_link: "Skip to content",
        menu_label: "Open menu",
        nav_reel: "REEL",
        nav_about: "ABOUT ME",
        nav_projects: "PROJECTS",
        nav_contact: "CONTACT",

        reel_eyebrow: "3D CHARACTER ANIMATOR",
        reel_role: "DEMO REEL",
        hero_location: "Barcelona · Open to remote work",
        cta_projects: "View projects",
        cta_contact: "Get in touch",

        studios_title: "Projects I've worked on",

        about_eyebrow: "A little about me",
        about_role: "3D CHARACTER ANIMATOR",
        sticker_years: "years animating",
        about_highlight: "Combining analytical thinking with creativity to bring characters and stories to life.",
        about_paragraph_1: "I'm a 3D Character Animator with over 5 years of professional experience across TV series, feature films, short films, documentaries and gameplay animation.",
        about_paragraph_2: "Throughout my career, I've had the opportunity to work with international teams and adapt to different production pipelines, workflows and animation styles. I particularly enjoy character acting, dialogue shots and bringing subtle performances to life through body mechanics and facial animation.",
        about_paragraph_3: "With a background in engineering and product development, I bring an analytical and structured approach to creative work. I'm a fast learner who values collaboration, continuous learning and delivering high-quality animation while meeting production deadlines.",
        feature_experience: "5+ years<br>in production",
        feature_acting: "Character acting<br>&amp; performance",
        feature_approach: "Analytical &amp;<br>creative approach",

        projects_eyebrow: "SELECTED WORK",
        projects_intro: "Select a poster to see the details.",
        cat_feature: "Feature film",
        cat_documentary: "Documentary",
        cat_series: "Animation series",
        label_studio: "Studio",
        label_role: "Role",
        label_about: "About the project",
        modal_close: "Close",
        project_role_animator: "Character Animator",
        project_role_layout_animator: "Layout & Character Animator",
        desc_superthings_movie: "A feature-length animated adventure that brings the world of SuperThings to the big screen. When the worlds of Kaboom City and Normalópolis collide, a new adventure begins, bringing heroes and villains together. I worked on character animation for the film.",
        desc_lady_everest: "A documentary telling the story of Junko Tabei, the first woman to reach the summit of Mount Everest. Combining live-action footage and animated sequences, the film brings key moments of her extraordinary journey to life. I worked on layout and character animation.",
        desc_superthings_rivals: "An animated adventure series set in Kaboom City, a world where everyday objects transform into superheroes and villains. I worked on character animation, contributing to the action and personality of its diverse cast of characters.",
        desc_trotties: "An animated series about a group of magical dolls who travel around the world, discovering new places and experiencing exciting adventures. I contributed to the character animation, helping bring their personalities and stories to life.",
        desc_beas_block: "A preschool animated series produced by Sesame Workshop, set in a colourful world where Bea and her friends discover the importance of kindness, empathy and helping others. I worked on character animation, bringing the characters and their everyday adventures to life.",
        desc_friendzspace: "An animated comedy-adventure series following three kids who travel through space to meet and befriend alien children. I worked on character animation across a wide variety of characters, including humans, non-human bipeds and quadrupeds.",

        contact_eyebrow: "Let's work together",
        contact_title: "CONTACT",
        contact_subtitle: "Open to new opportunities and collaborations. Let's connect!",
        contact_email_label: "EMAIL",
        contact_location_label: "LOCATION & AVAILABILITY",
        contact_location: "Barcelona, Spain",
        contact_availability: "Open to remote opportunities worldwide",
        contact_linkedin: "Let's connect on LinkedIn",
        contact_form_title: "Send me a message",
        contact_name_label: "Name",
        contact_form_email_label: "Email",
        contact_subject_label: "Subject",
        contact_message_label: "Message",
        contact_submit: "SEND MESSAGE",
        ph_name: "Your name",
        ph_email: "you@email.com",
        ph_subject: "What's it about?",
        ph_message: "Tell me about your project...",
        form_error: "Please fill in all fields with a valid email.",
        form_note: "Your email app will open to send the message.",

        footer_rights: "All rights reserved.",
        footer_role: "3D CHARACTER ANIMATOR",
        footer_top: "Back to top"
    },

    ca: {
        skip_link: "Salta al contingut",
        menu_label: "Obre el menú",
        nav_reel: "REEL",
        nav_about: "SOBRE MI",
        nav_projects: "PROJECTES",
        nav_contact: "CONTACTE",

        reel_eyebrow: "ANIMADORA DE PERSONATGES 3D",
        reel_role: "DEMO REEL",
        hero_location: "Barcelona · Disponible en remot",
        cta_projects: "Veure projectes",
        cta_contact: "Contactar",

        studios_title: "Projectes en què he treballat",

        about_eyebrow: "Una mica sobre mi",
        about_role: "ANIMADORA DE PERSONATGES 3D",
        sticker_years: "anys animant",
        about_highlight: "Combino el pensament analític amb la creativitat per donar vida a personatges i històries.",
        about_paragraph_1: "Soc animadora 3D de personatges amb més de 5 anys d'experiència professional en sèries de televisió, llargmetratges, curtmetratges, documentals i animació per a videojocs.",
        about_paragraph_2: "Al llarg de la meva trajectòria, he tingut l'oportunitat de treballar amb equips internacionals i adaptar-me a diferents pipelines de producció, fluxos de treball i estils d'animació. Gaudeixo especialment de la interpretació de personatges, els plans amb diàleg i la creació d'actuacions subtils a través de la mecànica corporal i l'animació facial.",
        about_paragraph_3: "La meva formació en enginyeria i desenvolupament de producte em permet aportar un enfocament analític i estructurat al treball creatiu. Aprenc ràpid i valoro la col·laboració, l'aprenentatge continu i la creació d'animacions d'alta qualitat complint els terminis de producció.",
        feature_experience: "Més de 5 anys<br>en producció",
        feature_acting: "Character acting<br>i interpretació",
        feature_approach: "Enfocament analític<br>i creatiu",

        projects_eyebrow: "UNA SELECCIÓ DELS MEUS TREBALLS",
        projects_intro: "Selecciona un cartell per veure'n els detalls.",
        cat_feature: "Llargmetratge",
        cat_documentary: "Documental",
        cat_series: "Sèrie d'animació",
        label_studio: "Estudi",
        label_role: "Rol",
        label_about: "Sobre el projecte",
        modal_close: "Tanca",
        project_role_animator: "Animadora de personatges",
        project_role_layout_animator: "Layout i animació de personatges",
        desc_superthings_movie: "Una pel·lícula d'animació que porta l'univers de SuperThings a la gran pantalla. Quan els mons de Kaboom City i Normalópolis xoquen, comença una nova aventura que reuneix herois i vilans. Vaig treballar en l'animació de personatges de la pel·lícula.",
        desc_lady_everest: "Un documental que explica la història de Junko Tabei, la primera dona a assolir el cim de l'Everest. Combinant imatges reals i seqüències animades, la pel·lícula dona vida a moments clau de la seva extraordinària trajectòria. Vaig treballar en layout i animació de personatges.",
        desc_superthings_rivals: "Una sèrie d'aventures d'animació ambientada a Kaboom City, un món on els objectes quotidians es transformen en superherois i vilans. Vaig treballar en l'animació de personatges, contribuint a donar vida a l'acció i la personalitat del seu divers elenc.",
        desc_trotties: "Una sèrie d'animació sobre un grup de nines màgiques que viatgen per tot el món, descobrint nous llocs i vivint emocionants aventures. Vaig contribuir a l'animació de personatges, donant vida a les seves personalitats i històries.",
        desc_beas_block: "Una sèrie d'animació preescolar produïda per Sesame Workshop, ambientada en un món ple de color on la Bea i els seus amics descobreixen la importància de l'amabilitat, l'empatia i ajudar els altres. Vaig treballar en l'animació de personatges, donant vida als protagonistes i les seves aventures quotidianes.",
        desc_friendzspace: "Una sèrie animada de comèdia i aventures que segueix tres infants que viatgen per l'espai per conèixer i fer-se amics d'infants extraterrestres. Vaig treballar en l'animació d'una gran varietat de personatges, incloent-hi humans, bípedes no humans i quadrúpedes.",

        contact_eyebrow: "Treballem junts",
        contact_title: "CONTACTE",
        contact_subtitle: "Oberta a noves oportunitats i col·laboracions. Parlem!",
        contact_email_label: "CORREU ELECTRÒNIC",
        contact_location_label: "UBICACIÓ I DISPONIBILITAT",
        contact_location: "Barcelona, Espanya",
        contact_availability: "Disponible per a oportunitats remotes arreu del món",
        contact_linkedin: "Connectem a LinkedIn",
        contact_form_title: "Envia'm un missatge",
        contact_name_label: "Nom",
        contact_form_email_label: "Correu electrònic",
        contact_subject_label: "Assumpte",
        contact_message_label: "Missatge",
        contact_submit: "ENVIA EL MISSATGE",
        ph_name: "El teu nom",
        ph_email: "tu@email.com",
        ph_subject: "De què es tracta?",
        ph_message: "Explica'm el teu projecte...",
        form_error: "Omple tots els camps amb un correu vàlid.",
        form_note: "S'obrirà la teva aplicació de correu per enviar el missatge.",

        footer_rights: "Tots els drets reservats.",
        footer_role: "ANIMADORA DE PERSONATGES 3D",
        footer_top: "Torna a dalt"
    }
};


/* =========================================================
   02. LANGUAGE SYSTEM
========================================================= */

const SUPPORTED_LANGUAGES = Object.keys(translations);
const STORAGE_KEY = "aar-portfolio-lang";
let currentLanguage = "en";

// Safe wrappers: localStorage can throw in private mode
function getSavedLanguage() {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
        return null;
    }
}

function saveLanguage(language) {
    try {
        localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
        /* ignore */
    }
}

// English by default. If the visitor already chose a language
// on this site, keep their choice.
function detectInitialLanguage() {
    const saved = getSavedLanguage();
    if (saved && SUPPORTED_LANGUAGES.includes(saved)) return saved;
    return "en";
}

function t(key) {
    return translations[currentLanguage][key] ?? translations.en[key] ?? "";
}

function changeLanguage(language) {
    if (!translations[language]) return;

    currentLanguage = language;
    document.documentElement.lang = language;
    saveLanguage(language);

    // Plain text
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const value = t(element.dataset.i18n);
        if (value) element.textContent = value;
    });

    // Text with <br> or entities
    document.querySelectorAll("[data-i18n-html]").forEach(element => {
        const value = t(element.dataset.i18nHtml);
        if (value) element.innerHTML = value;
    });

    // Placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        const value = t(element.dataset.i18nPlaceholder);
        if (value) element.placeholder = value;
    });

    // aria-labels
    document.querySelectorAll("[data-i18n-aria]").forEach(element => {
        const value = t(element.dataset.i18nAria);
        if (value) element.setAttribute("aria-label", value);
    });

    // Active button
    document.querySelectorAll(".language-option").forEach(button => {
        const isActive = button.dataset.lang === language;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    // If a project is open, refresh its content in the new language
    if (activeProjectCard && modal && modal.open) {
        renderModal(activeProjectCard);
    }
}

document.querySelectorAll(".language-option").forEach(button => {
    button.addEventListener("click", () => changeLanguage(button.dataset.lang));
});


/* =========================================================
   03. HEADER — SCROLL STATE + MOBILE MENU
========================================================= */

const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

function updateHeaderOnScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
updateHeaderOnScroll();

function setMenu(open) {
    menuToggle.setAttribute("aria-expanded", String(open));
    mainNav.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
}

menuToggle.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

// Close the menu after choosing a section
mainNav.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => setMenu(false));
});

// Close with Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
        setMenu(false);
        menuToggle.focus();
    }
});

// Reset when returning to desktop width
window.matchMedia("(min-width: 861px)").addEventListener("change", event => {
    if (event.matches) setMenu(false);
});


/* =========================================================
   04. ACTIVE SECTION IN NAVIGATION
========================================================= */

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            navLinks.forEach(link => {
                link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(section => sectionObserver.observe(section));
}


/* =========================================================
   05. SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealElements.forEach(element => revealObserver.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("is-visible"));
}


/* =========================================================
   06. PROJECT MODAL
========================================================= */

const modal = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");
const modalPoster = document.getElementById("modal-poster-img");
const modalClose = document.getElementById("modal-close");
let activeProjectCard = null;
let lastTrigger = null;

function renderModal(card) {
    const details = card.querySelector(".project-details");
    const poster = card.querySelector(".project-poster img");

    modalBody.innerHTML = details.innerHTML;

    const title = modalBody.querySelector(".pd-title");
    if (title) title.id = "modal-title";

    modalPoster.src = poster.getAttribute("src");
    modalPoster.alt = poster.getAttribute("alt");

    modal.classList.toggle("is-contain", card.classList.contains("project-card--contain"));
}

function openModal(card, trigger) {
    if (!modal || typeof modal.showModal !== "function") return;

    activeProjectCard = card;
    lastTrigger = trigger;

    renderModal(card);
    modal.showModal();
    modalBody.scrollTop = 0;
    document.body.classList.add("is-locked");
}

function closeModal() {
    if (modal.open) modal.close();
}

document.querySelectorAll(".project-card").forEach(card => {
    const trigger = card.querySelector(".project-trigger");
    trigger.addEventListener("click", () => openModal(card, trigger));
});

if (modal) {
    modalClose.addEventListener("click", closeModal);

    // Click on the dark backdrop closes the modal
    modal.addEventListener("click", event => {
        if (event.target === modal) closeModal();
    });

    // Runs for the close button, Escape key and backdrop click
    modal.addEventListener("close", () => {
        document.body.classList.remove("is-locked");
        activeProjectCard = null;
        if (lastTrigger) lastTrigger.focus();
    });
}


/* =========================================================
   07. CONTACT FORM (opens the user's email app)
========================================================= */

const contactForm = document.getElementById("contact-form");
const formError = document.getElementById("form-error");

if (contactForm) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        const fields = {
            name: document.getElementById("contact-name"),
            email: document.getElementById("contact-email"),
            subject: document.getElementById("contact-subject"),
            message: document.getElementById("contact-message")
        };

        let isValid = true;

        Object.values(fields).forEach(field => {
            const valid = field.value.trim() !== "" && field.checkValidity();
            field.classList.toggle("is-invalid", !valid);
            field.setAttribute("aria-invalid", String(!valid));
            if (!valid) isValid = false;
        });

        formError.hidden = isValid;
        if (!isValid) return;

        const body =
            `Name: ${fields.name.value.trim()}\n` +
            `Email: ${fields.email.value.trim()}\n\n` +
            `Message:\n${fields.message.value.trim()}`;

        window.location.href =
            "mailto:andreariru3d@gmail.com" +
            `?subject=${encodeURIComponent(fields.subject.value.trim())}` +
            `&body=${encodeURIComponent(body)}`;
    });

    // Clear the error state while typing
    contactForm.addEventListener("input", event => {
        if (event.target.classList.contains("is-invalid") && event.target.value.trim() !== "") {
            event.target.classList.remove("is-invalid");
            event.target.removeAttribute("aria-invalid");
        }
    });
}


/* =========================================================
   08. FOOTER YEAR + INIT
========================================================= */

const yearElement = document.getElementById("current-year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

changeLanguage(detectInitialLanguage());