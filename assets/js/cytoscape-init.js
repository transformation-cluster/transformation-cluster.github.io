// Cytoscape.js PhD Network Graph Initialization
(function() {
  'use strict';
  
  // Cluster color palette (10 distinct colors for research clusters)
  const CLUSTER_COLORS = [
    '#FF6B6B', // Coral Red - Cluster 0
    '#4ECDC4', // Turquoise - Cluster 1
    '#45B7D1', // Sky Blue - Cluster 2
    '#96CEB4', // Sage Green - Cluster 3
    '#FFEAA7', // Soft Yellow - Cluster 4
    '#DFE6E9', // Light Gray - Cluster 5
    '#74B9FF', // Cornflower Blue - Cluster 6
    '#FD79A8', // Pink - Cluster 7
    '#A29BFE', // Lavender - Cluster 8
    '#FDCB6E'  // Amber - Cluster 9
  ];
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGraph);
  } else {
    initGraph();
  }
  
  function initGraph() {
    const container = document.getElementById('cy-graph');
    if (!container) return;
    
    // Fetch PhD network data
    fetch('/assets/data/phd_network_cytoscape.json')
      .then(r => r.json())
      .then(data => {
        // Extract elements and metadata
        const elements = data.elements;
        const metadata = data.metadata;
        
        // Scale up positions for better spacing (multiply by large factor)
        elements.nodes.forEach(node => {
          if (node.data.x !== undefined && node.data.y !== undefined) {
            node.position = {
              x: node.data.x * 500,  // Scale from normalized to larger space
              y: node.data.y * 500
            };
          }
        });
        
        // Store metadata globally for legend
        window.phdNetworkMetadata = metadata;
        
        // Create legend
        createClusterLegend(metadata.cluster_names);
        
        // Initialize Cytoscape
        const cy = cytoscape({
          container: container,
          
          elements: elements,
          
          style: [
            // Base node style - colored by cluster
            {
              selector: 'node',
              style: {
                'background-color': function(ele) {
                  const cluster = ele.data('cluster');
                  return CLUSTER_COLORS[cluster] || '#999';
                },
                'border-width': 2,
                'border-color': '#ffffff',
                'border-opacity': 0.8,
                'width': 30,
                'height': 30,
                'shape': 'ellipse',
                'label': '',  // Hide labels by default for performance
                'overlay-opacity': 0,
                'transition-property': 'background-color, border-color, width, height',
                'transition-duration': '0.2s'
              }
            },
            // Highlighted/selected nodes
            {
              selector: 'node:selected',
              style: {
                'border-width': 4,
                'border-color': '#333',
                'width': 40,
                'height': 40,
                'z-index': 999
              }
            },
            // Hovered nodes
            {
              selector: 'node:active',
              style: {
                'overlay-opacity': 0.2,
                'overlay-color': '#000'
              }
            },
            // Base edge style - styled by weight
            {
              selector: 'edge',
              style: {
                'width': function(ele) {
                  const weight = ele.data('weight') || 0.1;
                  return Math.max(0.5, weight * 3); // Scale: 0.5-3px
                },
                'opacity': function(ele) {
                  const weight = ele.data('weight') || 0.1;
                  return Math.max(0.2, weight * 0.8); // Scale: 0.2-0.8
                },
                'line-color': '#999',
                'curve-style': 'haystack', // Faster rendering for many edges
                'line-cap': 'round'
              }
            },
            // Highlighted edges
            {
              selector: 'edge:selected',
              style: {
                'line-color': '#333',
                'opacity': 0.8,
                'width': 3,
                'z-index': 998
              }
            },
            // Edge hover state
            {
              selector: 'edge:active',
              style: {
                'overlay-opacity': 0.2,
                'overlay-color': '#000'
              }
            }
          ],
          
          layout: {
            name: 'preset', // Start with pre-computed positions
            padding: 50,
            animate: false
          },
          
          // Interaction options - enable for large graph
          userZoomingEnabled: true,
          userPanningEnabled: true,
          boxSelectionEnabled: true,
          minZoom: 0.1,
          maxZoom: 3,
          wheelSensitivity: 0.2,
          
          // Performance optimizations
          textureOnViewport: true,
          motionBlur: false,
          hideEdgesOnViewport: false,
          pixelRatio: 'auto'
        });
        
        // Store cy instance globally
        window.cy = cy;
        
        // Initial view - fit to viewport
        cy.fit(null, 50);
        
        // Setup edge weight filtering
        setupEdgeFilter(cy);
        
        // Setup node label toggle
        setupLabelToggle(cy);
        
        // Click handler - show detailed info (no navigation for PhD network)
        cy.on('tap', 'node', function(evt) {
          const node = evt.target;
          // Deselect all other nodes
          cy.nodes().unselect();
          // Select clicked node
          node.select();
          
          // Show connected edges
          const connectedEdges = node.connectedEdges();
          cy.edges().style('opacity', 0.1);
          connectedEdges.style('opacity', function(ele) {
            const weight = ele.data('weight') || 0.1;
            return Math.max(0.3, weight * 0.9);
          });
        });
        
        // Click on background to deselect
        cy.on('tap', function(evt) {
          if (evt.target === cy) {
            cy.elements().unselect();
            // Reset edge visibility
            cy.edges().style('opacity', function(ele) {
              const weight = ele.data('weight') || 0.1;
              return Math.max(0.2, weight * 0.8);
            });
          }
        });
        
        // Hover popup functionality for PhD researchers
        const popup = document.getElementById('cy-popup');
        
        if (popup) {
          cy.on('mouseover', 'node', function(evt) {
            const node = evt.target;
            const name = node.data('name');
            const university = node.data('university');
            const topic = node.data('topic');
            const description = node.data('description');
            const clusterName = node.data('cluster_name');
            
            let content = `<div class="popup-header"><strong>${name || 'Researcher'}</strong></div>`;
            
            if (university) {
              content += `<div class="popup-university"><em>${university}</em></div>`;
            }
            
            if (clusterName) {
              content += `<div class="popup-cluster">🏷️ ${clusterName}</div>`;
            }
            
            if (topic) {
              content += `<div class="popup-topic"><strong>Topic:</strong> ${topic}</div>`;
            }
            
            if (description) {
              // Truncate long descriptions
              const shortDesc = description.length > 200 
                ? description.substring(0, 200) + '...' 
                : description;
              content += `<div class="popup-description">${shortDesc}</div>`;
            }
            
            content += `<div class="popup-hint">Click to highlight connections</div>`;
            
            popup.innerHTML = content;
            popup.style.display = 'block';
            
            // Position popup near node
            const renderedPos = node.renderedPosition();
            const pan = cy.pan();
            const zoom = cy.zoom();
            
            popup.style.left = (renderedPos.x + 40) + 'px';
            popup.style.top = (renderedPos.y - 20) + 'px';
          });
          
          cy.on('mouseout', 'node', function() {
            popup.style.display = 'none';
          });
          
          // Hide popup on pan/zoom
          cy.on('pan zoom', function() {
            popup.style.display = 'none';
          });
        }
        
        // Layout switcher with weight-aware force layout
        const layoutSelector = document.getElementById('layout-selector');
        if (layoutSelector) {
          layoutSelector.addEventListener('change', function(e) {
            const layoutName = e.target.value;
            
            // Layout configurations
            const layouts = {
              'preset': {
                name: 'preset',
                padding: 50,
                animate: false
              },
              'cose': {
                name: 'cose',
                animate: true,
                animationDuration: 5000,
                animationEasing: 'ease-out',
                padding: 100,
                boundingBox: { x1: 0, y1: 0, x2: 4000, y2: 4000 },
                nodeRepulsion: function(node) { return 8000000; },
                idealEdgeLength: function(edge) {
                  const weight = edge.data('weight') || 0.5;
                  // Much longer base edge length
                  return 500 * (2 - weight);
                },
                edgeElasticity: function(edge) {
                  const weight = edge.data('weight') || 0.5;
                  return Math.max(0.1, weight * 10);
                },
                gravity: 0.01,
                numIter: 10000,
                initialTemp: 2000,
                coolingFactor: 0.995,
                minTemp: 1.0,
                nodeOverlap: 100,
                refresh: 20,
                fit: false,
                randomize: true,
                componentSpacing: 400,
                nestingFactor: 1.2,
                avoidOverlap: true
              },
              'circle': {
                name: 'circle',
                animate: true,
                animationDuration: 1000,
                padding: 50,
                sort: function(a, b) {
                  return a.data('cluster') - b.data('cluster');
                }
              },
              'concentric': {
                name: 'concentric',
                animate: true,
                animationDuration: 1000,
                padding: 50,
                concentric: function(node) {
                  return node.degree();
                },
                levelWidth: function() {
                  return 3;
                },
                minNodeSpacing: 50
              }
            };
            
            const layout = cy.layout(layouts[layoutName] || layouts['preset']);
            layout.run();
            
            // Fit to viewport after layout completes
            if (layouts[layoutName] && layouts[layoutName].animate) {
              setTimeout(function() {
                cy.fit(null, 100);
              }, layouts[layoutName].animationDuration || 1000);
            }
          });
        }
        
        // Add fit button handler
        const fitButton = document.getElementById('btn-fit');
        if (fitButton) {
          fitButton.addEventListener('click', function() {
            cy.fit(null, 50);
          });
        }
        
        // Add reset button handler
        const resetButton = document.getElementById('btn-reset');
        if (resetButton) {
          resetButton.addEventListener('click', function() {
            cy.zoom(1);
            cy.center();
          });
        }
      })
      .catch(error => {
        console.error('Error loading PhD network data:', error);
        container.innerHTML = '<p style="text-align: center; padding: 2rem;">Error loading network graph. Please try again later.</p>';
      });
  }
  
  // Create cluster legend
  function createClusterLegend(clusterNames) {
    const legendContainer = document.getElementById('cluster-legend');
    if (!legendContainer) return;
    
    let html = '<div class="legend-title">Research Clusters</div><div class="legend-items">';
    
    const CLUSTER_COLORS = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DFE6E9', '#74B9FF', '#FD79A8', '#A29BFE', '#FDCB6E'
    ];
    
    for (let i = 0; i < 10; i++) {
      const name = clusterNames[i.toString()] || `Cluster ${i}`;
      html += `
        <div class="legend-item" data-cluster="${i}">
          <span class="legend-color" style="background-color: ${CLUSTER_COLORS[i]}"></span>
          <span class="legend-label">${name}</span>
        </div>
      `;
    }
    
    html += '</div>';
    legendContainer.innerHTML = html;
    
    // Add click handlers for cluster filtering
    document.querySelectorAll('.legend-item').forEach(item => {
      item.addEventListener('click', function() {
        const cluster = parseInt(this.getAttribute('data-cluster'));
        filterByCluster(cluster, this);
      });
    });
  }
  
  // Filter graph by cluster
  let activeCluster = null;
  function filterByCluster(cluster, legendItem) {
    const cy = window.cy;
    if (!cy) return;
    
    // Toggle cluster filter
    if (activeCluster === cluster) {
      // Reset filter
      cy.nodes().style('opacity', 1);
      cy.edges().style('opacity', function(ele) {
        const weight = ele.data('weight') || 0.1;
        return Math.max(0.2, weight * 0.8);
      });
      activeCluster = null;
      document.querySelectorAll('.legend-item').forEach(item => {
        item.classList.remove('active');
      });
    } else {
      // Apply filter
      cy.nodes().style('opacity', function(ele) {
        return ele.data('cluster') === cluster ? 1 : 0.15;
      });
      
      cy.edges().style('opacity', function(ele) {
        const source = ele.source();
        const target = ele.target();
        if (source.data('cluster') === cluster || target.data('cluster') === cluster) {
          const weight = ele.data('weight') || 0.1;
          return Math.max(0.3, weight * 0.9);
        }
        return 0.05;
      });
      
      activeCluster = cluster;
      document.querySelectorAll('.legend-item').forEach(item => {
        item.classList.remove('active');
      });
      legendItem.classList.add('active');
    }
  }
  
  // Setup edge weight filter
  function setupEdgeFilter(cy) {
    const slider = document.getElementById('edge-weight-slider');
    const display = document.getElementById('edge-weight-value');
    
    if (!slider) return;
    
    slider.addEventListener('input', function() {
      const threshold = parseFloat(this.value);
      if (display) display.textContent = threshold.toFixed(2);
      
      cy.edges().style('display', function(ele) {
        const weight = ele.data('weight') || 0;
        return weight >= threshold ? 'element' : 'none';
      });
    });
  }
  
  // Setup node label toggle
  function setupLabelToggle(cy) {
    const toggle = document.getElementById('toggle-labels');
    if (!toggle) return;
    
    let labelsVisible = false;
    
    toggle.addEventListener('click', function() {
      labelsVisible = !labelsVisible;
      
      if (labelsVisible) {
        cy.nodes().forEach(function(node) {
          node.style({
            'label': node.data('name'),
            'font-size': '10px',
            'color': '#333',
            'text-outline-color': '#fff',
            'text-outline-width': 1.5,
            'text-valign': 'bottom',
            'text-margin-y': 3
          });
        });
        this.textContent = 'Hide Labels';
        this.classList.add('active');
      } else {
        cy.nodes().style('label', '');
        this.textContent = 'Show Labels';
        this.classList.remove('active');
      }
    });
  }
})();
