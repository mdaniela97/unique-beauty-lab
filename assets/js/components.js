/* ============================================================
   UNIQUE BEAUTY LAB — components.js
   ------------------------------------------------------------
   Comportamenti condivisi da tutte le pagine:
   - link WhatsApp con messaggio precompilato
   - pulsanti flottanti e barra fissa mobile
   - menu mobile, header allo scroll, animazioni reveal
   - lightbox immagini
   - blocchi riutilizzabili (orari, recensioni, articoli)

   Caricare sempre DOPO site-data.js.
   ============================================================ */

/* ============================================================
   UTILITY
   ============================================================ */

function esc(testo) {
  const div = document.createElement("div");
  div.textContent = testo;
  return div.innerHTML;
}

// Link WhatsApp con messaggio già scritto: chi clicca trova il
// testo pronto e deve solo premere invio.
function waLink(chiave) {
  const testo = SITE_DATA.messaggiWhatsapp[chiave] || SITE_DATA.messaggiWhatsapp.generico;
  return `${SITE_DATA.link.whatsapp}?text=${encodeURIComponent(testo)}`;
}

/* ============================================================
   ICONE
   ============================================================ */

const ICONA_WHATSAPP = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2A10 10 0 0 0 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.2-.8-.7-1.3-1.5-1.4-1.8-.2-.3 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3z"/></svg>';

const ICONA_INSTAGRAM = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/></svg>';

const ICONA_TELEFONO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>';

/* ============================================================
   LINK E TESTI DINAMICI
   ------------------------------------------------------------
   Negli HTML i pulsanti hanno già un href funzionante (il sito
   resta usabile anche senza JavaScript). Qui li arricchiamo con
   il messaggio precompilato e con i valori del config.
   ============================================================ */
function initLinks() {
  document.querySelectorAll("[data-wa]").forEach(el => { el.href = waLink(el.dataset.wa || "generico"); });
  document.querySelectorAll("[data-tw]").forEach(el => { el.href = SITE_DATA.link.treatwell; });
  document.querySelectorAll("[data-tel]").forEach(el => { el.href = SITE_DATA.link.telefono; });
  document.querySelectorAll("[data-ig]").forEach(el => { el.href = SITE_DATA.link.instagram; });
  document.querySelectorAll("[data-mappa]").forEach(el => { el.href = SITE_DATA.link.mappa; });

  document.querySelectorAll("[data-testo-tel]").forEach(el => { el.textContent = SITE_DATA.azienda.telefono; });
  document.querySelectorAll("[data-testo-indirizzo]").forEach(el => { el.textContent = SITE_DATA.azienda.indirizzoCompleto; });
  document.querySelectorAll("[data-testo-piva]").forEach(el => { el.textContent = "P.IVA " + SITE_DATA.azienda.partitaIva; });
  document.querySelectorAll("[data-anno]").forEach(el => { el.textContent = new Date().getFullYear(); });
}

/* ============================================================
   FLOTTANTI E BARRA MOBILE
   Iniettati via JS per non ripetere lo stesso markup in 6 pagine.
   ============================================================ */
function renderFlottanti() {
  if (document.querySelector(".flottanti")) return;

  const box = document.createElement("div");
  box.className = "flottanti";
  box.innerHTML = `
    <a class="flottante flottante-wa" href="${waLink("generico")}"
       target="_blank" rel="noopener" aria-label="Scrivici su WhatsApp">
      ${ICONA_WHATSAPP}<span class="flottante-tip" aria-hidden="true">Scrivici ora</span>
    </a>
    <a class="flottante flottante-ig" href="${SITE_DATA.link.instagram}"
       target="_blank" rel="noopener" aria-label="Seguici su Instagram">
      ${ICONA_INSTAGRAM}<span class="flottante-tip" aria-hidden="true">Seguici</span>
    </a>`;
  document.body.appendChild(box);
}

function renderBarraMobile() {
  if (document.querySelector(".barra-mobile")) return;

  const barra = document.createElement("nav");
  barra.className = "barra-mobile";
  barra.setAttribute("aria-label", "Azioni rapide");
  barra.innerHTML = `
    <a class="barra-bottone barra-chiama" href="${SITE_DATA.link.telefono}">
      ${ICONA_TELEFONO}<span>Chiama</span>
    </a>
    <a class="barra-bottone barra-wa" href="${waLink("appuntamento")}" target="_blank" rel="noopener">
      ${ICONA_WHATSAPP}<span>Prenota su WhatsApp</span>
    </a>`;
  document.body.appendChild(barra);
}

/* ============================================================
   MENU MOBILE
   ============================================================ */
function initMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-principale");
  if (!toggle || !nav) return;

  const chiudi = () => {
    document.body.classList.remove("menu-aperto");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Apri menu");
  };

  toggle.addEventListener("click", () => {
    const aperto = document.body.classList.toggle("menu-aperto");
    toggle.setAttribute("aria-expanded", aperto ? "true" : "false");
    toggle.setAttribute("aria-label", aperto ? "Chiudi menu" : "Apri menu");
  });

  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", chiudi));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && document.body.classList.contains("menu-aperto")) chiudi();
  });
}

/* ============================================================
   HEADER ALLO SCROLL
   ============================================================ */
function initHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) return;
  const aggiorna = () => header.classList.toggle("scrollato", window.scrollY > 8);
  window.addEventListener("scroll", aggiorna, { passive: true });
  aggiorna();
}

/* ============================================================
   ANIMAZIONI REVEAL
   Richiamabile più volte: prende in carico solo gli elementi non
   ancora mostrati (alcune sezioni sono generate dopo l'avvio).
   ============================================================ */
function initReveal() {
  const elementi = document.querySelectorAll(".reveal:not(.visibile)");
  if (!elementi.length) return;

  const motionRidotto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || motionRidotto) {
    elementi.forEach(el => el.classList.add("visibile"));
    return;
  }

  const osservatore = new IntersectionObserver(voci => {
    voci.forEach(voce => {
      if (voce.isIntersecting) {
        voce.target.classList.add("visibile");
        osservatore.unobserve(voce.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -60px 0px" });

  elementi.forEach(el => osservatore.observe(el));
  reteSicurezzaReveal();
}

/* Rete di sicurezza: il contenuto non deve MAI restare invisibile.
   Se dopo 2,5 secondi nessun elemento è comparso, l'osservatore non
   sta funzionando: si rinuncia all'animazione e si mostra tutto. */
let reteSicurezzaAvviata = false;
function reteSicurezzaReveal() {
  if (reteSicurezzaAvviata) return;
  reteSicurezzaAvviata = true;

  setTimeout(() => {
    if (!document.querySelector(".reveal.visibile")) {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("visibile"));
    }
  }, 2500);
}

/* ============================================================
   LIGHTBOX
   ------------------------------------------------------------
   Ogni immagine apribile è avvolta in un <button class="media-cornice">
   con data-full = percorso del file più grande SENZA estensione.
   Riutilizziamo il formato che il browser ha già scelto (avif/webp/jpg),
   così non scarichiamo un formato che non supporta.
   ============================================================ */
function initLightbox() {
  const cornici = document.querySelectorAll(".media-cornice[data-full]");
  if (!cornici.length) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Immagine ingrandita");
  overlay.innerHTML = `
    <button class="lightbox-chiudi" type="button" aria-label="Chiudi immagine">&times;</button>
    <figure class="lightbox-figura">
      <picture>
        <source type="image/avif"><source type="image/webp"><img alt="">
      </picture>
      <figcaption class="lightbox-didascalia"></figcaption>
    </figure>`;
  document.body.appendChild(overlay);

  const fonteAvif   = overlay.querySelector('source[type="image/avif"]');
  const fonteWebp   = overlay.querySelector('source[type="image/webp"]');
  const immagine    = overlay.querySelector("img");
  const didascalia  = overlay.querySelector(".lightbox-didascalia");
  const bottoneEsci = overlay.querySelector(".lightbox-chiudi");
  let ultimoAttivo  = null;

  function apri(cornice) {
    const imgOrigine = cornice.querySelector("img");
    const base = cornice.dataset.full;

    // Lasciamo scegliere al browser: prende l'AVIF se lo supporta,
    // altrimenti WebP, altrimenti il JPEG.
    fonteAvif.srcset = `${base}.avif`;
    fonteWebp.srcset = `${base}.webp`;
    immagine.src     = `${base}.jpg`;
    immagine.alt = imgOrigine.alt || "";
    const testo = cornice.dataset.didascalia || "";
    didascalia.textContent = testo;
    didascalia.hidden = !testo;

    ultimoAttivo = document.activeElement;
    overlay.classList.add("aperta");
    document.body.style.overflow = "hidden";
    bottoneEsci.focus();
  }

  function chiudi() {
    overlay.classList.remove("aperta");
    document.body.style.overflow = "";
    if (ultimoAttivo) ultimoAttivo.focus();
  }

  cornici.forEach(c => c.addEventListener("click", () => apri(c)));
  bottoneEsci.addEventListener("click", chiudi);
  overlay.addEventListener("click", e => { if (e.target === overlay) chiudi(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && overlay.classList.contains("aperta")) chiudi();
    // il fuoco resta dentro la finestra: unico elemento focalizzabile
    if (e.key === "Tab" && overlay.classList.contains("aperta")) {
      e.preventDefault();
      bottoneEsci.focus();
    }
  });
}

/* ============================================================
   BLOCCHI RIUTILIZZABILI
   ============================================================ */

// Tabella orari: evidenzia il giorno corrente
function renderOrari(idContenitore = "tabella-orari") {
  const tabella = document.getElementById(idContenitore);
  if (!tabella) return;

  const giornoJs = new Date().getDay();                  // 0 = domenica
  const indiceOggi = giornoJs === 0 ? 6 : giornoJs - 1;  // il nostro array parte da lunedì

  tabella.innerHTML = SITE_DATA.orari.map((riga, i) => {
    const classi = [
      i === indiceOggi ? "orario-oggi" : "",
      riga.ore === "Chiuso" ? "orario-chiuso" : ""
    ].join(" ").trim();
    return `<tr class="${classi}"><td>${esc(riga.giorno)}</td><td>${esc(riga.ore)}</td></tr>`;
  }).join("");
}

// Recensioni in evidenza
function renderRecensioni(idContenitore = "griglia-recensioni") {
  const box = document.getElementById(idContenitore);
  if (!box) return;

  box.innerHTML = SITE_DATA.recensioni.map((r, i) => `
    <blockquote class="card-recensione reveal" style="transition-delay:${i * 90}ms">
      <div class="recensione-stelle" aria-label="Valutazione 5 su 5">★★★★★</div>
      <p class="recensione-testo">“${esc(r.testo)}”</p>
      <footer class="recensione-autore">${esc(r.autore)} <span>· ${esc(r.fonte)}</span></footer>
    </blockquote>`).join("");
}

// Card articoli blog. Quanti mostrarne si imposta con data-limite.
function renderArticoli(idContenitore = "griglia-articoli") {
  const box = document.getElementById(idContenitore);
  if (!box) return;

  const limite = parseInt(box.dataset.limite, 10) || SITE_DATA.articoli.length;

  box.innerHTML = SITE_DATA.articoli.slice(0, limite).map((a, i) => `
    <article class="card-articolo reveal" style="transition-delay:${i * 90}ms">
      <a class="articolo-media" href="${a.slug}" tabindex="-1" aria-hidden="true">
        <picture>
          <source type="image/avif" srcset="${a.immagine}-640.avif 640w, ${a.immagine}-1000.avif 1000w" sizes="(min-width:768px) 360px, 100vw">
          <source type="image/webp" srcset="${a.immagine}-640.webp 640w, ${a.immagine}-1000.webp 1000w" sizes="(min-width:768px) 360px, 100vw">
          <img src="${a.immagine}-1000.jpg" alt="" loading="lazy" decoding="async"
               width="${a.larghezza}" height="${a.altezza}">
        </picture>
      </a>
      <div class="articolo-corpo">
        <span class="articolo-categoria">${esc(a.categoria)}</span>
        <h3 class="articolo-titolo"><a href="${a.slug}">${esc(a.titolo)}</a></h3>
        <p class="articolo-estratto">${esc(a.estratto)}</p>
        <span class="link-freccia" aria-hidden="true">Leggi l'articolo</span>
      </div>
    </article>`).join("");
}

/* ============================================================
   CONSENSO COOKIE + GOOGLE MAPS (GDPR)
   ------------------------------------------------------------
   Unico terzo con cookie è la mappa Google (i font sono self-hosted).
   La mappa NON viene caricata finché l'utente non acconsente.
   La scelta è salvata in localStorage (nessun cookie di profilazione).
   ============================================================ */
const CONSENSO_KEY = "ubl_consenso_cookie";

function statoConsenso() {
  try { return localStorage.getItem(CONSENSO_KEY); } catch (e) { return null; }
}
function salvaConsenso(valore) {
  try { localStorage.setItem(CONSENSO_KEY, valore); } catch (e) {}
}

// Carica davvero l'iframe della mappa (solo dopo consenso)
function caricaMappa() {
  document.querySelectorAll("[data-mappa-embed]").forEach(box => {
    if (box.dataset.caricata) return;
    box.innerHTML = `<iframe title="Mappa: Unique Beauty Lab, Corso Sebastopoli 267, Torino"
       src="${box.dataset.mappaEmbed}" loading="lazy"
       referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
    box.dataset.caricata = "1";
  });
}

// Segnaposto mostrato finché la mappa è disattivata
function placeholderMappa() {
  document.querySelectorAll("[data-mappa-embed]").forEach(box => {
    if (box.dataset.caricata) return;
    box.innerHTML = `
      <div class="mappa-placeholder">
        <p>La mappa di Google è disattivata finché non accetti i cookie di terze parti.</p>
        <div class="gruppo-cta gruppo-cta-centro">
          <button class="bottone bottone-contorno" type="button" data-attiva-mappa>Attiva la mappa</button>
          <a class="bottone bottone-wa" href="${SITE_DATA.link.mappa}" target="_blank" rel="noopener">Apri su Google Maps</a>
        </div>
      </div>`;
    const attiva = box.querySelector("[data-attiva-mappa]");
    if (attiva) attiva.addEventListener("click", () => {
      salvaConsenso("accetta"); nascondiBanner(); caricaMappa();
    });
  });
}

function nascondiBanner() {
  const b = document.querySelector(".cookie-banner");
  if (b) { b.classList.remove("visibile"); setTimeout(() => b.remove(), 400); }
}

function renderBannerCookie() {
  // scelta già fatta: applica e non mostrare il banner
  if (statoConsenso() === "accetta") { caricaMappa(); return; }
  if (statoConsenso() === "rifiuta") { placeholderMappa(); return; }

  placeholderMappa(); // in attesa di scelta: mappa off

  const b = document.createElement("div");
  b.className = "cookie-banner";
  b.setAttribute("role", "dialog");
  b.setAttribute("aria-label", "Informativa cookie");
  b.innerHTML = `
    <div class="cookie-interno">
      <p class="cookie-testo">Usiamo solo cookie tecnici necessari. Con il tuo consenso attiviamo la
        mappa di Google (che pone cookie propri). Nessuna profilazione. Dettagli nella
        <a href="/cookie/">Cookie Policy</a>.</p>
      <div class="cookie-azioni">
        <button class="bottone bottone-contorno" type="button" data-rifiuta>Rifiuta</button>
        <button class="bottone bottone-wa" type="button" data-accetta>Accetta</button>
      </div>
    </div>`;
  document.body.appendChild(b);
  // setTimeout invece di requestAnimationFrame: rAF non scatta se la
  // scheda è in background, e il banner deve comparire comunque.
  setTimeout(() => b.classList.add("visibile"), 30);

  b.querySelector("[data-accetta]").addEventListener("click", () => {
    salvaConsenso("accetta"); nascondiBanner(); caricaMappa();
  });
  b.querySelector("[data-rifiuta]").addEventListener("click", () => {
    salvaConsenso("rifiuta"); nascondiBanner();
  });
}

// Link "Gestisci cookie" (footer): azzera la scelta e riapre il banner
function initGestisciCookie() {
  document.querySelectorAll("[data-gestisci-cookie]").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      try { localStorage.removeItem(CONSENSO_KEY); } catch (_) {}
      nascondiBanner();
      renderBannerCookie();
    });
  });
}

/* ============================================================
   AVVIO
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initLinks();
  renderFlottanti();
  renderBarraMobile();
  initMenu();
  initHeaderScroll();
  renderOrari();
  renderRecensioni();
  renderArticoli();
  initLightbox();
  initReveal();
  renderBannerCookie();
  initGestisciCookie();
});
