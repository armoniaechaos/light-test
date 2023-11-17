import * as THREE from "three";

let container = document.getElementById("image-container");
let scene = new THREE.Scene();
// let camera = new THREE.PerspectiveCamera(
//   100,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   100
// );

let camera = new THREE.PerspectiveCamera(
  45, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  1, // Near plane
  1000 // Far plane
);
let renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

let textureLoader = new THREE.TextureLoader();
let depthData = textureLoader.load("/src/midas.png"); // Load your depth map

let material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  map: textureLoader.load("/src/23_Puglia8.JPG"), // Load your image
  displacementMap: depthData,
  displacementScale: 0
});

console.log(material);

let geometry = new THREE.PlaneBufferGeometry(1, 1);
let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.set(0, 0, 500); // x y z position of camera
camera.position.z = 1;

let light = new THREE.PointLight(0xffffff, 1);
light.position.set(50, 50, 50);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

container.addEventListener("mousemove", onMouseMove, false);

let vector = new THREE.Vector3();

function onMouseMove(event) {
  event.preventDefault();

  light.position.x = (event.clientX / window.innerWidth) * 500 - 250;
  light.position.y = (event.clientY / window.innerHeight) * 500 - 250;
}
