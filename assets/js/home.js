/* ============================================================
   UNIQUE BEAUTY LAB — home.js
   Genera la sezione Servizi della home leggendo da SITE_DATA.
   Caricare dopo site-data.js e components.js.
   ============================================================ */

/* Icone categorie: SVG a linee, stile geometrico coerente col sito */
const ICONE_CATEGORIE = {
  sguardo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  laser:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2 5 13h5l-1 9 8-11h-5l1-9z"/></svg>',
  viso:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z"/><path d="M18.5 15.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1z"/></svg>',
  unghie:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 3h6v9a3 3 0 0 1-6 0V3z"/><path d="M12 15v6M8 21h8"/></svg>',
  corpo:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 4c1.5 2.5 4 3.5 4 7a4 4 0 0 1-8 0c0-3.5 2.5-4.5 4-7z"/><path d="M4 19c2.5 1.5 5 2 8 2s5.5-.5 8-2"/></svg>',
  cera:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3c3 4 5 6.5 5 9.5a5 5 0 0 1-10 0C7 9.5 9 7 12 3z"/><path d="M12 17v4"/></svg>'
};

function renderServizi() {
  const griglia = document.getElementById("griglia-servizi");
  if (!griglia) return;

  // Copertina della card: <picture> responsivo (avif/webp/jpg) costruito
  // dalle larghezze disponibili in cat.imgW. Tutte le copertine hanno lo
  // stesso rapporto via CSS (.card-cover) + object-fit: cover.
  const cover = (cat) => {
    if (!cat.immagine) return "";
    const sizes = "(min-width: 1024px) 360px, (min-width: 768px) 44vw, 92vw";
    const srcset = (ext) => cat.imgW.map(w => `${cat.immagine}-${w}.${ext} ${w}w`).join(", ");
    const wMax = cat.imgW[cat.imgW.length - 1];
    return `
        <div class="card-cover" aria-hidden="true">
          <picture>
            <source type="image/avif" srcset="${srcset("avif")}" sizes="${sizes}">
            <source type="image/webp" srcset="${srcset("webp")}" sizes="${sizes}">
            <img src="${cat.immagine}-${wMax}.jpg" srcset="${srcset("jpg")}" sizes="${sizes}"
                 alt="${esc(cat.imgAlt || "")}" width="1000" height="600" loading="lazy" decoding="async">
          </picture>
        </div>`;
  };

  griglia.innerHTML = SITE_DATA.categorie.map((cat, i) => {

    // Righe del listino
    const righe = cat.trattamenti.map(t => {
      // Sotto-intestazione di gruppo (es. Viso / Corpo / Uomo nel laser)
      if (t.gruppo) return `<li class="tratt-gruppo">${esc(t.gruppo)}</li>`;
      const durata      = t.durata ? `<span class="tratt-durata">${esc(t.durata)}</span>` : "";
      const badge       = t.badge ? `<span class="tratt-badge">${esc(t.badge)}</span>` : "";
      const prezzoPieno = t.prezzoPieno ? `<s class="prezzo-pieno">${esc(t.prezzoPieno)}</s> ` : "";
      return `
        <li class="tratt-riga${t.evidenzia ? " tratt-evidenza" : ""}">
          <span class="tratt-nome">${esc(t.nome)}${badge}${durata}</span>
          <span class="tratt-filo" aria-hidden="true"></span>
          <span class="tratt-prezzo">${prezzoPieno}${esc(t.prezzo)}</span>
        </li>`;
    }).join("");

    // CTA in fondo a OGNI categoria: WhatsApp + risultati Prima e Dopo
    const azioni = `
      <div class="listino-azioni">
        <a class="bottone bottone-wa" href="${waLink(cat.messaggio)}" target="_blank" rel="noopener">
          Prenota su WhatsApp
        </a>
        <a class="bottone bottone-contorno" href="${cat.risultati}">Guarda i risultati</a>
      </div>`;

    // Il pulsante sta DENTRO il titolo: è il modello accessibile
    // standard per gli accordion e mantiene l'HTML valido
    // (un <h3> non può stare dentro un <button>).
    return `
      <article class="card-servizio reveal" style="transition-delay:${i * 70}ms">
        ${cover(cat)}
        <h3 class="card-heading">
          <button class="card-testa" aria-expanded="false" aria-controls="listino-${cat.id}">
            <span class="card-icona" aria-hidden="true">${ICONE_CATEGORIE[cat.icona] || ""}</span>
            <span class="card-titolo">${esc(cat.nome)}</span>
            <span class="card-piu" aria-hidden="true"></span>
            <span class="card-sottotitolo">${esc(cat.sottotitolo)}</span>
          </button>
        </h3>
        <div class="card-panel" id="listino-${cat.id}">
          <div class="panel-interno">
            <ul class="listino">${righe}</ul>
            ${azioni}
          </div>
        </div>
      </article>`;
  }).join("");

  // Apertura/chiusura accordion
  griglia.querySelectorAll(".card-testa").forEach(bottone => {
    bottone.addEventListener("click", () => {
      const card = bottone.closest(".card-servizio");
      const aperta = card.classList.toggle("aperta");
      bottone.setAttribute("aria-expanded", aperta ? "true" : "false");
    });
  });

  // Anche la copertina apre la card: inoltra il clic al pulsante-titolo.
  griglia.querySelectorAll(".card-cover").forEach(cover => {
    cover.addEventListener("click", () => {
      cover.closest(".card-servizio").querySelector(".card-testa").click();
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  // Attende il loader CMS (con fallback: se fetch fallisce, resolve comunque).
  if (window.SITE_DATA_READY) { try { await window.SITE_DATA_READY; } catch (_) {} }

  renderServizi();
  // Le card appena create devono essere prese in carico dall'osservatore
  // delle animazioni, che è già partito dentro components.js.
  initReveal();
});
