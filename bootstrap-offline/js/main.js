import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x18223C);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.getElementById("container3D").appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(-12, 4, 11);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.enableZoom = false;
controls.target = new THREE.Vector3(0, 1, 0);

controls.update();






const spotLight = new THREE.SpotLight(0xffffff, 3000, 100, 0.22, 1);
spotLight.position.set(0, 25, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);

const loader = new GLTFLoader().setPath('portal/');

loader.load('scene.gltf', (gltf) => {
    console.log('loading model');
    const mesh = gltf.scene;
    
    
    
    mesh.position.set(0, 1.05, -1);
    scene.add(mesh);
});



const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}



//functions to make the portal partly transparent on hover

/* function hoverportal () {
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  for (let i = 0; i < intersects.length; i++) {
    intersects[i].object.material.transparent = true;
    intersects[i].object.material.opacity = 0.5;
   

  }
  renderer.render(scene,camera);
}

function resetMaterials() {
  for (let i = 0; i < scene.children.length; i++) {
  if (scene.children[i].material) {
    scene.children[i].material.opacity = 1.0
    } 

  }

}
*/
function onClick(event) {
  raycaster.setFromCamera(pointer, camera);
  let intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0 ) {
    
    window.location.href = 'https://ole.saintkentigern.com/';
  }

}



window.addEventListener( 'pointermove', onPointerMove );
window.addEventListener( 'click', onClick);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    // resetMaterials();

    // hoverportal();
    renderer.render(scene, camera);
  }
  
  animate();