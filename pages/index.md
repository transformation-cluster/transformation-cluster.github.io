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

<div id="force-controls" class="force-controls" style="display: none;">
  <h3>Kräftebasierte Layout-Parameter</h3>
  <div class="force-control-grid">
    <div class="control-group">
      <label for="node-repulsion">Knotenabstoßung: <span id="node-repulsion-value">8192</span></label>
      <input type="range" id="node-repulsion" min="1000" max="50000" step="100" value="8192">
    </div>
    
    <div class="control-group">
      <label for="edge-length">Ideale Kantenlänge: <span id="edge-length-value">150</span></label>
      <input type="range" id="edge-length" min="50" max="500" step="10" value="150">
    </div>
    
    <div class="control-group">
      <label for="edge-elasticity">Kantenelastizität: <span id="edge-elasticity-value">100</span></label>
      <input type="range" id="edge-elasticity" min="10" max="500" step="10" value="100">
    </div>
    
    <div class="control-group">
      <label for="gravity">Schwerkraft: <span id="gravity-value">1.0</span></label>
      <input type="range" id="gravity" min="0.1" max="10" step="0.1" value="1.0">
    </div>
    
    <div class="control-group">
      <label for="num-iter">Iterationen: <span id="num-iter-value">2500</span></label>
      <input type="range" id="num-iter" min="500" max="10000" step="100" value="2500">
    </div>
    
    <div class="control-group">
      <button id="apply-force-layout" class="btn btn-primary">Layout anwenden</button>
      <button id="reset-force-params" class="btn">Parameter zurücksetzen</button>
    </div>
  </div>
</div>

## Aktuelle Neuigkeiten

Die neuesten Nachrichten und Updates finden Sie in unserem [News-Bereich](/news).

## Über uns

Erfahren Sie mehr über unsere [Forschungsprojekte](/projects), unser [Team](/team) und unsere [Publikationen](/publications).
