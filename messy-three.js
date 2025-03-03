// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>3D Ondulato</title>
//   <style>
//     body { margin: 0; overflow: hidden; }
//     canvas { display: block; }
//   </style>
// </head>
// <body>
//   <script type="importmap">
//     {
//       "imports": {
//         "three": "https://unpkg.com/three/build/three.module.js"
//       }
//     }
//   </script>
//   <script type="module">
//     import * as THREE from 'three';

//     // Configurazione di base
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     // Colori
//     scene.background = new THREE.Color(0x000000); // Sfondo nero

//     // Creazione della griglia di pallini
//     const points = [];
//     const geometry = new THREE.BufferGeometry();
//     const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });

//     const gridSize = 200; // Dimensione della griglia (200x200)
//     const spacing = 0.2; // Spaziatura tra i punti

//     for (let x = 0; x < gridSize; x++) {
//       for (let z = 0; z < gridSize; z++) {
//         const y = Math.sin(x * 0.2) * Math.cos(z * 0.2); // Funzione per l'ondulazione
//         points.push((x - gridSize / 2) * spacing, y, (z - gridSize / 2) * spacing);
//       }
//     }

//     geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
//     const pointCloud = new THREE.Points(geometry, material);
//     scene.add(pointCloud);

//     // Aggiungi un orizzonte (sfera di sfondo)
//     const horizonGeometry = new THREE.SphereGeometry(800, 10, 10);
//     const horizonMaterial = new THREE.MeshBasicMaterial({ color: 0x333333, side: THREE.BackSide });
//     const horizon = new THREE.Mesh(horizonGeometry, horizonMaterial);
//     scene.add(horizon);

//     // Posizione della camera
//     camera.position.set(10, 2, 12);
//     camera.lookAt(0, 0, 0);

//     // Variabili per il movimento
//     let speed = 0.05; // Velocità di scorrimento automatica

//     // Animazione
//     function animate() {
//       requestAnimationFrame(animate);

//       // Muovi i punti lungo l'asse Z
//       const positions = pointCloud.geometry.attributes.position.array;
//       for (let i = 2; i < positions.length; i += 3) {
//         positions[i] += speed; // Muovi lungo l'asse Z

//         // Rigenera i punti quando escono dalla vista
//         if (positions[i] > gridSize / 2 * spacing) {
//           positions[i] = -gridSize / 2 * spacing;
//         }
//       }

//       // Aggiorna la geometria
//       pointCloud.geometry.attributes.position.needsUpdate = true;

//       // Renderizza la scena
//       renderer.render(scene, camera);
//     }

//     animate();

//     // Ridimensionamento della finestra
//     window.addEventListener('resize', () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     });
//   </script>
// </body>
// </html>		