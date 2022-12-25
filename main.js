import './style.css'
import * as THREE from 'three';
import space from '/deep_space.webp';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


camera.position.setZ(30);


const gltfLoader = new GLTFLoader();
//loading astronaut 
let loadedAstronautModel;

gltfLoader.load('/astronaut_model/scene.gltf', (astronaut) => {
  loadedAstronautModel = astronaut;
  astronaut.scene.rotation.y = 5;
  astronaut.scene.position.x = 12;
  astronaut.scene.position.y = -10;
  astronaut.scene.position.z = -25;
  astronaut.scene.scale.set(5, 5, 5)
  scene.add( astronaut.scene );
})

//loading comet
let loadedCometModel;

gltfLoader.load('/space_comet/scene.gltf', (comet) => {
  loadedCometModel = comet;
  comet.scene.position.x = -10;
  comet.scene.position.y = 1;
  comet.scene.position.z = 0;
  comet.scene.scale.set(0.035, 0.035, 0.035)
  scene.add( comet.scene );
})
//loading ufo
let loadedUfoModel;

gltfLoader.load('/ufo_low_poly/scene.gltf', (ufo) => {
  loadedUfoModel = ufo;
  ufo.scene.position.x = -7;
  ufo.scene.position.y = -2;
  ufo.scene.position.z = 30;
  ufo.scene.scale.set(3, 3, 3)
  scene.add( ufo.scene );
})
//loading mooncake
let loadedMooncakeModel;

gltfLoader.load('/mooncake/scene.gltf', (mooncake) => {
  loadedMooncakeModel = mooncake;
  mooncake.scene.position.x = 10;
  mooncake.scene.position.y = -7;
  mooncake.scene.position.z = 10;
  mooncake.scene.scale.set(4, 4, 4)
  scene.add( mooncake.scene );
})



const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);


scene.add( pointLight, ambientLight );

//const controls = new OrbitControls(camera, renderer.domElement)


// populating scene with random stars
const addStar = function() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);

}
// filling scene with stars
Array(200).fill().forEach(addStar)

//setting background
const spaceTexture = new THREE .TextureLoader().load(space);
scene.background = spaceTexture
//zoom out while scroll
const moveCamera = function() {
    const t = document.body.getBoundingClientRect().top;

    camera.position.z = t * -0.01;

}
document.body.onscroll = moveCamera;
moveCamera();

const animate = function() {
  requestAnimationFrame( animate );

  if(loadedAstronautModel) {
    loadedAstronautModel.scene.rotation.y += 0.005;
  }

  if(loadedCometModel) {
    loadedCometModel.scene.rotation.x += 0.005;
    loadedCometModel.scene.rotation.y += 0.005;
    loadedCometModel.scene.rotation.z += 0.005;
  }

  if(loadedUfoModel) {
    loadedUfoModel.scene.rotation.y += 0.01;
  }

  if(loadedMooncakeModel) {
    loadedMooncakeModel.scene.rotation.x += 0.01;
    //loadedMooncakeModel.scene.rotation.y += 0.005;
    //loadedMooncakeModel.scene.rotation.z += 0.005;
  }

  //controls.update();

  renderer.render(scene, camera);
}
animate();

