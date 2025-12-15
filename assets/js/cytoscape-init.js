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
          
          // Display detailed information in popup
          const popup = document.getElementById('cy-popup');
          if (popup) {
            const name = node.data('name');
            const university = node.data('university');
            const topic = node.data('topic');
            const description = node.data('description');
            const clusterName = node.data('cluster_name');
            const cluster = node.data('cluster');
            const clusterColor = CLUSTER_COLORS[cluster] || '#999';
            
            // Hide popup
            const popup = document.getElementById('cy-popup');
            if (popup) {
              popup.style.display = 'none';
              popup.style.position = 'absolute';
              popup.style.transform = 'none';
            }
            
            let content = `<div class="popup-header"><strong>${name || 'Researcher'}</strong></div>`;
            
            if (university) {
              content += `<div class="popup-university">🏛️ <em>${university}</em></div>`;
            }
            
            if (clusterName) {
              content += `<div class="popup-cluster" style="background-color: ${clusterColor}20; border-left: 4px solid ${clusterColor}">
                🏷️ ${clusterName}
              </div>`;
            }
            
            if (topic) {
              content += `<div class="popup-topic"><strong>Research Topic:</strong><br>${topic}</div>`;
            }
            
            if (description) {
              content += `<div class="popup-description"><strong>Description:</strong><br>${description}</div>`;
            }
            
            // Show connection count
            const degree = node.degree();
            content += `<div class="popup-stats">📊 ${degree} research connections</div>`;
            
            content += `<div class="popup-hint">Click background to close • Hover other nodes for quick preview</div>`;
            
            popup.innerHTML = content;
            popup.style.display = 'block';
            popup.style.position = 'fixed';
            popup.style.maxWidth = '500px';
            popup.style.maxHeight = '80vh';
            popup.style.overflowY = 'auto';
            popup.style.top = '50%';
            popup.style.left = '50%';
            popup.style.transform = 'translate(-50%, -50%)';
            popup.style.zIndex = '10000';
          }
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
            
            // Hide popup
            const popup = document.getElementById('cy-popup');
            if (popup) {
              popup.style.display = 'none';
              popup.style.position = 'absolute';
              popup.style.transform = 'none';
            }
          }
        });
        
        // Hover popup functionality for PhD researchers (quick preview)
        const popup = document.getElementById('cy-popup');
        
        if (popup) {
          cy.on('mouseover', 'node', function(evt) {
            // Only show hover preview if no node is currently selected
            if (cy.$(':selected').length > 0) return;
            
            const node = evt.target;
            const name = node.data('name');
            const university = node.data('university');
            const topic = node.data('topic');
            const clusterName = node.data('cluster_name');
            const cluster = node.data('cluster');
            const clusterColor = CLUSTER_COLORS[cluster] || '#999';
            
            let content = `<div class="popup-header"><strong>${name || 'Researcher'}</strong></div>`;
            
            if (university) {
              content += `<div class="popup-university"><em>${university}</em></div>`;
            }
            
            if (clusterName) {
              content += `<div class="popup-cluster" style="background-color: ${clusterColor}20; border-left: 4px solid ${clusterColor}">
                🏷️ ${clusterName}
              </div>`;
            }
            
            if (topic) {
              const shortTopic = topic.length > 100 ? topic.substring(0, 100) + '...' : topic;
              content += `<div class="popup-topic"><strong>Topic:</strong> ${shortTopic}</div>`;
            }
            
            content += `<div class="popup-hint">Click for full details</div>`;
            
            popup.innerHTML = content;
            popup.style.display = 'block';
            popup.style.position = 'absolute';
            popup.style.maxWidth = '300px';
            popup.style.maxHeight = 'none';
            popup.style.transform = 'none';
            
            // Position popup near node
            const renderedPos = node.renderedPosition();
            const pan = cy.pan();
            const zoom = cy.zoom();
            
            popup.style.left = (renderedPos.x + 40) + 'px';
            popup.style.top = (renderedPos.y - 20) + 'px';
          });
          
          cy.on('mouseout', 'node', function() {
            // Only hide on mouseout if no node is selected
            if (cy.$(':selected').length === 0) {
              popup.style.display = 'none';
            }
          });
          
          // Hide hover popup on pan/zoom
          cy.on('pan zoom', function() {
            if (cy.$(':selected').length === 0) {
              popup.style.display = 'none';
            }
          });
        }
        
        // Layout switcher with weight-aware force layout
        const layoutSelector = document.getElementById('layout-selector');
        if (layoutSelector) {
          layoutSelector.addEventListener('change', function(e) {
            const layoutName = e.target.value;
            
            // Show/hide force controls
            const forceControls = document.getElementById('force-controls');
            if (forceControls) {
              forceControls.style.display = layoutName === 'cose' ? 'block' : 'none';
            }
            
            runLayout(layoutName);
          });
        }
        
        // Setup force layout parameter controls
        setupForceControls(cy);
        
        // Function to run layout
        function runLayout(layoutName) {
          // Layout configurations
          const layouts = {
            'preset': {
              name: 'preset',
              padding: 50,
              animate: false
            },
            'cose': getForceLayoutConfig(),
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
  
  // Get force layout configuration from sliders
  function getForceLayoutConfig() {
    const nodeRepulsion = parseFloat(document.getElementById('node-repulsion')?.value || 8192);
    const edgeLength = parseFloat(document.getElementById('edge-length')?.value || 150);
    const edgeElasticity = parseFloat(document.getElementById('edge-elasticity')?.value || 100);
    const gravity = parseFloat(document.getElementById('gravity')?.value || 1.0);
    const numIter = parseInt(document.getElementById('num-iter')?.value || 2500);
    
    return {
      name: 'cose',
      animate: true,
      animationDuration: 3000,
      animationEasing: 'ease-out',
      padding: 50,
      nodeRepulsion: function(node) { return nodeRepulsion; },
      idealEdgeLength: function(edge) {
        const weight = edge.data('weight') || 0.1;
        // Higher weight = shorter edge (stronger connections pull nodes closer)
        // weight 1.0 -> edgeLength * 0.3, weight 0.0 -> edgeLength * 1.5
        return edgeLength * (1.5 - weight * 1.2);
      },
      edgeElasticity: function(edge) {
        const weight = edge.data('weight') || 0.1;
        // Higher weight = higher elasticity (stronger spring force)
        // Use squared weight for more pronounced effect
        return Math.pow(weight, 1.5) * edgeElasticity;
      },
      gravity: gravity,
      numIter: numIter,
      initialTemp: 200,
      coolingFactor: 0.95,
      minTemp: 1.0,
      refresh: 20,
      fit: true,
      randomize: true,
      avoidOverlap: true
    };
  }
  
  // Setup force layout parameter controls
  function setupForceControls(cy) {
    // Update display values when sliders change
    const sliders = [
      { id: 'node-repulsion', displayId: 'node-repulsion-value', format: v => Math.round(v) },
      { id: 'edge-length', displayId: 'edge-length-value', format: v => Math.round(v) },
      { id: 'edge-elasticity', displayId: 'edge-elasticity-value', format: v => Math.round(v) },
      { id: 'gravity', displayId: 'gravity-value', format: v => v.toFixed(1) },
      { id: 'num-iter', displayId: 'num-iter-value', format: v => Math.round(v) }
    ];
    
    sliders.forEach(slider => {
      const element = document.getElementById(slider.id);
      const display = document.getElementById(slider.displayId);
      
      if (element && display) {
        element.addEventListener('input', function() {
          display.textContent = slider.format(parseFloat(this.value));
        });
      }
    });
    
    // Apply layout button
    const applyButton = document.getElementById('apply-force-layout');
    if (applyButton) {
      applyButton.addEventListener('click', function() {
        const layout = cy.layout(getForceLayoutConfig());
        layout.run();
        setTimeout(function() {
          cy.fit(null, 100);
        }, 3000);
      });
    }
    
    // Reset parameters button
    const resetButton = document.getElementById('reset-force-params');
    if (resetButton) {
      resetButton.addEventListener('click', function() {
        document.getElementById('node-repulsion').value = 8192;
        document.getElementById('node-repulsion-value').textContent = '8192';
        document.getElementById('edge-length').value = 150;
        document.getElementById('edge-length-value').textContent = '150';
        document.getElementById('edge-elasticity').value = 100;
        document.getElementById('edge-elasticity-value').textContent = '100';
        document.getElementById('gravity').value = 1.0;
        document.getElementById('gravity-value').textContent = '1.0';
        document.getElementById('num-iter').value = 2500;
        document.getElementById('num-iter-value').textContent = '2500';
      });
    }
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
