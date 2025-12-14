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
    
    // Fetch both graph structure and team data
    Promise.all([
      fetch('/assets/data/graph.json').then(r => r.json()),
      fetch('/assets/data/team-data.json').then(r => r.json())
    ])
      .then(([graphData, teamData]) => {
        // Create a lookup map for team data by ID
        const teamMap = {};
        teamData.team.forEach(member => {
          teamMap[member.id] = member;
        });
        
        // Enrich graph nodes with team data
        graphData.nodes.forEach(node => {
          const teamInfo = teamMap[node.data.id];
          if (teamInfo) {
            // Merge team data into node data, team data takes precedence
            node.data = {
              ...node.data,
              name: teamInfo.name,
              url: teamInfo.url,
              photo: teamInfo.image,
              role: teamInfo.role,
              bio: teamInfo.bio
            };
          }
        });
        
        // Initialize Cytoscape
        const cy = cytoscape({
          container: container,
          
          elements: graphData,
          
          style: [
            {
              selector: 'node[photo]',
              style: {
                'background-color': '#2d5016',
                'background-image': 'data(photo)',
                'background-fit': 'cover',
                'background-clip': 'node',
                'border-width': 3,
                'border-color': '#6b8e4e',
                'width': 60,
                'height': 60,
                'shape': 'ellipse'
              }
            },
            {
              selector: 'node[!photo]',
              style: {
                'background-color': '#2d5016',
                'border-width': 3,
                'border-color': '#6b8e4e',
                'width': 60,
                'height': 60,
                'shape': 'ellipse'
              }
            },
            {
              selector: 'node[name]',
              style: {
                'label': 'data(name)',
                'color': '#333',
                'text-outline-color': '#fff',
                'text-outline-width': 2,
                'font-size': '14px',
                'font-weight': 'bold',
                'text-valign': 'bottom',
                'text-margin-y': 5
              }
            },
            {
              selector: 'node[!name]',
              style: {
                'label': 'data(id)',
                'color': '#666',
                'text-outline-color': '#fff',
                'text-outline-width': 2,
                'font-size': '12px',
                'font-weight': 'normal',
                'text-valign': 'bottom',
                'text-margin-y': 5
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
          userZoomingEnabled: false,
          userPanningEnabled: false,
          boxSelectionEnabled: false
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
        console.log('Popup element found:', popup);
        
        if (popup) {
          cy.on('mouseover', 'node', function(evt) {
            const node = evt.target;
            const name = node.data('name') || node.data('id');
            const role = node.data('role');
            const bio = node.data('bio');
            
            console.log('Node hover:', { name, role, bio });
            
            // Only show popup if there's meaningful data
            if (!name && !role && !bio) {
              console.log('No data to show in popup');
              return;
            }
            
            let content = `<div class="popup-header"><strong>${name}</strong></div>`;
            if (role) content += `<div class="popup-role">${role}</div>`;
            if (bio) content += `<div class="popup-bio">${bio}</div>`;
            if (node.data('url')) content += `<div class="popup-hint">Click to view profile</div>`;
            
            popup.innerHTML = content;
            popup.style.display = 'block';
            
            // Position popup near node (relative to container)
            const renderedPos = node.renderedPosition();
            console.log('Rendered position:', renderedPos);
            popup.style.left = (renderedPos.x + 40) + 'px';
            popup.style.top = (renderedPos.y - 20) + 'px';
          });
          
          cy.on('mouseout', 'node', function() {
            console.log('Node mouseout');
            popup.style.display = 'none';
          });
        } else {
          console.error('Popup element #cy-popup not found!');
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
      })
      .catch(error => {
        console.error('Error loading graph data:', error);
        container.innerHTML = '<p style="text-align: center; padding: 2rem;">Error loading network graph. Please try again later.</p>';
      });
  }
})();
