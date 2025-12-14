---
layout: home
title: Home
lang: en
ref: home
permalink: /en/
custom_js:
  - https://unpkg.com/cytoscape/dist/cytoscape.min.js
  - /assets/js/cytoscape-init.js
---

<div class="hero-banner">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title">Transformations Cluster</h1>
    <p class="hero-subtitle">Interdisciplinary research on societal transformation processes</p>
  </div>
</div>

## Welcome

Welcome to the website of the Transformations Cluster. We are an interdisciplinary research consortium dedicated to studying societal transformation processes.

## Our PhD Research Network

Explore the connections between 146 PhD researchers in our cluster. Click on nodes to reveal research connections, or filter by research cluster.

<div class="graph-controls">
  <div class="control-group">
    <label for="layout-selector">Layout:</label>
    <select id="layout-selector">
      <option value="preset" selected>Pre-computed</option>
      <option value="cose">Force-Directed</option>
      <option value="circle">Circle</option>
      <option value="concentric">Concentric</option>
    </select>
  </div>
  
  <div class="control-group">
    <label for="edge-weight-slider">Min. Connection Strength:</label>
    <input type="range" id="edge-weight-slider" min="0" max="1" step="0.05" value="0">
    <span class="weight-display" id="edge-weight-value">0.00</span>
  </div>
  
  <div class="control-group">
    <button id="toggle-labels" class="btn">Show Labels</button>
    <button id="btn-fit" class="btn">Fit View</button>
    <button id="btn-reset" class="btn">Reset</button>
  </div>
</div>

<div id="cy-graph" class="cytoscape-container"></div>
<div id="cy-popup" class="cy-popup"></div>

<div id="cluster-legend"></div>

## Latest News

Find the latest news and updates in our [News section](/news).

## About Us

Learn more about our [research projects](/projects), our [team](/team), and our [publications](/publications).

---

*Deutsche Version: [Startseite](/)*
