//---- Comment or Remove this section in the generate JS code----
import * as THREE from "./three.js";
import { SockJS } from "./sockjs.min.js";
//---------------------------------------------------------------

// Defining number array for storing axis data from arduino
let gyroData: number[] = [];

// Storing video player dom element object in videoPlayer
const videoPlayer = document.getElementById("video_player")![0]; // Remove [0] from the generated JS script
// Storing div dom element containing the video player in videoPlayerContainer
const videoPlayerContainer = document.getElementById(
  "video_player_container"
)![0]; // Remove [0] from the generated JS script

// Creating a THREE.js camera object.
// This object is the eye of our web app.The object(s) that will fall in the perspective view of the camera
// object will be rendered on the screen
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1100
);
// Creating a scene. It is the space aka canvas in which we will add all our components
const scene = new THREE.Scene();

// Creating a sphere geometry. A 360 degree video is a video in which frames captured from multiple cameras
// covering full 360 degree from the axis are merged to a long panorama. To make is 360 we need to
// bend this flat panorama into a 360 degree sphere.
const geometry = new THREE.SphereGeometry(500, 60, 40);
// Scaling the object to size 1 units
geometry.scale(-1, 1, 1);
// Creating a video texture. We will use this video as a texture material on the mesh created
// from the sphere geometry
const texture = new THREE.VideoTexture(videoPlayer);
// Assigning the texture to a material object
const material = new THREE.MeshBasicMaterial({ map: texture });
// Creating as mesh from the geometry and assigning the material with the video texture on it.
const mesh = new THREE.Mesh(geometry, material);
// Now we have bent the 360 degree video into a sphere.
// We can now render it and start moving it around for an amazing experience.
// Adding the mesh to the screen.
scene.add(mesh);

// Creating a WebGL renderer for rendering our 3d objects.
const renderer = new THREE.WebGLRenderer();
// Setting the pixel ratio to that of the screen.
renderer.setPixelRatio(window.devicePixelRatio);
// Spanning the size of the rendering area to that of the screen.
renderer.setSize(window.innerWidth, window.innerHeight);
// Adding the renderer object to the html div for display.
videoPlayerContainer.appendChild(renderer.domElement);

// Callback for event when the screen is resized
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  // When the screen size changes, the projecting matrix of the camera needs to be updated
  // depending upon the new dimensions of the screen
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Recursive function for animating the scene depending upon the input from the arduino
// via update() function
function animate() {
  requestAnimationFrame(animate);
  update();
}

// In this function we use the data from arduino to move the video accordingly.
// Important: "You might have to change this code depending upon the orientation
// of the ITG/MPU module in your build."
// To have a look at my build, goto the "Gallery" section in the Read.me file of this repository
function update() {
  if (gyroData[1] > 500 && mesh.rotation.x < Math.PI / 2)
    mesh.rotation.x += 0.05;
  if (gyroData[1] < -500 && mesh.rotation.x > -Math.PI / 2)
    mesh.rotation.x -= 0.05;
  if (gyroData[0] > 500) mesh.rotation.y -= 0.05;
  if (gyroData[0] < -500) mesh.rotation.y += 0.05;

  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
}

//socket connection from the server
let sock = new SockJS("http://127.0.0.1:3000/arduino");

sock.onopen = () => {
  console.log("Connection to backend open!");
};
sock.onmessage = (e) => {
  gyroData = [];
  let raw = e.data.split(",");
  for (let data of raw) {
    gyroData.push(Number(data));
  }
  console.log(gyroData);
};
sock.onclose = () => {
  console.log("Connection to backend closed!");
};

// Staring the service.
animate();