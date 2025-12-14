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

## Our Network

Explore the collaboration within our research team. Click on nodes to visit team member profiles.

<div class="graph-controls">
  <label for="layout-selector">Choose Layout:</label>
  <select id="layout-selector">
    <option value="cose" selected>Force-Directed</option>
    <option value="circle">Circle</option>
    <option value="grid">Grid</option>
    <option value="concentric">Concentric</option>
    <option value="breadthfirst">Hierarchical</option>
  </select>
</div>

<div id="cy-graph" class="cytoscape-container"></div>
<div id="cy-popup" class="cy-popup"></div>

## Latest News

Find the latest news and updates in our [News section](/news).

## About Us

Learn more about our [research projects](/projects), our [team](/team), and our [publications](/publications).

---

*Deutsche Version: [Startseite](/)*
