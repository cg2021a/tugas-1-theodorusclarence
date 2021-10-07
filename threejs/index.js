const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.x = 1;
camera.position.z = 5;

const dLight = new THREE.DirectionalLight(0xffffff, 1);
dLight.position.set(2, 0, 10);
const aLight = new THREE.AmbientLight(0xffffff, 1);
aLight.position.set(0, 0, 10);
const pLight = new THREE.PointLight(0xffffff, 1, 100);
pLight.position.set(20, 20, 20);
const hLight = new THREE.HemisphereLight(0xffffff, '#3B82F6', 0.8);
hLight.position.set(0, 10, 0);
const sLight = new THREE.SpotLight(0xffffff, 1, 50);
sLight.position.set(5, 10, 10);

const lights = [dLight, aLight, pLight, hLight, sLight];
addObjects(scene, lights);

lights.forEach((light) => {
  light.visible = false;
});
lights[0].visible = true;

const selectedLight = document.getElementById('light');
selectedLight.addEventListener('change', (e) => {
  const selected = e.target.value;
  lights.forEach((light) => {
    light.visible = false;
  });
  lights[selected].visible = true;
});

//#region  //*=========== OBJECTS ===========
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube.position.x = -1;

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 32, 32),
  new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true,
  })
);
sphere.position.x = -3;

const cone = new THREE.Mesh(
  new THREE.ConeGeometry(0.5, 1, 32),
  new THREE.MeshPhysicalMaterial({
    color: '#93C5FD',
    flatShading: true,
  })
);
cone.position.x = 3;

const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(0.5, 0.5, 1, 16),
  new THREE.MeshLambertMaterial({ color: '#F9A8D4' })
);
cylinder.position.x = 1;

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.5, 0.2, 16, 100),
  new THREE.MeshPhysicalMaterial({
    color: '#FEF3C7',
    flatShading: true,
  })
);
torus.position.y = -2;

const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16),
  new THREE.MeshPhongMaterial({
    color: '#F9A8D4',
  })
);
torusKnot.position.y = 2;
//#endregion  //*======== OBJECTS ===========

const objects = [cube, sphere, torus, cylinder, cone, torusKnot];
addObjects(scene, objects);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let torusSpeed = 0.1;
(function mainLoop() {
  objects.forEach((obj) => {
    obj.rotation.x += 0.01;
    obj.rotation.y += 0.01;
  });

  const currentPos = torus.position.x;
  if (currentPos >= 5 || currentPos <= -3) torusSpeed = -torusSpeed;
  torus.position.x += torusSpeed;
  torusKnot.position.x += torusSpeed;

  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
})();
