---
layout: post
title: "Beispiel: Interaktive Plotly Visualisierung"
date: 2025-11-09 12:00:00 +0100
lang: de
ref: plotly-example
categories: news visualization
author: "Data Team"
---

Dieser Beitrag zeigt, wie Sie Plotly-Visualisierungen via iframe einbinden können.

## Plotly-Visualisierung einbinden

Erstellen Sie zunächst Ihre Plotly-Grafik in Python und exportieren Sie sie als HTML-Datei:

```python
import plotly.graph_objects as go

# Erstellen Sie Ihren Plot
fig = go.Figure(data=go.Scatter(x=[1, 2, 3, 4, 5], y=[1, 4, 9, 16, 25]))
fig.update_layout(title='Beispiel Plot')

# Als HTML-Datei exportieren
fig.write_html('assets/plots/example-plot.html')
```

Dann binden Sie die HTML-Datei in Ihrem Post ein:

<iframe src="/assets/plots/example-plot.html" width="100%" height="500px" frameborder="0" style="border: 1px solid #e0e0e0; border-radius: 4px;"></iframe>

## Weitere Informationen

Mehr Details zur Plotly-Integration finden Sie in der Datei `PLOTLY_GUIDE.md`.
