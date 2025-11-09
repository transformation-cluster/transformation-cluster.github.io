# Plotly Integration Guide für Jekyll Website

Diese Anleitung erklärt, wie Sie interaktive Plotly-Visualisierungen via iframe in Ihre Jekyll-Website einbinden können.

## Übersicht

Die einfachste und zuverlässigste Methode ist, Plotly-Grafiken als HTML-Dateien zu exportieren und per iframe einzubinden. Dies funktioniert perfekt mit GitHub Pages und erfordert keine zusätzlichen JavaScript-Libraries.

## Schritt-für-Schritt Anleitung

### Schritt 1: Plotly-Grafik in Python erstellen

```python
import plotly.graph_objects as go
import plotly.express as px

# Beispiel 1: Einfacher Scatter Plot
fig = go.Figure(data=go.Scatter(
    x=[1, 2, 3, 4, 5],
    y=[1, 4, 9, 16, 25],
    mode='lines+markers'
))

fig.update_layout(
    title='Beispiel Plot',
    xaxis_title='X-Achse',
    yaxis_title='Y-Achse'
)

# Als HTML-Datei exportieren
fig.write_html('assets/plots/my-plot.html')
```

### Schritt 2: HTML-Datei im Repository speichern

Speichern Sie die HTML-Datei unter:
```
assets/plots/YYYY-MM-DD-beschreibung.html
```

Beispiel:
```
assets/plots/2025-11-09-temperature-analysis.html
```

### Schritt 3: Im Markdown einbinden

Fügen Sie in Ihrem Post oder Ihrer Seite ein:

```markdown
<iframe src="/assets/plots/2025-11-09-temperature-analysis.html" 
        width="100%" 
        height="500px" 
        frameborder="0" 
        style="border: 1px solid #e0e0e0; border-radius: 4px;">
</iframe>
```

## Erweiterte Beispiele

### Beispiel 1: Plot mit Pandas Daten

```python
import pandas as pd
import plotly.express as px

# Daten laden
df = pd.read_csv('data.csv')

# Interaktiven Plot erstellen
fig = px.scatter(
    df, 
    x='variable1', 
    y='variable2', 
    color='category',
    title='Analyse der Variablen'
)

# Exportieren
fig.write_html('assets/plots/2025-11-09-scatter-analysis.html')
```

### Beispiel 2: Mehrere Datenreihen

```python
import plotly.graph_objects as go

fig = go.Figure()

# Erste Datenreihe
fig.add_trace(go.Scatter(
    x=[1, 2, 3, 4, 5],
    y=[1, 4, 9, 16, 25],
    mode='lines+markers',
    name='Serie 1'
))

# Zweite Datenreihe
fig.add_trace(go.Scatter(
    x=[1, 2, 3, 4, 5],
    y=[1, 2, 4, 8, 16],
    mode='lines+markers',
    name='Serie 2'
))

fig.update_layout(
    title='Vergleich zweier Serien',
    hovermode='x unified'
)

fig.write_html('assets/plots/2025-11-09-comparison.html')
```

### Beispiel 3: Balkendiagramm

```python
import plotly.graph_objects as go

categories = ['Kategorie A', 'Kategorie B', 'Kategorie C', 'Kategorie D']
values = [20, 35, 30, 15]

fig = go.Figure(data=[
    go.Bar(x=categories, y=values)
])

fig.update_layout(
    title='Verteilung nach Kategorien',
    yaxis_title='Anzahl'
)

fig.write_html('assets/plots/2025-11-09-distribution.html')
```

### Beispiel 4: Interaktive Heatmap

```python
import plotly.graph_objects as go
import numpy as np

# Beispiel-Daten
z_data = np.random.randn(20, 20)

fig = go.Figure(data=go.Heatmap(
    z=z_data,
    colorscale='Viridis'
))

fig.update_layout(
    title='Heatmap Visualisierung',
    width=800,
    height=600
)

fig.write_html('assets/plots/2025-11-09-heatmap.html')
```

## Export-Optionen

### Standard-Export

```python
fig.write_html('assets/plots/my-plot.html')
```

### Mit benutzerdefinierten Konfigurationen

```python
fig.write_html(
    'assets/plots/my-plot.html',
    config={
        'displayModeBar': True,      # Toolbar anzeigen
        'displaylogo': False,         # Plotly-Logo ausblenden
        'toImageButtonOptions': {     # Download-Button konfigurieren
            'format': 'svg',          # Format: 'png', 'svg', 'jpeg', 'webp'
            'filename': 'mein_plot',
            'height': 600,
            'width': 800
        }
    }
)
```

### Kleinere Dateigröße (CDN statt eingebettet)

```python
fig.write_html(
    'assets/plots/my-plot.html',
    include_plotlyjs='cdn'  # Verwendet CDN statt eingebetteter Library
)
```

## Styling und Anpassung

### Responsive Plots

```python
fig.update_layout(
    autosize=True,
    margin=dict(l=50, r=50, t=50, b=50)
)
```

### An Website-Theme anpassen

```python
fig.update_layout(
    paper_bgcolor='rgba(0,0,0,0)',    # Transparenter Hintergrund
    plot_bgcolor='rgba(0,0,0,0)',
    font=dict(
        family='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
        size=12,
        color='#333333'
    )
)
```

### Deutsche Beschriftungen

```python
fig.update_layout(
    title='Titel auf Deutsch',
    xaxis_title='X-Achse Beschriftung',
    yaxis_title='Y-Achse Beschriftung',
    legend_title='Legende',
    hovermode='x unified'
)
```

## Einbindung im Markdown

### Standard-Einbindung

```markdown
<iframe src="/assets/plots/my-plot.html" width="100%" height="500px" frameborder="0"></iframe>
```

### Mit Styling

```markdown
<iframe src="/assets/plots/my-plot.html" 
        width="100%" 
        height="600px" 
        frameborder="0" 
        style="border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
</iframe>
```

### Mit Beschreibung

```markdown
## Analyse-Ergebnisse

Hier ist unsere interaktive Visualisierung der Ergebnisse:

<iframe src="/assets/plots/2025-11-09-results.html" 
        width="100%" 
        height="500px" 
        frameborder="0" 
        style="border: 1px solid #e0e0e0; border-radius: 4px;">
</iframe>

*Hinweis: Sie können mit dem Plot interagieren - Zoomen, Hover für Details, etc.*
```

## Workflow-Empfehlung

### Für Data Scientists

```python
# workflow.py - Kompletter Workflow von Analyse bis Veröffentlichung

import plotly.graph_objects as go
import pandas as pd
from datetime import datetime

# 1. Daten analysieren
df = pd.read_csv('research_data.csv')
# ... Ihre Analyse ...

# 2. Plot erstellen
fig = go.Figure(data=go.Scatter(x=df['x'], y=df['y']))
fig.update_layout(title='Forschungsergebnisse')

# 3. Dateiname mit Datum
today = datetime.now().strftime('%Y-%m-%d')
plot_filename = f'assets/plots/{today}-research-results.html'
fig.write_html(plot_filename)

# 4. Optional: Automatisch Post erstellen
post_content = f"""---
layout: post
title: "Neue Forschungsergebnisse"
date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S %z')}
categories: research results
---

## Ergebnisse unserer Analyse

<iframe src="/{plot_filename}" width="100%" height="600px" frameborder="0"></iframe>

## Interpretation

[Fügen Sie hier Ihre Interpretation ein]
"""

post_filename = f'_posts/{today}-research-results.md'
with open(post_filename, 'w') as f:
    f.write(post_content)

print(f"✅ Plot erstellt: {plot_filename}")
print(f"✅ Post erstellt: {post_filename}")
```

## Organisation der Plot-Dateien

### Empfohlene Verzeichnisstruktur

```
assets/plots/
├── 2025-11/
│   ├── 2025-11-09-temperature-analysis.html
│   ├── 2025-11-15-survey-results.html
│   └── 2025-11-20-comparison-study.html
├── 2025-12/
│   └── ...
└── README.md  # Dokumentation der Plots
```

### Benennung

Verwenden Sie aussagekräftige Namen:
- ✅ `2025-11-09-temperature-trend-analysis.html`
- ✅ `2025-11-09-survey-demographics.html`
- ❌ `plot1.html`
- ❌ `figure.html`

## Troubleshooting

### Plot wird nicht angezeigt

1. **Überprüfen Sie den Dateipfad**:
   - Muss mit `/` beginnen (absolut)
   - Beispiel: `/assets/plots/my-plot.html`

2. **Überprüfen Sie, ob die Datei existiert**:
   ```bash
   ls assets/plots/my-plot.html
   ```

3. **Testen Sie lokal**:
   ```bash
   bundle exec jekyll serve
   ```

### Plot zu groß / langsam

1. **Reduzieren Sie Datenpunkte**:
   ```python
   # Downsampling
   df_sampled = df.sample(n=1000)
   ```

2. **Verwenden Sie CDN**:
   ```python
   fig.write_html('plot.html', include_plotlyjs='cdn')
   ```

### Styling-Probleme

1. **Feste Höhe setzen**:
   ```markdown
   <iframe ... height="500px"></iframe>
   ```

2. **Responsive Container**:
   ```markdown
   <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
     <iframe src="/assets/plots/plot.html" 
             style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;">
     </iframe>
   </div>
   ```

## Best Practices

1. **Dateinamen**: Immer mit Datum beginnen: `YYYY-MM-DD-beschreibung.html`
2. **Dateigröße**: Halten Sie Plots unter 5 MB
3. **Accessibility**: Fügen Sie beschreibenden Text um den Plot hinzu
4. **Performance**: Verwenden Sie `include_plotlyjs='cdn'` für kleinere Dateien
5. **Dokumentation**: Kommentieren Sie Ihre Python-Skripte
6. **Versionierung**: Committen Sie sowohl Plot als auch das Python-Skript

## Weitere Ressourcen

- [Plotly Python Dokumentation](https://plotly.com/python/)
- [Plotly Figure Reference](https://plotly.com/python/reference/)
- [Plotly Express](https://plotly.com/python/plotly-express/)
- [Plotly Themes](https://plotly.com/python/templates/)

## Beispiel-Template

Speichern Sie dies als `create_plot.py`:

```python
#!/usr/bin/env python3
"""
Template für Plotly-Plots für die Website
"""

import plotly.graph_objects as go
from datetime import datetime
import sys

def create_plot(title, output_filename):
    """Erstellt einen Beispiel-Plot"""
    
    # Ihre Daten hier
    x = [1, 2, 3, 4, 5]
    y = [1, 4, 9, 16, 25]
    
    # Plot erstellen
    fig = go.Figure(data=go.Scatter(x=x, y=y, mode='lines+markers'))
    
    # Layout anpassen
    fig.update_layout(
        title=title,
        xaxis_title='X-Achse',
        yaxis_title='Y-Achse',
        hovermode='x unified',
        # An Website-Theme anpassen
        font=dict(
            family='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
            size=12,
            color='#333333'
        ),
        paper_bgcolor='white',
        plot_bgcolor='white'
    )
    
    # Exportieren
    fig.write_html(
        output_filename,
        config={
            'displayModeBar': True,
            'displaylogo': False,
            'toImageButtonOptions': {
                'format': 'svg',
                'filename': title.replace(' ', '_'),
            }
        }
    )
    
    print(f"✅ Plot erstellt: {output_filename}")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python create_plot.py 'Plot Titel'")
        sys.exit(1)
    
    title = sys.argv[1]
    today = datetime.now().strftime('%Y-%m-%d')
    filename = f"assets/plots/{today}-{title.lower().replace(' ', '-')}.html"
    
    create_plot(title, filename)
```

**Viel Erfolg mit Ihren interaktiven Visualisierungen! 📊**

### Methode 1: Inline JavaScript (Empfohlen für einfache Plots)

**Vorteile:**
- Direkt im Markdown-Content
- Keine zusätzlichen Dateien nötig
- Volle Kontrolle über das Plot-Verhalten

**Verwendung:**

```markdown
---
layout: post-with-plotly
title: "Mein Post mit Plot"
---

<div id="my-plot" style="width:100%;height:400px;"></div>

<script>
  var data = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 4, 9, 16, 25],
    type: 'scatter'
  }];
  
  var layout = {
    title: 'Mein Plot'
  };
  
  Plotly.newPlot('my-plot', data, layout, {responsive: true});
</script>
```

### Methode 2: HTML-Datei via iframe (Empfohlen für komplexe Plots)

**Vorteile:**
- Ideal für aus Python exportierte Plots
- Keine JavaScript-Kenntnisse im Markdown nötig
- Plots können separat entwickelt und getestet werden

**Python-Code zum Erstellen:**

```python
import plotly.graph_objects as go
import plotly.express as px

# Beispiel 1: Einfacher Plot
fig = go.Figure(data=go.Scatter(x=[1, 2, 3], y=[1, 4, 9]))
fig.update_layout(title="Mein Plot")
fig.write_html('assets/plots/my-plot.html')

# Beispiel 2: Komplexer Plot mit Pandas
import pandas as pd
df = pd.read_csv('data.csv')
fig = px.scatter(df, x='column1', y='column2', color='category')
fig.write_html('assets/plots/complex-plot.html')

# Beispiel 3: Mit Konfigurationsoptionen
fig.write_html(
    'assets/plots/my-plot.html',
    config={
        'displayModeBar': True,
        'displaylogo': False,
        'toImageButtonOptions': {
            'format': 'svg',
            'filename': 'custom_image',
            'height': 600,
            'width': 800
        }
    }
)
```

**Einbindung im Markdown:**

```markdown
<iframe src="/assets/plots/my-plot.html" width="100%" height="500px" frameborder="0"></iframe>
```

### Methode 3: JSON-Daten mit Include (Empfohlen für wiederverwendbare Charts)

**Vorteile:**
- Daten und Präsentation getrennt
- Wiederverwendbar
- Einfach zu aktualisieren

**1. JSON-Datei erstellen (`assets/data/my-data.json`):**

```json
{
  "data": [
    {
      "x": [1, 2, 3, 4, 5],
      "y": [2, 4, 3, 5, 7],
      "type": "bar",
      "name": "Datenserie 1"
    }
  ],
  "layout": {
    "title": "Mein Chart",
    "xaxis": {"title": "X-Achse"},
    "yaxis": {"title": "Y-Achse"}
  }
}
```

**2. Python-Code zum Generieren der JSON:**

```python
import plotly.graph_objects as go
import json

fig = go.Figure(data=go.Bar(x=[1, 2, 3], y=[2, 4, 3]))
fig.update_layout(title="Mein Chart")

# Als JSON speichern
with open('assets/data/my-data.json', 'w') as f:
    json.dump({
        'data': fig.data,
        'layout': fig.layout
    }, f, cls=plotly.utils.PlotlyJSONEncoder)
```

**3. Im Markdown einbinden:**

```markdown
{% include plotly-chart.html chart_id="unique-id" data_file="/assets/data/my-data.json" %}
```

## Workflow-Empfehlungen

### Für Data Scientists (Python → Website)

```python
# workflow.py
import plotly.graph_objects as go
import plotly.express as px

# 1. Analyse durchführen
# ... Ihre Datenanalyse ...

# 2. Plot erstellen
fig = px.scatter(df, x='x', y='y', title='Ergebnisse')

# 3. Für Jekyll exportieren
fig.write_html('assets/plots/analyse-2025-11-09.html')

# 4. Markdown-Post erstellen
post_content = f"""---
layout: post-with-plotly
title: "Neue Analyseergebnisse"
date: 2025-11-09
---

## Ergebnisse

<iframe src="/assets/plots/analyse-2025-11-09.html" width="100%" height="600px" frameborder="0"></iframe>
"""

with open('_posts/2025-11-09-neue-analyse.md', 'w') as f:
    f.write(post_content)
```

### Für Content-Ersteller (Markdown)

1. **Einfache Plots:** Verwenden Sie Methode 1 (Inline JavaScript)
2. **Komplexe Plots:** Bitten Sie das Data-Team um eine HTML-Datei und verwenden Sie Methode 2
3. **Standardisierte Charts:** Verwenden Sie Methode 3 mit vorhandenen JSON-Dateien

## Styling und Anpassung

### Responsive Plots

Alle Methoden unterstützen responsive Plots. Achten Sie darauf:

```javascript
// Immer config.responsive = true verwenden
Plotly.newPlot('chart-id', data, layout, {responsive: true});
```

### Farbschema an Website anpassen

```javascript
var layout = {
  paper_bgcolor: 'rgba(0,0,0,0)',  // Transparenter Hintergrund
  plot_bgcolor: 'rgba(0,0,0,0)',
  font: {
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
    color: '#333'
  }
};
```

### Dark Mode Unterstützung

```javascript
// Farben dynamisch basierend auf Theme setzen
var isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
var layout = {
  paper_bgcolor: isDarkMode ? '#1e1e1e' : '#ffffff',
  font: {
    color: isDarkMode ? '#ffffff' : '#333333'
  }
};
```

## Troubleshooting

### Plot wird nicht angezeigt

1. Überprüfen Sie, ob das Layout `post-with-plotly` oder `default` verwendet wird
2. Kontrollieren Sie die Browser-Konsole auf JavaScript-Fehler
3. Stellen Sie sicher, dass die div-ID eindeutig ist
4. Überprüfen Sie Dateipfade (relativ zum Site-Root)

### Performance-Probleme

- Verwenden Sie `fig.write_html(..., include_plotlyjs='cdn')` für kleinere Dateien
- Bei vielen Datenpunkten: Downsampling in Betracht ziehen
- Lazy Loading für Plots auf der Startseite implementieren

### Build-Fehler

- Stellen Sie sicher, dass alle JSON-Dateien valides JSON enthalten
- Überprüfen Sie, dass keine Jekyll-Liquid-Tags in JavaScript-Strings kollidieren
- Verwenden Sie `{% raw %}` und `{% endraw %}` bei Bedarf

## Best Practices

1. **Benennung:** Verwenden Sie aussagekräftige IDs: `plot-temperature-2025` statt `plot1`
2. **Organisation:** Speichern Sie Plots in `assets/plots/YYYY-MM/` mit Datum im Namen
3. **Dokumentation:** Fügen Sie Kommentare zu komplexen Plot-Konfigurationen hinzu
4. **Performance:** Lazy-load Plots, die nicht sofort sichtbar sind
5. **Accessibility:** Fügen Sie `aria-label` und beschreibenden Text hinzu

## Weitere Ressourcen

- [Plotly JavaScript Dokumentation](https://plotly.com/javascript/)
- [Plotly Python Dokumentation](https://plotly.com/python/)
- [Jekyll Liquid Dokumentation](https://jekyllrb.com/docs/liquid/)
