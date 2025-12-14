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

## Unser PhD Forschungsnetzwerk

Entdecken Sie die Verbindungen zwischen 146 PhD-Forschern in unserem Cluster. Klicken Sie auf Knoten, um Forschungsverbindungen anzuzeigen, oder filtern Sie nach Forschungscluster.

<div class="graph-controls">
  <div class="control-group">
    <label for="layout-selector">Layout:</label>
    <select id="layout-selector">
      <option value="preset" selected>Vorberechnet</option>
      <option value="cose">Kräftebasiert</option>
      <option value="circle">Kreis</option>
      <option value="concentric">Konzentrisch</option>
    </select>
  </div>
  
  <div class="control-group">
    <label for="edge-weight-slider">Min. Verbindungsstärke:</label>
    <input type="range" id="edge-weight-slider" min="0" max="1" step="0.05" value="0">
    <span class="weight-display" id="edge-weight-value">0.00</span>
  </div>
  
  <div class="control-group">
    <button id="toggle-labels" class="btn">Namen anzeigen</button>
    <button id="btn-fit" class="btn">Anpassen</button>
    <button id="btn-reset" class="btn">Zurücksetzen</button>
  </div>
</div>

<div id="cy-graph" class="cytoscape-container"></div>
<div id="cy-popup" class="cy-popup"></div>

<div id="cluster-legend"></div>

## Aktuelle Neuigkeiten

Die neuesten Nachrichten und Updates finden Sie in unserem [News-Bereich](/news).

## Über uns

Erfahren Sie mehr über unsere [Forschungsprojekte](/projects), unser [Team](/team) und unsere [Publikationen](/publications).
