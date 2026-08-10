# Unique Beauty Lab — guida alle modifiche

Sito statico (HTML + CSS + JavaScript, nessun framework). Si pubblica su Netlify
caricando l'intera cartella: non serve nessun comando di build.

---

## Struttura

```
unique-beauty-lab/
├── index.html                 home
├── prima-e-dopo.html          risultati (ancore #laser #viso #ciglia #corpo #unghie)
├── blog.html                  elenco articoli
├── blog/                      i 3 articoli
├── assets/
│   ├── css/style.css          unico foglio di stile (indice numerato in cima)
│   ├── js/site-data.js        ⭐ CONFIG: prezzi, orari, contatti, link, articoli
│   ├── js/components.js       header/footer dinamici, flottanti, lightbox, animazioni
│   ├── js/home.js             generazione sezione Servizi
│   └── img/                   90 file: 3 formati × più larghezze
├── strumenti/
│   ├── genera-immagini.py     rigenera assets/img dalle foto originali
│   └── manifest.json          larghezze prodotte per ogni immagine
├── assets/logo/                 logo del centro (PNG) + favicon 32/48/180/512
├── robots.txt · sitemap.xml · netlify.toml
```

Le foto sorgente stanno **fuori** dalla cartella del sito, per non appesantire
il deploy:

- `../unique-beauty-lab-foto-originali/` — scatti del centro
- `../unique-beauty-lab-foto-stock/` — foto di repertorio da sostituire

---

## Design system

Tutti i valori sono variabili CSS in cima a `style.css` (blocco `01. DESIGN TOKENS`).
Cambiando lì, cambia tutto il sito in modo coerente.

| Ambito | Scelta |
|---|---|
| Titoli | Cormorant Garamond (serif elegante) |
| Etichette, menu, pulsanti | Montserrat maiuscolo spaziato |
| Testo corrente | Inter, interlinea 1,75 |
| Accento | rosa cipria `--rosa` `#E8B4C0` |
| Rosa per il **testo** | `--rosa-testo` `#A15C71` — più scuro, serve per il contrasto |
| Angoli | 2 / 4 / 8 / 14 px (`--r-xs` … `--r-lg`) |
| Ombre | `--ombra-1` (riposo), `--ombra-2` (hover), `--ombra-3` (lightbox) |
| Spaziature | scala `--sp-1` … `--sp-11` |

> **Non usare `--rosa` per il testo su fondo bianco**: il contrasto scende sotto
> la soglia di accessibilità. Per i testi c'è `--rosa-testo`.

---

## Le modifiche più frequenti

### Cambiare un prezzo o un trattamento
`assets/js/site-data.js` → blocco `categorie`. La home si aggiorna da sola.
L'ordine nell'array è l'ordine mostrato in pagina.

| Campo | A cosa serve |
|---|---|
| `prezzo` | prezzo mostrato (accetta testo, es. `"GRATUITA"`) |
| `prezzoPieno` | prezzo barrato accanto allo scontato |
| `badge` | etichetta rosa (es. `"Promo"`, `"Gratis"`) |
| `evidenzia` | `true` → riga con sfondo rosa in evidenza |

### Cambiare gli orari
`site-data.js` → blocco `orari`. **Aggiorna anche** `openingHoursSpecification`
in `index.html`: è il dato che Google usa nei risultati di ricerca.

### Cambiare il link Treatwell
`site-data.js` → `link.treatwell`. Tutti i pulsanti si aggiornano da soli.
Il link è scritto anche negli HTML come riserva (il sito resta usabile senza
JavaScript): per allinearlo ovunque fai un find & replace dell'indirizzo.

### Cambiare numero di telefono / WhatsApp
1. `site-data.js` → `azienda.telefono`, `link.telefono`, `link.whatsapp`
2. Find & replace nei file `.html` di `393791636447` e `+393791636447`
3. `index.html` → campo `telephone` nei dati strutturati

### Messaggi WhatsApp precompilati
`site-data.js` → blocco `messaggiWhatsapp`. Ogni pulsante apre WhatsApp con un
testo già pronto; nell'HTML si sceglie quale con `data-wa="nomechiave"`.

### Aggiungere un articolo
1. Duplica un file in `blog/` e aggiorna testo, `<title>`, description,
   canonical, Open Graph e dati strutturati.
2. Aggiungi la voce in `site-data.js` → `articoli` (compare da sola nelle card).
   Il campo `immagine` va **senza larghezza né estensione**: il sito compone da
   solo `-640.avif`, `-1000.webp`, ecc.
3. Aggiungi l'URL in `sitemap.xml`.

---

## Immagini

Ogni foto esiste in **AVIF, WebP e JPEG**, a più larghezze. Il browser scarica
solo il file più leggero che sa leggere: l'AVIF pesa circa un terzo del JPEG a
parità di resa.

### Sostituire o aggiungere una foto

1. Metti l'originale (più grande possibile) nella cartella delle foto originali.
2. Aggiungi la voce in `strumenti/genera-immagini.py` → `SORGENTI`.
3. Prepara l'ambiente una volta sola e lancia lo script:

```bash
python3 -m venv venv && ./venv/bin/pip install Pillow && ./venv/bin/python strumenti/genera-immagini.py
```

4. Nell'HTML inserisci il blocco `<picture>` copiando uno esistente e
   sostituendo il nome file (le larghezze prodotte sono in `manifest.json`).

Regole da rispettare:

- **nome file descrittivo** (`massaggio-anticellulite`, non `IMG_1234`)
- **attributo `alt`** che descriva la foto: conta per SEO e accessibilità
- **`width` e `height`** uguali al file più grande, così la pagina non "salta"
- **`loading="lazy"`** ovunque tranne che sull'immagine hero, dove va
  `fetchpriority="high"`
- le foto **Prima/Dopo non si ritagliano mai**: sono composite (prima e dopo
  nello stesso file) e il CSS le mostra intere apposta

La qualità massima è limitata dall'originale: lo script non ingrandisce mai una
foto, perché produrrebbe solo sfocatura. L'immagine hero oggi si ferma a 1024 px
perché tanto misura il file fornito.

---

## Quando colleghi un dominio o rinomini il sito

L'indirizzo `https://frolicking-pony-29cc7a.netlify.app` compare in:
`index.html`, `prima-e-dopo.html`, `blog.html`, i 3 articoli, `robots.txt`,
`sitemap.xml`.

Fai un find & replace su tutta la cartella con il nuovo indirizzo e ricarica su
Netlify: serve per canonical, anteprime dei link su WhatsApp e social, e dati
strutturati.

---

## Dopo la pubblicazione

1. **Google Search Console** — verifica la proprietà e invia `sitemap.xml`
2. **Profilo Google Business** — inserisci il sito come URL ufficiale
3. **Test dati strutturati** — search.google.com/test/rich-results
4. **Anteprima link** — manda l'indirizzo su WhatsApp e controlla immagine e testo
5. **PageSpeed Insights** — controlla i Core Web Vitals sul dominio definitivo
