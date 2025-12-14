---
layout: home
title: Home
permalink: /
lang: de
ref: home
custom_js:
  - https://unpkg.com/cytoscape/dist/cytoscape.min.js
  - /assets/js/cytoscape-init.js
---

<div class="hero-banner">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title">Transformations Cluster</h1>
    <p class="hero-subtitle">Interdisziplinäre Forschung zu gesellschaftlichen Transformationsprozessen</p>
  </div>
</div>

## Willkommen

Herzlich willkommen auf der Website des Transformations Clusters. Wir sind ein interdisziplinäres Forschungskonsortium, das sich mit gesellschaftlichen Transformationsprozessen beschäftigt.

## Unser Netzwerk

Entdecken Sie die Zusammenarbeit in unserem Forschungsteam. Klicken Sie auf die Knoten, um zu den Profilen zu gelangen.

<div class="graph-controls">
  <label for="layout-selector">Layout wählen:</label>
  <select id="layout-selector">
    <option value="cose" selected>Kräftebasiert</option>
    <option value="circle">Kreis</option>
    <option value="grid">Gitter</option>
    <option value="concentric">Konzentrisch</option>
    <option value="breadthfirst">Hierarchisch</option>
  </select>
  <div class="zoom-controls">
    <button id="zoom-in" class="btn-zoom" title="Vergrößern">+</button>
    <button id="zoom-out" class="btn-zoom" title="Verkleinern">−</button>
    <button id="zoom-reset" class="btn-zoom" title="Zurücksetzen">⟲</button>
  </div>
</div>

<div id="cy-graph" class="cytoscape-container"></div>
<div id="cy-popup" class="cy-popup"></div>

## Aktuelle Neuigkeiten

Die neuesten Nachrichten und Updates finden Sie in unserem [News-Bereich](/news).

## Über uns

Erfahren Sie mehr über unsere [Forschungsprojekte](/projects), unser [Team](/team) und unsere [Publikationen](/publications).
