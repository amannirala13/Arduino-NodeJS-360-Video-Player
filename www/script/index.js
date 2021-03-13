//---- Comment this section in the generate JS code----
/*import * as THREE from "./three.js";
import { SockJS } from "./sockjs.min.js";*/
//-----------------------------------------------------
let gyroData = [];
const videoPlayer = document.getElementById('video_player');
const videoPlayerContainer = document.getElementById('video_player_container');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
const scene = new THREE.Scene();
const geometry = new THREE.SphereGeometry(500, 60, 40);
geometry.scale(-1, 1, 1);
const texture = new THREE.VideoTexture(videoPlayer);
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
videoPlayerContainer.appendChild(renderer.domElement);
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
function animate() {
    requestAnimationFrame(animate);
    update();
}
function update() {
    if (gyroData[1] > 500 && mesh.rotation.x < Math.PI / 2)
        mesh.rotation.x += 0.05;
    if (gyroData[1] < -500 && mesh.rotation.x > -Math.PI / 2)
        mesh.rotation.x -= 0.05;
    if (gyroData[0] > 500)
        mesh.rotation.y -= 0.05;
    if (gyroData[0] < -500)
        mesh.rotation.y += 0.05;
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
    let raw = e.data.split(',');
    for (let data of raw) {
        gyroData.push(Number(data));
    }
    console.log(gyroData);
};
sock.onclose = () => {
    console.log("Connection to backend closed!");
};
//it all starts here!!!!
animate();
