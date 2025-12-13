# Transformations Cluster Website

Modern, elegant research website with custom CSS animations and bilingual support.

## 🚀 Quick Start

### Prerequisites

- Ruby 2.7+
- Bundler: `gem install bundler`

### Installation

```bash
# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve

# Visit: http://localhost:4000
```

### Development with drafts and future posts

```bash
bundle exec jekyll serve --drafts --future --livereload
```

## 📁 Project Structure

```
├── _config.yml          # Configuration
├── pages/               # All markdown pages
├── _layouts/            # HTML templates
├── _includes/           # Reusable components
├── _posts/              # News articles
├── _team/               # Team members
├── _projects/           # Research projects
├── _publications/       # Publications
└── assets/
    ├── css/             # Custom stylesheets
    │   ├── main.css     # Base styles & design system
    │   ├── layout.css   # Layout & grid systems
    │   ├── components.css # UI components
    │   └── animations.css # Animation library
    ├── js/              # JavaScript
    │   └── animations.js # Scroll animations & interactions
    ├── images/          # Images
    └── plots/           # Plotly visualizations
```

## 🎨 Design System

### Colors

- **Primary**: Forest green (#2d5016)
- **Accent**: Sage green (#6b8e4e)
- **Background**: White with gray accents

### Typography

- System font stack for performance
- Fluid type scale
- Elegant spacing

### Animations

- Scroll-triggered fade-ins
- Smooth hover effects
- Sophisticated transitions
- Reduced motion support

## 📝 Adding Content

### News Post

Create `_posts/YYYY-MM-DD-title.md`:

```markdown
---
layout: post
title: "Title"
date: 2025-12-14
lang: de
ref: unique-id
---

Content...
```

### Team Member

Create `_team/name.md`:

```markdown
---
name: "Dr. Name"
role: "Position"
image: "/assets/images/team/name.jpg"
email: "email@example.com"
---

Bio...
```

### Project

Create `_projects/project-name.md`:

```markdown
---
title: "Project Title"
duration: "2024-2027"
funding: "DFG"
---

Description...
```

### Publication

Create `_publications/author-year.md`:

```markdown
---
title: "Publication Title"
authors: "Author, A. et al."
venue: "Journal Name"
year: 2024
doi: "10.xxxx/xxxxx"
---

Abstract...
```

## 🌍 Bilingual Support

Use `lang` and `ref` in front matter to link translations:

```yaml
# German (e.g., about.md)
---
lang: de
ref: about
permalink: /about/
---

# English (e.g., about-en.md)
---
lang: en
ref: about
permalink: /en/about/
---
```

## 🚀 Deployment

Automatically deployed via GitHub Pages on push to main branch.

**URL**: https://transformation-cluster.github.io

## 📧 Contact

**Email**: contact@transformation-cluster.de

---

**Built with Jekyll** | **Designed with elegance**

### Entwicklung mit Entwürfen und zukünftigen Posts

```bash
bundle exec jekyll serve --drafts --future --livereload
```

## 📁 Projektstruktur

```
transformation-cluster.github.io/
├── _config.yml                 # Haupt-Konfigurationsdatei
├── Gemfile                     # Ruby Dependencies
├── index.md                    # Startseite
├── about.md                    # Über uns
├── news.md                     # News-Übersicht
├── team.md                     # Team-Übersicht
├── projects.md                 # Projekt-Übersicht
├── publications.md             # Publikations-Übersicht
├── events.md                   # Veranstaltungen
├── resources.md                # Ressourcen
├── contact.md                  # Kontakt
├── impressum.md                # Impressum
│
├── _posts/                     # News-Beiträge (YYYY-MM-DD-titel.md)
│   ├── 2025-11-09-beispiel-news.md
│   └── 2025-11-09-plotly-example.md
│
├── _team/                      # Team-Mitglieder
│   └── max-mustermann.md
│
├── _projects/                  # Forschungsprojekte
│   └── beispielprojekt.md
│
├── _publications/              # Publikationen
│   └── mustermann2024.md
│
├── _layouts/                   # Seitenlayouts
│   ├── default.html           # Standard-Layout (inkl. Plotly)
│   ├── team-member.html       # Team-Profil-Layout
│   ├── project.html           # Projekt-Layout
│   ├── publication.html       # Publikations-Layout
│   └── post-with-plotly.html  # News-Layout mit Plotly
│
├── _includes/                  # Wiederverwendbare Komponenten
│   └── plotly-chart.html      # Plotly-Chart Include
│
├── assets/                     # Statische Assets
│   ├── images/                # Bilder
│   │   ├── team/             # Team-Fotos
│   │   ├── news/             # News-Bilder
│   │   └── projects/         # Projekt-Bilder
│   ├── plots/                 # Plotly HTML-Dateien
│   ├── data/                  # JSON-Daten für Charts
│   └── publications/          # PDF-Dateien
│
├── CONTENT_GUIDE.md           # Anleitung zum Hinzufügen von Inhalten
├── PLOTLY_GUIDE.md            # Anleitung für Plotly-Integration
└── README.md                  # Diese Datei
```

## 📝 Inhalte hinzufügen

### News-Beitrag

```bash
# Neue Datei erstellen: _posts/2025-11-09-titel.md
```

```markdown
---
layout: post
title: "Ihr Titel"
date: 2025-11-09 10:00:00 +0100
lang: de
categories: news
---

Ihr Inhalt hier...
```

### Team-Mitglied

```bash
# Neue Datei erstellen: _team/vorname-nachname.md
```

```markdown
---
name: "Dr. Name"
role: "Position"
image: "/assets/images/team/name.jpg"
email: "email@example.com"
---

Biografie...
```

### Projekt

```bash
# Neue Datei erstellen: _projects/projektname.md
```

```markdown
---
title: "Projekttitel"
duration: "2024-2027"
funding: "DFG"
---

Projektbeschreibung...
```

### Publikation

```bash
# Neue Datei erstellen: _publications/autor-jahr.md
```

```markdown
---
title: "Titel"
authors: "Autor1, A., Autor2, B."
venue: "Journal Name"
year: 2024
doi: "10.1234/example"
---

Abstract...
```

**Detaillierte Anleitungen finden Sie in [CONTENT_GUIDE.md](CONTENT_GUIDE.md)**

## 📊 Plotly-Visualisierungen

Die Website unterstützt drei Methoden zur Integration von Plotly-Charts:

### 1. Inline JavaScript

```markdown
<div id="my-chart"></div>
<script>
  Plotly.newPlot('my-chart', data, layout, {responsive: true});
</script>
```

### 2. HTML-Datei via iframe

```python
# In Python erstellen
import plotly.graph_objects as go
fig = go.Figure(data=go.Scatter(x=[1,2,3], y=[1,4,9]))
fig.write_html('assets/plots/my-plot.html')
```

```markdown
<!-- Im Markdown einbinden -->
<iframe src="/assets/plots/my-plot.html" width="100%" height="500px"></iframe>
```

### 3. JSON-Daten mit Include

```markdown
{% include plotly-chart.html chart_id="chart-1" data_file="/assets/data/data.json" %}
```

**Detaillierte Anleitung: [PLOTLY_GUIDE.md](PLOTLY_GUIDE.md)**

## 🌍 Mehrsprachigkeit

Die Website unterstützt Deutsch (Standard) und Englisch.

Verwenden Sie `lang` und `ref` im Front Matter:

```yaml
# Deutsche Version
---
lang: de
ref: about
---

# Englische Version (z.B. about-en.md)
---
lang: en
ref: about
---
```

## 🎨 Anpassung

### Theme

Das Theme `minima` kann in `_config.yml` angepasst werden:

```yaml
minima:
  skin: solarized  # Optionen: auto, classic, dark, solarized, solarized-dark
```

### Navigation

Navigation in `_config.yml` unter `header_pages`:

```yaml
header_pages:
  - index.md
  - about.md
  - team.md
  # ...
```

### Farben und Styling

Eigenes CSS in `assets/css/style.scss` erstellen:

```scss
---
---

@import "minima";

// Ihre Anpassungen hier
```

## 🚀 Deployment

Die Website wird automatisch über GitHub Pages deployed:

1. Code zu GitHub pushen
2. In Repository Settings → Pages → Source: `main` Branch auswählen
3. Website ist verfügbar unter: `https://transformation-cluster.github.io`

### Deployment dauert 1-2 Minuten nach jedem Push

## 🛠️ Entwicklung

### Lokaler Server mit Live-Reload

```bash
bundle exec jekyll serve --livereload
```

### Build für Produktion

```bash
bundle exec jekyll build
# Output in _site/ Verzeichnis
```

### Mit Entwürfen

```bash
bundle exec jekyll serve --drafts
```

Entwürfe in `_drafts/` speichern (ohne Datum im Dateinamen).

## 📚 Wichtige Befehle

| Befehl | Beschreibung |
|--------|--------------|
| `bundle install` | Dependencies installieren |
| `bundle exec jekyll serve` | Lokalen Server starten |
| `bundle exec jekyll build` | Website bauen |
| `bundle exec jekyll clean` | Build-Cache leeren |
| `bundle update` | Dependencies aktualisieren |

## 🔧 Troubleshooting

### "Could not find gem" Fehler

```bash
bundle install
```

### Port bereits belegt

```bash
bundle exec jekyll serve --port 4001
```

### Build-Fehler

```bash
bundle exec jekyll build --verbose
```

### Cache-Probleme

```bash
bundle exec jekyll clean
bundle exec jekyll build
```

## 📖 Ressourcen

- [Jekyll Dokumentation](https://jekyllrb.com/docs/)
- [Minima Theme](https://github.com/jekyll/minima)
- [Plotly JavaScript](https://plotly.com/javascript/)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Pages](https://docs.github.com/en/pages)

## 🤝 Beitragen

1. Fork des Repositories erstellen
2. Feature-Branch erstellen: `git checkout -b feature/neue-funktion`
3. Änderungen committen: `git commit -m 'Add neue Funktion'`
4. Branch pushen: `git push origin feature/neue-funktion`
5. Pull Request erstellen

## � Lizenz

[Ihre Lizenz hier einfügen]

## 📧 Kontakt

Bei Fragen zur Website:
- **E-Mail:** contact@transformation-cluster.de
- **Issues:** [GitHub Issues](https://github.com/transformation-cluster/transformation-cluster.github.io/issues)

---

**Erstellt mit ❤️ für das Transformations Cluster**
