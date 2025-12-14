// Cytoscape.js Network Graph Initialization
(function() {
  'use strict';
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGraph);
  } else {
    initGraph();
  }
  
  function initGraph() {
    const container = document.getElementById('cy-graph');
    if (!container) return;
    
    // Fetch graph data
    fetch('/assets/data/graph.json')
      .then(response => response.json())
      .then(graphData => {
        // Initialize Cytoscape
        const cy = cytoscape({
          container: container,
          
          elements: graphData,
          
          style: [
            {
              selector: 'node',
              style: {
                'background-color': '#2d5016',
                'background-image': function(ele) {
                  const photo = ele.data('photo');
                  return photo && photo.trim() !== '' ? photo : null;
                },
                'background-fit': 'cover',
                'background-clip': 'none',
                'border-width': 3,
                'border-color': '#6b8e4e',
                'label': 'data(name)',
                'color': '#333',
                'text-outline-color': '#fff',
                'text-outline-width': 2,
                'font-size': '14px',
                'font-weight': 'bold',
                'text-valign': 'bottom',
                'text-margin-y': 5,
                'width': 60,
                'height': 60
              }
            },
            {
              selector: 'edge',
              style: {
                'width': 2,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
                'label': 'data(label)',
                'font-size': '10px',
                'text-rotation': 'autorotate',
                'text-margin-y': -10,
                'color': '#666'
              }
            }
          ],
          
          layout: {
            name: 'cose',
            animate: true,
            animationDuration: 1000,
            padding: 50,
            nodeRepulsion: 8000,
            idealEdgeLength: 100,
            edgeElasticity: 100,
            nestingFactor: 5,
            gravity: 80,
            numIter: 1000,
            randomize: false
          },
          
          // Interaction options
          minZoom: 0.5,
          maxZoom: 3
        });
        
        // Store cy instance globally for layout switcher
        window.cy = cy;
        
        // Click handler - navigate to team member page
        cy.on('tap', 'node', function(evt) {
          const node = evt.target;
          const url = node.data('url');
          if (url) {
            window.location.href = url;
          }
        });
        
        // Hover popup functionality
        const popup = document.getElementById('cy-popup');
        if (popup) {
          cy.on('mouseover', 'node', function(evt) {
            const node = evt.target;
            const name = node.data('name');
            const role = node.data('role');
            const bio = node.data('bio');
            
            popup.innerHTML = `
              <div class="popup-header">
                <strong>${name}</strong>
              </div>
              <div class="popup-role">${role}</div>
              <div class="popup-bio">${bio}</div>
              <div class="popup-hint">Click to view profile</div>
            `;
            
            popup.style.display = 'block';
            
            // Position popup near cursor
            const renderedPos = node.renderedPosition();
            popup.style.left = (renderedPos.x + 40) + 'px';
            popup.style.top = (renderedPos.y - 20) + 'px';
          });
          
          cy.on('mouseout', 'node', function() {
            popup.style.display = 'none';
          });
          
          // Hide popup when panning/zooming
          cy.on('pan zoom', function() {
            popup.style.display = 'none';
          });
        }
        
        // Layout switcher
        const layoutSelector = document.getElementById('layout-selector');
        if (layoutSelector) {
          layoutSelector.addEventListener('change', function(e) {
            const layoutName = e.target.value;
            
            // Layout configurations
            const layouts = {
              'cose': {
                name: 'cose',
                animate: true,
                animationDuration: 1000,
                nodeRepulsion: 8000,
                idealEdgeLength: 100
              },
              'circle': {
                name: 'circle',
                animate: true,
                animationDuration: 500,
                padding: 50
              },
              'grid': {
                name: 'grid',
                animate: true,
                animationDuration: 500,
                padding: 50,
                rows: undefined,
                cols: undefined
              },
              'concentric': {
                name: 'concentric',
                animate: true,
                animationDuration: 500,
                padding: 50,
                concentric: function(node) {
                  return node.degree();
                },
                levelWidth: function() {
                  return 2;
                }
              },
              'breadthfirst': {
                name: 'breadthfirst',
                animate: true,
                animationDuration: 500,
                padding: 50,
                directed: true,
                spacingFactor: 1.5
              }
            };
            
            const layout = cy.layout(layouts[layoutName]);
            layout.run();
          });
        }
        
        // Add zoom controls
        const zoomIn = document.getElementById('zoom-in');
        const zoomOut = document.getElementById('zoom-out');
        const zoomReset = document.getElementById('zoom-reset');
        
        if (zoomIn) {
          zoomIn.addEventListener('click', function() {
            cy.zoom(cy.zoom() * 1.2);
            cy.center();
          });
        }
        
        if (zoomOut) {
          zoomOut.addEventListener('click', function() {
            cy.zoom(cy.zoom() * 0.8);
            cy.center();
          });
        }
        
        if (zoomReset) {
          zoomReset.addEventListener('click', function() {
            cy.fit();
            cy.zoom(1);
          });
        }
      })
      .catch(error => {
        console.error('Error loading graph data:', error);
        container.innerHTML = '<p style="text-align: center; padding: 2rem;">Error loading network graph. Please try again later.</p>';
      });
  }
})();
