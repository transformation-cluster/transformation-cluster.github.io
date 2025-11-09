# Plotly Integration Guide für Jekyll Website

Diese Anleitung erklärt, wie Sie interaktive Plotly-Visualisierungen in Ihre Jekyll-Website einbinden können.

## Verfügbare Methoden

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
