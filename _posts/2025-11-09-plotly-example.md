---
layout: post-with-plotly
title: "Beispiel: Interaktive Plotly Visualisierung"
date: 2025-11-09 12:00:00 +0100
lang: de
categories: news visualization
author: "Data Team"
---

Dieser Beitrag zeigt verschiedene Methoden zur Integration von Plotly-Visualisierungen.

## Methode 1: Inline Plotly mit JavaScript

<div id="plotly-chart-1" style="width:100%;height:400px;"></div>

<script>
  var data = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 4, 9, 16, 25],
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Quadratische Funktion'
  }];
  
  var layout = {
    title: 'Beispiel Inline Plot',
    xaxis: { title: 'X-Achse' },
    yaxis: { title: 'Y-Achse' }
  };
  
  Plotly.newPlot('plotly-chart-1', data, layout, {responsive: true});
</script>

## Methode 2: Plotly HTML via iframe

Wenn Sie komplexe Plotly-Grafiken haben, können Sie diese als separate HTML-Dateien exportieren und einbinden:

<iframe src="/assets/plots/example-plot.html" width="100%" height="500px" frameborder="0"></iframe>

### So erstellen Sie eine Plotly HTML-Datei (Python):

```python
import plotly.graph_objects as go

fig = go.Figure(data=go.Scatter(x=[1, 2, 3], y=[1, 4, 9]))
fig.write_html('assets/plots/example-plot.html')
```

## Methode 3: Plotly Include (für wiederverwendbare Komponenten)

Sie können auch Plotly-Code in einer separaten Datei speichern und als Include verwenden.

{% include plotly-chart.html chart_id="chart-2" data_file="/assets/data/chart-data.json" %}

## Weitere Informationen

Mehr Details zur Plotly-Integration finden Sie in der Datei `PLOTLY_GUIDE.md`.
