# Content-Anleitung für die Transformations Cluster Website

Diese Anleitung erklärt, wie Sie Inhalte zur Website hinzufügen können.

## Inhaltsverzeichnis

1. [Grundlagen](#grundlagen)
2. [News-Beiträge](#news-beiträge)
3. [Team-Mitglieder](#team-mitglieder)
4. [Projekte](#projekte)
5. [Publikationen](#publikationen)
6. [Seiten bearbeiten](#seiten-bearbeiten)
7. [Bilder und Assets](#bilder-und-assets)
8. [Mehrsprachigkeit](#mehrsprachigkeit)

---

## Grundlagen

### Markdown-Syntax

Alle Inhalte werden in Markdown geschrieben. Hier die wichtigsten Elemente:

```markdown
# Überschrift 1
## Überschrift 2
### Überschrift 3

**Fettdruck**
*Kursiv*

[Link-Text](https://example.com)

![Bild-Beschreibung](/assets/images/bild.jpg)

- Listenpunkt 1
- Listenpunkt 2

1. Nummerierte Liste
2. Zweiter Punkt
```

### Front Matter

Jede Datei beginnt mit YAML Front Matter zwischen `---`:

```yaml
---
title: "Mein Titel"
date: 2025-11-09
layout: post
---
```

---

## News-Beiträge

### Neuen News-Beitrag erstellen

1. **Dateiname:** `_posts/YYYY-MM-DD-titel.md`
   - Beispiel: `_posts/2025-11-09-neue-publikation.md`

2. **Dateiinhalt:**

```markdown
---
layout: post
title: "Ihre Überschrift"
date: 2025-11-09 10:00:00 +0100
lang: de
categories: news
author: "Ihr Name"
---

Ihr Inhalt hier...

## Unterüberschrift

Weiterer Text mit [Links](https://example.com) und **Formatierung**.
```

### Mit Bildern

```markdown
![Beschreibung](/assets/images/news/2025-11-09-bild.jpg)
```

### Mit Plotly-Visualisierungen

```markdown
---
layout: post-with-plotly
title: "Beitrag mit Visualisierung"
---

<iframe src="/assets/plots/my-plot.html" width="100%" height="500px" frameborder="0"></iframe>
```

### Kategorien

Verwenden Sie aussagekräftige Kategorien:

```yaml
categories: news conference publication grant
```

---

## Team-Mitglieder

### Neues Team-Mitglied hinzufügen

1. **Dateiname:** `_team/vorname-nachname.md`

2. **Dateiinhalt:**

```markdown
---
name: "Dr. Vorname Nachname"
role: "Position/Funktion"
image: "/assets/images/team/vorname-nachname.jpg"
email: "vorname.nachname@example.com"
phone: "+49 (0) XXX XXXXXX"
office: "Raum 123, Gebäude A"
website: "https://personal-website.com"
orcid: "0000-0000-0000-0000"
order: 10
---

Kurze Biografie oder Beschreibung...

## Forschungsschwerpunkte

- Thema 1
- Thema 2

## Ausbildung

- 20XX: Promotion in [Fach]
- 20XX: Master in [Fach]

## Ausgewählte Publikationen

[Liste wichtiger Publikationen]
```

### Profilbild-Anforderungen

- **Format:** JPG oder PNG
- **Größe:** Mindestens 500x500 px
- **Speicherort:** `assets/images/team/`
- **Benennung:** `vorname-nachname.jpg`

### Sortierung

Das Feld `order` bestimmt die Reihenfolge auf der Team-Seite (kleinere Zahlen erscheinen zuerst).

---

## Projekte

### Neues Projekt anlegen

1. **Dateiname:** `_projects/projektname.md`

2. **Dateiinhalt:**

```markdown
---
title: "Projekttitel"
duration: "2024-2027"
funding: "Förderorganisation (z.B. DFG, BMBF)"
team_members:
  - "Dr. Person 1"
  - "Dr. Person 2"
links:
  - title: "Projekt-Website"
    url: "https://example.com"
  - title: "GitHub Repository"
    url: "https://github.com/..."
order: 1
---

## Projektziel

Beschreibung der Ziele...

## Methoden

Verwendete Methoden...

## Erwartete Ergebnisse

Was erwarten Sie?

## Aktueller Stand

[Optional] Fortschrittsbericht...
```

---

## Publikationen

### Neue Publikation hinzufügen

1. **Dateiname:** `_publications/erstautor-jahr.md`
   - Beispiel: `_publications/mueller-2024.md`

2. **Dateiinhalt:**

```markdown
---
title: "Vollständiger Titel der Publikation"
authors: "Autor1, A., Autor2, B., & Autor3, C."
venue: "Name des Journals oder der Konferenz"
year: 2024
doi: "10.1234/example.2024"
pdf: "/assets/publications/mueller-2024.pdf"
bibtex: |
  @article{mueller2024,
    title={Vollständiger Titel},
    author={Autor1, A. and Autor2, B.},
    journal={Journal Name},
    year={2024},
    doi={10.1234/example.2024}
  }
---

## Abstract

Zusammenfassung der Publikation...

## Key Findings

- Wichtiges Ergebnis 1
- Wichtiges Ergebnis 2

## Supplementary Materials

[Links zu zusätzlichen Materialien]
```

### PDF bereitstellen

1. PDF speichern unter: `assets/publications/erstautor-jahr.pdf`
2. Im Front Matter verlinken: `pdf: "/assets/publications/erstautor-jahr.pdf"`

---

## Seiten bearbeiten

### Hauptseiten bearbeiten

Die folgenden Dateien können Sie direkt bearbeiten:

- `index.md` - Startseite
- `about.md` - Über uns
- `contact.md` - Kontakt
- `events.md` - Veranstaltungen
- `resources.md` - Ressourcen
- `impressum.md` - Impressum

### Beispiel: About-Seite aktualisieren

Öffnen Sie `about.md` und bearbeiten Sie die Abschnitte:

```markdown
---
layout: page
title: Über uns
permalink: /about/
---

# Über den Transformations Cluster

Ihr aktualisierter Text hier...
```

---

## Bilder und Assets

### Verzeichnisstruktur

```
assets/
├── images/
│   ├── team/           # Team-Fotos
│   ├── news/           # News-Bilder
│   ├── projects/       # Projekt-Bilder
│   └── general/        # Allgemeine Bilder
├── plots/              # Plotly HTML-Dateien
├── data/               # JSON-Daten für Charts
├── publications/       # PDFs von Publikationen
└── css/                # Custom CSS (falls benötigt)
```

### Bilder hinzufügen

1. Bild in den entsprechenden Ordner kopieren
2. Im Markdown referenzieren:

```markdown
![Beschreibender Alt-Text](/assets/images/ordner/dateiname.jpg)
```

### Bild-Optimierung

- **Web-Bilder:** Maximal 1920px Breite
- **Team-Fotos:** 500x500px
- **Format:** JPG für Fotos, PNG für Grafiken mit Transparenz
- **Kompression:** Nutzen Sie Tools wie TinyPNG

---

## Mehrsprachigkeit

### Zweisprachige Inhalte

Verwenden Sie die `lang` und `ref` Felder:

**Deutsche Version (`about.md`):**

```yaml
---
layout: page
title: Über uns
lang: de
ref: about
---
```

**Englische Version (`about-en.md`):**

```yaml
---
layout: page
title: About Us
lang: en
ref: about
---
```

### Best Practices

1. **Konsistente `ref`:** Verwenden Sie die gleiche `ref` für zusammengehörige Übersetzungen
2. **Dateinamen:** Fügen Sie `-en` für englische Versionen hinzu
3. **Interne Links:** Verlinken Sie immer beide Sprachversionen

---

## Workflow-Empfehlungen

### Lokales Testen

```bash
# Jekyll installieren (einmalig)
bundle install

# Lokalen Server starten
bundle exec jekyll serve

# Website aufrufen
# http://localhost:4000
```

### Git-Workflow

```bash
# Änderungen hinzufügen
git add .

# Commit erstellen
git commit -m "Add new publication"

# Zu GitHub pushen
git push origin main
```

Nach dem Push wird die Website automatisch aktualisiert (kann 1-2 Minuten dauern).

---

## Tipps & Tricks

### 1. Excerpts (Vorschautexte)

Jekyll erstellt automatisch Excerpts (erste Textzeilen). Sie können diese auch manuell definieren:

```markdown
---
excerpt: "Dieser Text erscheint in der Vorschau"
---
```

### 2. Entwürfe

Speichern Sie Entwürfe im Ordner `_drafts/` (ohne Datum im Dateinamen):

```
_drafts/
└── kommender-beitrag.md
```

Lokale Vorschau mit Entwürfen:

```bash
bundle exec jekyll serve --drafts
```

### 3. Zukünftige Posts

Posts mit zukünftigem Datum werden standardmäßig nicht angezeigt. Lokale Vorschau:

```bash
bundle exec jekyll serve --future
```

### 4. Syntax-Highlighting

```markdown
```python
def hello_world():
    print("Hello!")
```
```

---

## Häufige Fehler

### Build-Fehler

1. **YAML-Fehler:** Front Matter muss valides YAML sein
2. **Dateinamen:** Posts müssen `YYYY-MM-DD-titel.md` Format haben
3. **Fehlende Felder:** Pflichtfelder im Front Matter nicht vergessen

### Link-Fehler

- Verwenden Sie absolute Pfade: `/assets/images/bild.jpg`
- Oder relative Pfade: `../images/bild.jpg`
- Bei internen Links: `[Link](/about/)` mit führendem und abschließendem `/`

---

## Support

Bei Fragen oder Problemen:

1. Konsultieren Sie diese Anleitung
2. Schauen Sie sich Beispieldateien in den `_posts/`, `_team/`, etc. Ordnern an
3. Kontaktieren Sie das Web-Team

**Viel Erfolg beim Erstellen von Inhalten! 🚀**
