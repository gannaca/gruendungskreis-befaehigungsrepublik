# Gründungskreis Befähigungsrepublik 2040

Eine reaktionsschnelle, einseitige React-Landingpage als Call-to-Action nach dem Vortrag "Befähigungsrepublik 2040".

## Design

- **Dark Mode** passend zur Präsentation
- **High Contrast** mit Cyan/Magenta Akzenten
- **Mobile-First** responsives Design
- Typografie: Inter + JetBrains Mono

## Tech Stack

- React 18 + TypeScript
- Vite (Build Tool)
- Tailwind CSS
- React Hook Form (Formular-Validierung)
- Netlify Forms (Daten-Handling)

## Deployment auf Netlify

### Option 1: Git Repository (empfohlen)

1. Repository auf GitHub/GitLab erstellen
2. Diesen Ordner hochladen
3. In Netlify: "New site from Git" → Repository verbinden
4. Build-Einstellungen werden automatisch aus `netlify.toml` gelesen

### Option 2: Drag & Drop

1. Lokal builden:
   ```bash
   npm install
   npm run build
   ```
2. Den `dist` Ordner auf Netlify ziehen

### Option 3: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Lokale Entwicklung

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Production Build
npm run build

# Preview des Builds
npm run preview
```

## Netlify Forms Setup

Die Formulardaten werden automatisch von Netlify erfasst. Nach dem Deployment:

1. Gehe zu Netlify Dashboard → Site → Forms
2. Die Einträge erscheinen unter "gruendungskreis"
3. Optional: E-Mail-Benachrichtigungen unter Site Settings → Forms → Form notifications

## Formular-Felder

| Feld | Typ | Pflicht |
|------|-----|---------|
| vorname | Text | Ja |
| nachname | Text | Ja |
| email | E-Mail | Ja |
| organisation | Text | Nein |
| beitrag_information | Checkbox | Min. 1 |
| beitrag_expertise | Checkbox | Min. 1 |
| beitrag_finanziell | Checkbox | Min. 1 |
| datenschutz | Checkbox | Ja |

## Anpassungen

- Farben: `tailwind.config.js`
- Styles: `src/index.css`
- Inhalte: `src/App.tsx`
- Meta-Tags: `index.html`

---

**Initiator:** Christopher Peterka | gannaca
