#!/usr/bin/env python3
"""
============================================================
UNIQUE BEAUTY LAB — generatore immagini
------------------------------------------------------------
Prende le foto originali ad alta risoluzione e produce, per
ciascuna, più larghezze in tre formati: AVIF, WebP e JPEG.
Il browser sceglie da solo il formato più leggero che supporta
(vedi i blocchi <picture> negli HTML).

USO
  1. Foto originali del centro  -> cartella  ../unique-beauty-lab-foto-originali
     Foto di repertorio          -> cartella  ../unique-beauty-lab-foto-stock
  2. Installa Pillow in un ambiente isolato:
       python3 -m venv venv
       ./venv/bin/pip install Pillow
  3. Esegui dalla cartella del sito:
       ./venv/bin/python strumenti/genera-immagini.py

ATTENZIONE: lo script SVUOTA assets/img prima di rigenerare.
Se aggiungi una foto nuova, inseriscila in SORGENTI qui sotto,
poi aggiorna gli HTML con il relativo blocco <picture>: le
larghezze effettivamente prodotte finiscono in manifest.json.
============================================================
"""

from PIL import Image, ImageOps
import json
import pathlib
import time

# --- Percorsi, tutti relativi alla cartella del sito ---
SITO      = pathlib.Path(__file__).resolve().parent.parent
ORIGINALI = SITO.parent / f"{SITO.name}-foto-originali"
STOCK     = SITO.parent / f"{SITO.name}-foto-stock"
DEST      = SITO / "assets" / "img"

# --- Larghezze per tipo di utilizzo ---
GALLERY   = [640, 1000, 1600]   # card servizi, gallery, copertine blog
CONFRONTI = [800, 1400, 2000]   # prima/dopo: servono i dettagli, si aprono in lightbox
HERO      = [640, 1024, 1600]   # immagine principale
TEAM      = [640, 1000, 1536]   # foto team verticale (mostrata a ~44vw su desktop)

# nome finale -> (file sorgente, larghezze)
SORGENTI = {
    "laminazione-ciglia-cabina":           (ORIGINALI / "B79098EC-1217-4C8D-A1DA-1D45A9899D8F.jpeg", HERO),
    "unghie-french-manicure":              (ORIGINALI / "275066D8-AC59-4D73-84AC-A8452AE75383.jpeg", GALLERY),
    "unghie-semipermanente-french":        (ORIGINALI / "IMG_0574.jpeg",       GALLERY),
    "pedicure-nail-art-fiori":             (ORIGINALI / "IMG_8971.jpeg",       GALLERY),
    "prima-dopo-laminazione-ciglia":       (ORIGINALI / "photo-output.jpeg",   CONFRONTI),
    "prima-dopo-epilazione-laser-corpo":   (ORIGINALI / "photo-output 2.jpeg", CONFRONTI),
    "prima-dopo-trattamento-viso-antieta": (ORIGINALI / "photo-output 3.jpeg", CONFRONTI),
    "prima-dopo-epilazione-laser-ascelle": (ORIGINALI / "prima-dopo-laser-ascelle.jpeg", CONFRONTI),
    "prima-dopo-epilazione-laser-schiena": (ORIGINALI / "prima-dopo-laser-schiena.jpeg", CONFRONTI),
    "prima-dopo-epilazione-laser-viso":    (ORIGINALI / "prima-dopo-laser-peluria-viso.jpeg", CONFRONTI),
    # --- foto reale del team (le 3 titolari) ---
    "team-unique-beauty-lab":              (ORIGINALI / "team-3-persone.jpg", TEAM),
    # --- foto di repertorio: da sostituire con scatti del centro ---
    "epilazione-laser-cabina":             (STOCK / "laser1-hd.jpg", GALLERY),
    "laser-strumento-cabina":              (STOCK / "laser2-hd.jpg", GALLERY),
    "laser-viso-cabina":                   (STOCK / "laser3-hd.jpg", GALLERY),
    "trattamento-viso-maschera":           (STOCK / "viso1-hd.jpg",  GALLERY),
    "pulizia-viso-cabina":                 (STOCK / "viso2-hd.jpg",  GALLERY),
    "trattamento-viso-idratante":          (STOCK / "viso3-hd.jpg",  GALLERY),
    "massaggio-decontratturante":          (STOCK / "mass1-hd.jpg",  GALLERY),
    "massaggio-cellulite-hero":            (STOCK / "mass3-hd.jpg",  GALLERY),
    "massaggio-pietre-calde":              (STOCK / "mass2-hd.jpg",  GALLERY),
    "pietre-calde-schiena":                (STOCK / "pietre-hd.jpg", GALLERY),
    "oli-essenziali-corpo":                (STOCK / "corpo1-hd.jpg", GALLERY),
    "ceretta-corpo":                       (STOCK / "ceretta-hd.jpg", GALLERY),
    "laminazione-ciglia-lavoro":           (STOCK / "ciglia2-hd.jpg", GALLERY),
    "ciglia-definite-primo-piano":         (STOCK / "ciglia3-hd.jpg", GALLERY),
    "unghie-cliente-perlato":              (ORIGINALI / "unghie-cliente-perlato.jpeg", GALLERY),
}

# AVIF a 58 rende come un JPEG a 82 pesando circa un terzo.
QUALITA = {"jpeg": 82, "webp": 80, "avif": 58}


def genera():
    DEST.mkdir(parents=True, exist_ok=True)
    for vecchio in DEST.glob("*"):
        vecchio.unlink()

    manifest, inizio = {}, time.time()

    for nome, (sorgente, larghezze) in SORGENTI.items():
        if not sorgente.exists():
            print(f"  !! saltata {nome}: manca {sorgente}")
            continue

        immagine = ImageOps.exif_transpose(Image.open(sorgente)).convert("RGB")
        w0, h0 = immagine.size

        # Mai ingrandire oltre l'originale: produrrebbe solo sfocatura.
        prodotte = [w for w in larghezze if w <= w0] or [w0]

        for w in prodotte:
            h = round(h0 * w / w0)
            ridotta = immagine if w == w0 else immagine.resize((w, h), Image.LANCZOS)
            ridotta.save(DEST / f"{nome}-{w}.jpg",  "JPEG", quality=QUALITA["jpeg"], optimize=True, progressive=True)
            ridotta.save(DEST / f"{nome}-{w}.webp", "WEBP", quality=QUALITA["webp"], method=6)
            ridotta.save(DEST / f"{nome}-{w}.avif", "AVIF", quality=QUALITA["avif"])

        manifest[nome] = {"larghezze": prodotte, "sorgente": [w0, h0],
                          "altezzaMax": round(h0 * prodotte[-1] / w0)}
        print(f"{nome:38s} {w0}x{h0}  ->  {prodotte}")

    (SITO / "strumenti" / "manifest.json").write_text(json.dumps(manifest, indent=1))
    print(f"\nFatto in {time.time() - inizio:.1f}s — file in {DEST}")


if __name__ == "__main__":
    genera()
