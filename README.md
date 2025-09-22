# Digitale Visitenkarte – Single Source of Truth

**Was ist neu?**
- **config.js** = eine Stelle für alle Daten (Name, Firma, Telefon, etc.).
- **vCard wird dynamisch generiert** → die angezeigten Infos und die .vcf sind immer identisch.
- **QR als statisches Bild** in `assets/qr_visitenkarte_512.png` (keine CDN-Abhängigkeit). Standard-Ziel: `https://rottach.com/visitenkarte`.

## Anpassen in 60 Sekunden
1. `config.js` öffnen → Werte eintragen (Name/Titel/Firma/Telefon/E‑Mail/Web/Adresse/LinkedIn).  
2. (Optional) QR austauschen, falls deine finale URL anders ist (z. B. andere Domain/Unterordner).  
   - Neue Datei in `assets/qr_visitenkarte_512.png` ersetzen (gleicher Name).  
   - Für Vektor-Druck liegt zusätzlich `assets/qr_visitenkarte.svg` bei.
3. `index.html` im Browser öffnen → testen.  
4. Den gesamten Ordner auf den Webspace hochladen (z. B. `rottach.com/visitenkarte/`).

## Warum dynamische vCard?
Du musst nie wieder separat eine `contact.vcf` pflegen. Die Datei wird beim Klick erzeugt – **immer anhand der sichtbaren Daten**.

## QR ändern ohne Tools
Wenn du nur die URL im QR ändern willst, ohne ein QR-Tool zu benutzen, sag mir die **finale URL**, und ich liefere dir neue PNG/SVG-Dateien.
