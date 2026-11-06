/* =========================================================
   Portfolio chatbot widget — Andrea Ariño Ruiz
   Self-contained: builds its own DOM, follows the site language (ES/EN/CA).

   Activation: the <script> tag carries the Worker URL:
   <script src="assets/chatbot/chatbot.js" data-endpoint="https://...workers.dev/api/chat" defer></script>
   With no endpoint, the widget does not appear at all.
========================================================= */

(() => {
    "use strict";

    const script = document.currentScript;
    const ENDPOINT = ((script && script.dataset.endpoint) || "").trim();
    if (!ENDPOINT) return;

    const CONTACT_EMAIL = "andreariru3d@gmail.com";
    const STORAGE_KEY = "aar-chat-history";
    const MAX_CONTEXT = 8;        // messages sent to the backend
    const MAX_INPUT = 500;
    const REQUEST_TIMEOUT_MS = 35000;

    /* ---------------------------------------------------------
       Texts
    --------------------------------------------------------- */
    const TEXTS = {
        en: {
            launcher: "Ask about Andrea",
            title: "Ask about Andrea",
            status: "AI assistant",
            greeting: "Hi! I'm Andrea's AI assistant. Ask me about her experience, projects, education, software or availability.",
            placeholder: "Type your question…",
            send: "Send",
            close: "Close chat",
            reset: "New chat",
            thinking: "Typing",
            disclaimer: "AI-generated answers; your messages are processed by Google Gemini. Confirm anything important with Andrea.",
            error: "Sorry, I couldn't answer right now. You can write to Andrea directly:",
            busy: "I'm getting a lot of questions at the moment. Please try again in a minute, or write to Andrea:",
            chips: [
                "Where did she study?",
                "What was her latest project?",
                "Is she available?",
                "Has she worked in Layout?",
                "Any modelling experience?",
                "Which software does she use?"
            ]
        },
        es: {
            launcher: "Pregunta sobre Andrea",
            title: "Pregunta sobre Andrea",
            status: "Asistente de IA",
            greeting: "¡Hola! Soy el asistente de IA de Andrea. Pregúntame por su experiencia, proyectos, formación, software o disponibilidad.",
            placeholder: "Escribe tu pregunta…",
            send: "Enviar",
            close: "Cerrar chat",
            reset: "Nueva conversación",
            thinking: "Escribiendo",
            disclaimer: "Respuestas generadas por IA; tus mensajes los procesa Google Gemini. Confirma con Andrea lo importante.",
            error: "Lo siento, no he podido responder ahora mismo. Puedes escribir a Andrea directamente:",
            busy: "Estoy recibiendo muchas preguntas ahora mismo. Inténtalo de nuevo en un minuto o escribe a Andrea:",
            chips: [
                "¿Dónde ha estudiado?",
                "¿Cuál fue su último proyecto?",
                "¿Está disponible?",
                "¿Ha trabajado en Layout?",
                "¿Tiene experiencia en modelado?",
                "¿Qué software utiliza?"
            ]
        },
        ca: {
            launcher: "Pregunta sobre l'Andrea",
            title: "Pregunta sobre l'Andrea",
            status: "Assistent d'IA",
            greeting: "Hola! Sóc l'assistent d'IA de l'Andrea. Pregunta'm per la seva experiència, projectes, formació, programari o disponibilitat.",
            placeholder: "Escriu la teva pregunta…",
            send: "Envia",
            close: "Tanca el xat",
            reset: "Nova conversa",
            thinking: "Escrivint",
            disclaimer: "Respostes generades per IA; els teus missatges els processa Google Gemini. Confirma amb l'Andrea el que sigui important.",
            error: "Ho sento, ara no he pogut respondre. Pots escriure a l'Andrea directament:",
            busy: "Ara estic rebent moltes preguntes. Torna-ho a provar d'aquí a un minut o escriu a l'Andrea:",
            chips: [
                "On ha estudiat?",
                "Quin va ser el seu últim projecte?",
                "Està disponible?",
                "Ha treballat en Layout?",
                "Té experiència en modelatge?",
                "Quin programari utilitza?"
            ]
        }
    };

    const getLang = () => {
        const lang = (document.documentElement.lang || "en").slice(0, 2).toLowerCase();
        return TEXTS[lang] ? lang : "en";
    };
    const tx = () => TEXTS[getLang()];

    /* ---------------------------------------------------------
       State (kept in sessionStorage so a refresh doesn't lose the chat)
    --------------------------------------------------------- */
    let messages = [];
    let pending = false;

    const loadHistory = () => {
        try {
            const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
            if (Array.isArray(saved)) {
                messages = saved
                    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
                    .slice(-40);
            }
        } catch (e) { messages = []; }
    };
    const saveHistory = () => {
        try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40))); } catch (e) { /* ignore */ }
    };

    /* ---------------------------------------------------------
       DOM
    --------------------------------------------------------- */
    const el = (tag, className, attrs) => {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (attrs) Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
        return node;
    };

    const ICON_CHAT =
        '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-4.4 3.3A.8.8 0 0 1 3.3 20.7V18H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/></svg>';
    const ICON_SEND =
        '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M3.4 20.4 21 12 3.4 3.6 3.3 10l12 2-12 2z"/></svg>';

    const root = el("div", "aar-chat");

    const launcher = el("button", "aar-chat__launcher", { type: "button", "aria-expanded": "false", "aria-controls": "aar-chat-panel" });
    const launcherIcon = el("span", "aar-chat__launcher-icon");
    launcherIcon.innerHTML = ICON_CHAT;
    const launcherLabel = el("span", "aar-chat__launcher-label");
    launcher.append(launcherIcon, launcherLabel);

    const panel = el("section", "aar-chat__panel", { id: "aar-chat-panel", role: "dialog", "aria-modal": "false", hidden: "" });

    // Header
    const header = el("header", "aar-chat__header");
    const avatar = el("span", "aar-chat__avatar", { "aria-hidden": "true" });
    avatar.textContent = "A";
    const headText = el("div", "aar-chat__head-text");
    const title = el("p", "aar-chat__title");
    const status = el("p", "aar-chat__status");
    const statusDot = el("span", "aar-chat__dot", { "aria-hidden": "true" });
    const statusText = el("span");
    status.append(statusDot, statusText);
    headText.append(title, status);
    const resetBtn = el("button", "aar-chat__icon-btn aar-chat__reset", { type: "button" });
    resetBtn.innerHTML =
        '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 5a7 7 0 1 1-6.7 9h2.1A5 5 0 1 0 12 7v3L7 6l5-4z"/></svg>';
    const closeBtn = el("button", "aar-chat__icon-btn aar-chat__close", { type: "button" });
    closeBtn.innerHTML =
        '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z"/></svg>';
    header.append(avatar, headText, resetBtn, closeBtn);

    // Messages
    const log = el("div", "aar-chat__log", { role: "log", "aria-live": "polite", tabindex: "0" });

    // Suggestions
    const chips = el("div", "aar-chat__chips");

    // Composer
    const form = el("form", "aar-chat__form", { autocomplete: "off" });
    const input = el("input", "aar-chat__input", { type: "text", maxlength: String(MAX_INPUT), enterkeyhint: "send" });
    const sendBtn = el("button", "aar-chat__send", { type: "submit" });
    sendBtn.innerHTML = ICON_SEND;
    form.append(input, sendBtn);

    const disclaimer = el("p", "aar-chat__disclaimer");

    panel.append(header, log, chips, form, disclaimer);
    root.append(panel, launcher);

    /* ---------------------------------------------------------
       Rendering of messages (never uses innerHTML for model text)
    --------------------------------------------------------- */
    const TOKEN = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g;

    const renderInline = (text, parent) => {
        text.split(TOKEN).forEach((part) => {
            if (!part) return;
            if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
                const strong = el("strong");
                strong.textContent = part.slice(2, -2);
                parent.appendChild(strong);
            } else if (/^https?:\/\//.test(part)) {
                const clean = part.replace(/[.,;:!?]+$/, "");
                const trailing = part.slice(clean.length);
                const a = el("a", null, { href: clean, target: "_blank", rel: "noopener noreferrer" });
                a.textContent = clean.replace(/^https?:\/\/(www\.)?/, "");
                parent.appendChild(a);
                if (trailing) parent.appendChild(document.createTextNode(trailing));
            } else if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(part)) {
                const a = el("a", null, { href: "mailto:" + part });
                a.textContent = part;
                parent.appendChild(a);
            } else {
                parent.appendChild(document.createTextNode(part));
            }
        });
    };

    const renderRich = (text, container) => {
        let list = null;
        text.split(/\r?\n/).forEach((line) => {
            const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
            if (bullet) {
                if (!list) { list = el("ul"); container.appendChild(list); }
                const li = el("li");
                renderInline(bullet[1], li);
                list.appendChild(li);
                return;
            }
            list = null;
            if (!line.trim()) return;
            const p = el("p");
            renderInline(line.trim(), p);
            container.appendChild(p);
        });
    };

    const scrollToEnd = () => { log.scrollTop = log.scrollHeight; };

    const addBubble = (role, content, opts = {}) => {
        const row = el("div", "aar-chat__msg aar-chat__msg--" + (role === "user" ? "user" : "bot"));
        const bubble = el("div", "aar-chat__bubble");
        if (role === "user") {
            bubble.textContent = content;
        } else {
            renderRich(content, bubble);
            if (opts.mailLink) {
                const p = el("p");
                const a = el("a", null, { href: "mailto:" + CONTACT_EMAIL });
                a.textContent = CONTACT_EMAIL;
                p.appendChild(a);
                bubble.appendChild(p);
            }
        }
        row.appendChild(bubble);
        log.appendChild(row);
        scrollToEnd();
        return row;
    };

    const showTyping = () => {
        const row = el("div", "aar-chat__msg aar-chat__msg--bot aar-chat__typing");
        const bubble = el("div", "aar-chat__bubble");
        const sr = el("span", "aar-chat__sr");
        sr.textContent = tx().thinking + "…";
        bubble.append(sr, el("i"), el("i"), el("i"));
        row.appendChild(bubble);
        log.appendChild(row);
        scrollToEnd();
        return row;
    };

    const renderAll = () => {
        log.textContent = "";
        addBubble("assistant", tx().greeting);
        messages.forEach((m) => addBubble(m.role, m.content));
        chips.hidden = messages.length > 0;
    };

    const renderChips = () => {
        chips.textContent = "";
        tx().chips.forEach((label) => {
            const b = el("button", "aar-chat__chip", { type: "button" });
            b.textContent = label;
            b.addEventListener("click", () => send(label));
            chips.appendChild(b);
        });
    };

    const applyTexts = () => {
        const t = tx();
        launcherLabel.textContent = t.launcher;
        launcher.setAttribute("aria-label", t.launcher);
        panel.setAttribute("aria-label", t.title);
        title.textContent = t.title;
        statusText.textContent = t.status;
        input.placeholder = t.placeholder;
        input.setAttribute("aria-label", t.placeholder);
        sendBtn.setAttribute("aria-label", t.send);
        closeBtn.setAttribute("aria-label", t.close);
        resetBtn.setAttribute("aria-label", t.reset);
        resetBtn.title = t.reset;
        disclaimer.textContent = t.disclaimer;
        renderChips();
        renderAll();
    };

    /* ---------------------------------------------------------
       Sending
    --------------------------------------------------------- */
    const setPending = (value) => {
        pending = value;
        sendBtn.disabled = value;
        input.disabled = value;
        panel.classList.toggle("is-pending", value);
    };

    async function send(text) {
        const question = (text || "").trim().slice(0, MAX_INPUT);
        if (!question || pending) return;

        chips.hidden = true;
        input.value = "";
        messages.push({ role: "user", content: question });
        saveHistory();
        addBubble("user", question);

        setPending(true);
        const typing = showTyping();

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

        try {
            const res = await fetch(ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                signal: controller.signal,
                body: JSON.stringify({ messages: messages.slice(-MAX_CONTEXT), lang: getLang() })
            });

            let data = {};
            try { data = await res.json(); } catch (e) { /* not JSON */ }

            typing.remove();

            if (res.ok && data.reply) {
                messages.push({ role: "assistant", content: data.reply });
                saveHistory();
                addBubble("assistant", data.reply);
            } else {
                const busy = res.status === 429 || data.error === "busy" || data.error === "rate_limited";
                // The failed question stays out of the context sent next time.
                messages.pop();
                saveHistory();
                addBubble("assistant", busy ? tx().busy : tx().error, { mailLink: true });
            }
        } catch (err) {
            typing.remove();
            messages.pop();
            saveHistory();
            addBubble("assistant", tx().error, { mailLink: true });
        } finally {
            clearTimeout(timer);
            setPending(false);
            if (isOpen()) input.focus();
        }
    }

    /* ---------------------------------------------------------
       Open / close
    --------------------------------------------------------- */
    const isOpen = () => !panel.hidden;

    const open = () => {
        panel.hidden = false;
        root.classList.add("is-open");
        launcher.setAttribute("aria-expanded", "true");
        requestAnimationFrame(() => { scrollToEnd(); input.focus({ preventScroll: true }); });
    };
    const close = (returnFocus = true) => {
        panel.hidden = true;
        root.classList.remove("is-open");
        launcher.setAttribute("aria-expanded", "false");
        if (returnFocus) launcher.focus();
    };

    launcher.addEventListener("click", () => (isOpen() ? close() : open()));
    closeBtn.addEventListener("click", () => close());
    resetBtn.addEventListener("click", () => {
        if (pending) return;
        messages = [];
        saveHistory();
        renderAll();
        input.focus();
    });
    panel.addEventListener("keydown", (e) => {
        if (e.key === "Escape") { e.stopPropagation(); close(); }
    });
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        send(input.value);
    });

    /* ---------------------------------------------------------
       Init + follow the site language
    --------------------------------------------------------- */
    loadHistory();
    applyTexts();
    document.body.appendChild(root);

    new MutationObserver(() => applyTexts()).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["lang"]
    });
})();
