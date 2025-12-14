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

<div id="force-controls" class="force-controls" style="display: none;">
  <h3>Force-Directed Layout Parameters</h3>
  <div class="force-control-grid">
    <div class="control-group">
      <label for="node-repulsion">Node Repulsion: <span id="node-repulsion-value">8192</span></label>
      <input type="range" id="node-repulsion" min="1000" max="50000" step="100" value="8192">
    </div>
    
    <div class="control-group">
      <label for="edge-length">Ideal Edge Length: <span id="edge-length-value">150</span></label>
      <input type="range" id="edge-length" min="50" max="500" step="10" value="150">
    </div>
    
    <div class="control-group">
      <label for="edge-elasticity">Edge Elasticity: <span id="edge-elasticity-value">100</span></label>
      <input type="range" id="edge-elasticity" min="10" max="500" step="10" value="100">
    </div>
    
    <div class="control-group">
      <label for="gravity">Gravity: <span id="gravity-value">1.0</span></label>
      <input type="range" id="gravity" min="0.1" max="10" step="0.1" value="1.0">
    </div>
    
    <div class="control-group">
      <label for="num-iter">Iterations: <span id="num-iter-value">2500</span></label>
      <input type="range" id="num-iter" min="500" max="10000" step="100" value="2500">
    </div>
    
    <div class="control-group">
      <button id="apply-force-layout" class="btn btn-primary">Apply Layout</button>
      <button id="reset-force-params" class="btn">Reset Parameters</button>
    </div>
  </div>
</div>

## Latest News

Find the latest news and updates in our [News section](/news).

## About Us

Learn more about our [research projects](/projects), our [team](/team), and our [publications](/publications).

---

*Deutsche Version: [Startseite](/)*
