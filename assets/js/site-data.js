/* ============================================================
   UNIQUE BEAUTY LAB — site-data.js
   ------------------------------------------------------------
   CONFIG UNICO DEL SITO.
   Qui dentro si modificano: contatti, link, listino prezzi,
   orari, recensioni, gallerie e articoli del blog.
   Le pagine leggono da qui: non serve toccare l'HTML.

   NOTA: i link "di sicurezza" presenti anche negli HTML statici
   (header/footer) sono scritti in chiaro per funzionare pure con
   JavaScript disattivato. Se cambia un contatto, aggiornalo qui
   E fai un find & replace nei file .html (vedi README-MODIFICHE.md).
   ============================================================ */

const SITE_DATA = {

  /* ---------- AZIENDA ---------- */
  azienda: {
    nome: "Unique Beauty Lab",
    tagline: "Bellezza su misura, nel cuore di Torino.",
    indirizzo: "Corso Sebastopoli 267",
    cap: "10136",
    citta: "Torino",
    provincia: "TO",
    indirizzoCompleto: "Corso Sebastopoli 267, 10136 Torino (TO)",
    telefono: "379 163 6447",
    partitaIva: "12610800018",
    urlSito: "https://frolicking-pony-29cc7a.netlify.app"
  },

  /* ---------- LINK / CONTATTI ----------
     Per cambiare il link Treatwell ufficiale basta modificare
     la riga "treatwell" qui sotto: tutti i pulsanti generati
     dal sito si aggiornano da soli.                            */
  link: {
    telefono:  "tel:+393791636447",
    whatsapp:  "https://wa.me/393791636447",
    instagram: "https://www.instagram.com/unique_beauty.lab/",
    treatwell: "https://www.treatwell.it/salone/unique-beauty-lab/",
    mappa:     "https://www.google.com/maps/search/?api=1&query=Corso+Sebastopoli+267+10136+Torino"
  },

  /* ---------- MESSAGGI WHATSAPP PRECOMPILATI ----------
     Ogni CTA apre WhatsApp con un testo già scritto: alza di
     molto il tasso di risposta perché l'utente non deve pensare
     a cosa scrivere.                                           */
  messaggiWhatsapp: {
    generico:    "Ciao Unique Beauty Lab! Vorrei informazioni sui vostri trattamenti.",
    appuntamento:"Ciao Unique Beauty Lab! Vorrei prenotare un appuntamento.",
    consulenza:  "Ciao! Vorrei prenotare la consulenza laser gratuita.",
    sguardo:     "Ciao! Vorrei informazioni sui trattamenti per ciglia e sopracciglia.",
    laser:       "Ciao! Vorrei informazioni sull'epilazione laser.",
    viso:        "Ciao! Vorrei informazioni sui trattamenti viso.",
    unghie:      "Ciao! Vorrei prenotare un appuntamento per le unghie.",
    corpo:       "Ciao! Vorrei informazioni sui trattamenti corpo e massaggi.",
    cera:        "Ciao! Vorrei informazioni sull'epilazione a cera.",
    risultati:   "Ciao! Ho visto i risultati sul vostro sito e vorrei informazioni."
  },

  /* ---------- RATING ---------- */
  rating: {
    google:    { voto: "5,0", recensioni: 70 },
    treatwell: { voto: "4,9", recensioni: 405 }
  },

  /* ---------- ORARI (lunedì → domenica) ---------- */
  orari: [
    { giorno: "Lunedì",    ore: "Chiuso" },
    { giorno: "Martedì",   ore: "09:00 – 19:00" },
    { giorno: "Mercoledì", ore: "10:00 – 19:00" },
    { giorno: "Giovedì",   ore: "09:00 – 19:00" },
    { giorno: "Venerdì",   ore: "10:00 – 19:00" },
    { giorno: "Sabato",    ore: "09:00 – 17:30" },
    { giorno: "Domenica",  ore: "Chiuso" }
  ],

  /* ---------- RECENSIONI ---------- */
  recensioni: [
    {
      autore: "Alessia P.", fonte: "Google",
      testo: "Ho eseguito il laser su più zone corpo dopo aver provato altri centri dove ero rimasta insoddisfatta. Qui finalmente il risultato che cercavo."
    },
    {
      autore: "Federica G.", fonte: "Google",
      testo: "Vado da loro da anni e ogni appuntamento è una conferma. Le ragazze sono giovani, solari e professionali: ti fanno sentire coccolata dal primo momento."
    },
    {
      autore: "Alessia M.", fonte: "Google",
      testo: "Conosco le ragazze di Unique da anni e da quando ho iniziato a frequentarle non ho più cambiato. Professionali ed esperte."
    }
  ],

  /* ---------- LISTINO TRATTAMENTI ----------
     Ordine delle categorie = ordine di visualizzazione in pagina.
     Campi trattamento: nome, durata, prezzo, prezzoPieno?, badge?, evidenzia?
       prezzoPieno → prezzo barrato accanto allo scontato
       badge       → etichetta rosa ("Gratuita", "Premium"...)
       evidenzia   → riga con sfondo rosa (offerta in primo piano)
     risultati → ancora nella pagina Prima e Dopo ("Guarda i risultati") */
  /* Ogni categoria ha un'immagine di copertina per la card servizi:
     immagine = percorso base SENZA larghezza/estensione; imgW = larghezze
     disponibili in avif/webp/jpg (vedi assets/img). */
  categorie: [
    {
      id: "sguardo",
      immagine: "/assets/img/sguardo-sopracciglia-ciglia",
      imgW: [640, 736],
      imgAlt: "Primo piano di un occhio con ciglia laminate e spazzolino, sguardo definito",
      nome: "Sguardo & Sopracciglia",
      sottotitolo: "Laminazione ciglia e sopracciglia per uno sguardo definito.",
      icona: "sguardo",
      messaggio: "sguardo",
      risultati: "/prima-e-dopo.html#ciglia",
      trattamenti: [
        { nome: "Laminazione Sopracciglia",                durata: "1h", prezzo: "€50" },
        { nome: "Combo Laminazione Ciglia e Sopracciglia", durata: "2h", prezzo: "€95", prezzoPieno: "€125", badge: "Promo" },
        { nome: "Laminazione Ciglia Coreana",              durata: "1h", prezzo: "€60", prezzoPieno: "€75",  badge: "Promo" }
      ]
    },
    {
      id: "laser",
      immagine: "/assets/img/epilazione-laser-cabina",
      imgW: [640, 1000],
      imgAlt: "Seduta di epilazione laser professionale",
      nome: "Epilazione Laser",
      sottotitolo: "Addio peli superflui, con consulenza iniziale gratuita.",
      icona: "laser",
      messaggio: "laser",
      risultati: "/prima-e-dopo.html#laser",
      trattamenti: [
        { nome: "Consulenza Laser", durata: "30 min", prezzo: "GRATUITA", badge: "Gratis", evidenzia: true },

        { gruppo: "Viso" },
        { nome: "Basette",          durata: "15 min", prezzo: "€20" },
        { nome: "Labbro Superiore", durata: "15 min", prezzo: "€20" },
        { nome: "Mento",            durata: "15 min", prezzo: "€20" },
        { nome: "Viso Completo",    durata: "15 min", prezzo: "€35" },

        { gruppo: "Corpo" },
        { nome: "Linea Alba / Seno", durata: "30 min", prezzo: "€15" },
        { nome: "Ascelle",           durata: "15 min", prezzo: "€35" },
        { nome: "Inguine Parziale",  durata: "15 min", prezzo: "€40" },
        { nome: "Zona Lombare",      durata: "15 min", prezzo: "€40" },
        { nome: "Gluteo Totale",     durata: "15 min", prezzo: "€50" },
        { nome: "Inguine Totale",    durata: "15 min", prezzo: "€50" },
        { nome: "Braccia",           durata: "15 min", prezzo: "€60" },
        { nome: "Mezza Gamba",       durata: "15 min", prezzo: "€70" },
        { nome: "Gamba Intera",      durata: "30 min", prezzo: "€100" },

        { gruppo: "Uomo — Corpo" },
        { nome: "Addome",         durata: "15 min", prezzo: "€50" },
        { nome: "Petto",          durata: "15 min", prezzo: "€50" },
        { nome: "Schiena",        durata: "30 min", prezzo: "€70" },
        { nome: "Braccia",        durata: "30 min", prezzo: "€80" },
        { nome: "Petto + Addome", durata: "30 min", prezzo: "€100" },
        { nome: "Gamba Intera",   durata: "45 min", prezzo: "€110" }
      ]
    },
    {
      id: "viso",
      immagine: "/assets/img/trattamento-viso-maschera",
      imgW: [640, 1000],
      imgAlt: "Trattamento viso con maschera professionale",
      nome: "Trattamenti Viso",
      sottotitolo: "Pulizia profonda, antietà e tecnologie professionali.",
      icona: "viso",
      messaggio: "viso",
      risultati: "/prima-e-dopo.html#viso",
      trattamenti: [
        { nome: "Pulizia Viso",                       durata: "1h",       prezzo: "€45" },
        { nome: "Pulizia Viso con Ultrasuoni",        durata: "1h 15min", prezzo: "€65" },
        { nome: "Brushing Viso",                      durata: "45 min",   prezzo: "€65" },
        { nome: "Radiofrequenza Viso",                durata: "1h/1h30",  prezzo: "da €110" },
        { nome: "Trattamento Contorno Occhi Antietà", durata: "30 min",   prezzo: "€65" }
      ]
    },
    {
      id: "unghie",
      immagine: "/assets/img/unghie-semipermanente-french",
      imgW: [640, 1000],
      imgAlt: "Manicure con smalto semipermanente french",
      nome: "Unghie",
      sottotitolo: "Manicure, pedicure e semipermanente a lunga tenuta.",
      icona: "unghie",
      messaggio: "unghie",
      risultati: "/prima-e-dopo.html#unghie",
      trattamenti: [
        { nome: "Manicure",                                 durata: "30 min",   prezzo: "€20" },
        { nome: "Manicure con Semipermanente",              durata: "1h 15min", prezzo: "da €40" },
        { nome: "Pedicure",                                 durata: "45 min",   prezzo: "€35" },
        { nome: "Applicazione Smalto Semipermanente Piedi", durata: "45 min",   prezzo: "€35" },
        { nome: "Pedicure con Semipermanente",              durata: "1h 15min", prezzo: "da €45" }
      ]
    },
    {
      id: "corpo",
      immagine: "/assets/img/massaggio-bendaggi",
      imgW: [640, 800],
      imgAlt: "Trattamento corpo con bendaggi drenanti applicati sulle gambe",
      nome: "Corpo & Massaggi",
      sottotitolo: "Massaggi, rimodellamento e trattamenti anticellulite.",
      icona: "corpo",
      messaggio: "corpo",
      risultati: "/prima-e-dopo.html#corpo",
      trattamenti: [
        { nome: "Massaggio Rilassante",                           durata: "1h",       prezzo: "€50" },
        { nome: "Massaggio Gambe",                                durata: "30 min",   prezzo: "€30" },
        { nome: "Massaggio Decontratturante Schiena e Cervicale",  durata: "30 min",   prezzo: "€40" },
        { nome: "Bendaggi",                                       durata: "1h",       prezzo: "€50" },
        { nome: "Pressoterapia",                                  durata: "30 min",   prezzo: "€40" },
        { nome: "Trattamento Anticellulite",                      durata: "1h",       prezzo: "€90" },
        { nome: "Criolipolisi",                                   durata: "1h",       prezzo: "€360", badge: "Premium" },
        { nome: "Pressoterapia e Bendaggi",                       durata: "1h",       prezzo: "€90" },
        { nome: "Fanghi del Mar Morto",                           durata: "1h",       prezzo: "€90" },
        { nome: "Radiofrequenza Corpo",                           durata: "45 min",   prezzo: "€110" },
        { nome: "Pulizia Schiena",                                durata: "1h 15min", prezzo: "€75" },
        { nome: "Scrub Corpo",                                    durata: "45 min",   prezzo: "€40" },
        { nome: "Brushing Corpo",                                 durata: "1h",       prezzo: "€85" }
      ]
    },
    {
      id: "cera",
      // TEMP: la foto originale della ceretta è andata persa (non era tra le
      // sorgenti in strumenti/genera-immagini.py). In attesa di uno scatto reale
      // di ceretta, questa card usa un'immagine "cura del corpo" già presente.
      immagine: "/assets/img/oli-essenziali-corpo",
      imgW: [640, 1000],
      imgAlt: "Prodotti delicati per la cura del corpo",
      nome: "Epilazione a Cera",
      sottotitolo: "Ceretta viso, corpo e uomo con prodotti delicati.",
      icona: "cera",
      messaggio: "cera",
      risultati: "/prima-e-dopo.html",
      trattamenti: [
        { nome: "Gambe",                                durata: "15-30 min", prezzo: "da €15" },
        { nome: "Gambe e Inguine",                      durata: "45 min",    prezzo: "da €25" },
        { nome: "Inguine",                              durata: "15 min",    prezzo: "da €12" },
        { nome: "Ascelle",                              durata: "15 min",    prezzo: "€7" },
        { nome: "Braccia",                              durata: "15 min",    prezzo: "€10" },
        { nome: "Viso – Labbro Superiore",              durata: "15 min",    prezzo: "€5" },
        { nome: "Viso – Sopracciglia",                  durata: "15 min",    prezzo: "€7" },
        { nome: "Viso – Completo",                      durata: "15 min",    prezzo: "€15" },
        { nome: "Uomo Corpo – Ascelle",                 durata: "15 min",    prezzo: "€10" },
        { nome: "Uomo Corpo – Addome",                  durata: "15 min",    prezzo: "€20" },
        { nome: "Uomo Corpo – Braccia Intere",          durata: "30 min",    prezzo: "€20" },
        { nome: "Uomo Corpo – Petto",                   durata: "15 min",    prezzo: "€20" },
        { nome: "Uomo Corpo – Schiena",                 durata: "30 min",    prezzo: "€20" },
        { nome: "Uomo Corpo – Gamba Intera",            durata: "45 min",    prezzo: "€30" },
        { nome: "Uomo Corpo – Schiena, Petto e Addome", durata: "45 min",    prezzo: "€50" }
      ]
    }
  ],

  /* ---------- ARTICOLI BLOG (elenco per le card) ----------
     immagine = percorso SENZA larghezza ed estensione: il sito
     compone da solo le varianti -640/-1000 in avif, webp e jpg. */
  articoli: [
    {
      slug: "/blog/laser-fa-male-quando-si-vedono-i-risultati.html",
      titolo: "Laser: fa male? Dopo quanto si vedono i risultati?",
      estratto: "Sensazione reale durante la seduta, numero di sedute necessarie e tempi realistici per vedere la pelle liscia.",
      categoria: "Epilazione Laser",
      data: "2026-07-25",
      dataTesto: "25 luglio 2026",
      immagine: "/assets/img/epilazione-laser-cabina", larghezza: 1000, altezza: 667,
      alt: "Manipolo laser durante una seduta di epilazione definitiva"
    },
    {
      slug: "/blog/come-mantenere-la-pelle-giovane.html",
      titolo: "Come mantenere la pelle giovane: consigli e trattamenti efficaci",
      estratto: "Le abitudini quotidiane che fanno davvero la differenza e i trattamenti professionali che sostengono collagene ed elasticità.",
      categoria: "Trattamenti Viso",
      data: "2026-07-25",
      dataTesto: "25 luglio 2026",
      immagine: "/assets/img/trattamento-viso-maschera", larghezza: 1000, altezza: 667,
      alt: "Applicazione di una maschera viso professionale in cabina estetica"
    },
    {
      slug: "/blog/cellulite-cause-rimedi-trattamenti.html",
      titolo: "Cellulite: cause, rimedi e trattamenti migliori",
      estratto: "Perché si forma, cosa funziona davvero e come combinare i trattamenti professionali per risultati visibili e duraturi.",
      categoria: "Corpo & Massaggi",
      data: "2026-07-25",
      dataTesto: "25 luglio 2026",
      immagine: "/assets/img/massaggio-decontratturante", larghezza: 1000, altezza: 1500,
      alt: "Massaggio corpo professionale in cabina estetica"
    }
  ]
};

/* Esportazione per eventuale uso a moduli (non obbligatoria) */
if (typeof window !== "undefined") window.SITE_DATA = SITE_DATA;

/* ============================================================
   CMS LOADER (Decap CMS)
   ------------------------------------------------------------
   Se in /data/ trova i JSON popolati dal CMS, li unisce sopra
   SITE_DATA (i valori hardcoded qui sopra restano come fallback).
   Espone window.SITE_DATA_READY come Promise: i render aspettano
   quella prima di leggere SITE_DATA.
   ============================================================ */
window.SITE_TESTI = null;

window.SITE_DATA_READY = (async function loadCms() {
  // Solo su http(s): con file:// il fetch dei JSON non funziona.
  if (typeof window === "undefined" || !/^https?:$/.test(window.location.protocol)) return;

  const j = async (path) => {
    const r = await fetch(path, { cache: "no-cache" });
    if (!r.ok) throw new Error(path + " " + r.status);
    return r.json();
  };

  const settle = (p) => p.then(v => ({ ok: true, v }), e => ({ ok: false, e }));

  const [azR, teR, caR, reR, arR] = await Promise.all([
    settle(j("/data/azienda.json")),
    settle(j("/data/testi-pagina.json")),
    settle(j("/data/categorie.json")),
    settle(j("/data/recensioni.json")),
    settle(j("/data/articoli.json")),
  ]);

  // ── azienda: merge di ciascun sotto-oggetto (preserva chiavi non esposte) ─
  if (azR.ok) {
    const a = azR.v;
    if (a.azienda)          Object.assign(SITE_DATA.azienda, a.azienda);
    if (a.link)             Object.assign(SITE_DATA.link, a.link);
    if (a.messaggiWhatsapp) Object.assign(SITE_DATA.messaggiWhatsapp, a.messaggiWhatsapp);
    if (a.rating) {
      if (a.rating.google)    Object.assign(SITE_DATA.rating.google, a.rating.google);
      if (a.rating.treatwell) Object.assign(SITE_DATA.rating.treatwell, a.rating.treatwell);
    }
    if (Array.isArray(a.orari) && a.orari.length === 7) SITE_DATA.orari = a.orari;
  }

  // ── testi delle pagine: esposti a parte, letti dall'injector ─────────────
  if (teR.ok) window.SITE_TESTI = teR.v;

  // ── categorie: merge per id (preserva id/icona/immagine/imgW/imgAlt) ─────
  if (caR.ok && Array.isArray(caR.v.categorie)) {
    caR.v.categorie.forEach(catNew => {
      if (!catNew || !catNew.id) return;
      const cat = SITE_DATA.categorie.find(c => c.id === catNew.id);
      if (cat) Object.assign(cat, catNew); // include trattamenti aggiornati
    });
  }

  // ── recensioni: sostituzione totale (lista aperta) ───────────────────────
  if (reR.ok && Array.isArray(reR.v.lista)) SITE_DATA.recensioni = reR.v.lista;

  // ── articoli: sostituzione totale con fallback su campi tecnici mancanti ─
  if (arR.ok && Array.isArray(arR.v.lista)) {
    SITE_DATA.articoli = arR.v.lista.map(a => Object.assign({
      immagine: "/assets/img/trattamento-viso-maschera",
      larghezza: 1000,
      altezza: 667,
      alt: ""
    }, a));
  }
})().catch(err => { console.warn("CMS loader:", err); });
