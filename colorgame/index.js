const scene = new THREE.Scene();
const objLeft = document.getElementById('obj');

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 5;

const dLight = new THREE.DirectionalLight(0xffffff, 1);
dLight.position.set(2, 0, 10);

let interval = 1000;
let objCount = 0;
const maxObj = 50;
function randomlyDrawSphere() {
  console.log(interval);
  if (objCount < maxObj) {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 32, 32),
      new THREE.MeshPhongMaterial({
        color: getRandomColor(),
      })
    );
    sphere.position.set(random(-5, 5), random(-2.5, 3), 0);
    sphere.rotation.set(random(Math.PI, Math.PI), random(Math.PI, Math.PI), 0);
    scene.add(sphere);

    objCount++;
    objLeft.innerText = objCount;
    interval = 1000 - objCount * 20;
  }
}
setInterval(randomlyDrawSphere, interval);

const objects = [dLight];
addObjects(scene, objects);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
mouse.x = mouse.y = -1;

function onMouseClick(e) {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  mouse.z = 1;

  raycaster.setFromCamera(mouse, camera);
}
document.addEventListener('click', onMouseClick);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let tempColorSave = null;
/** @type THREE.Object3D<THREE.Event> */
let pickedObj = null;
const score = document.getElementById('score');

(function mainLoop() {
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    const intersect = intersects[0];

    if (pickedObj) {
      // If the color is identical with temp, then remove
      if (
        pickedObj.material.color.getHex() ===
          intersect.object.material.color.getHex() &&
        pickedObj !== intersect.object
      ) {
        scene.remove(pickedObj);
        scene.remove(intersect.object);
        score.innerText = parseInt(score.innerText) + 1;
        objCount -= 2;

        pickedObj = null;
        objLeft.innerText = objCount;
        requestAnimationFrame(mainLoop);
        return;
      } else {
        // Reset Last Picked Object
        pickedObj.material.emissive.setHex(tempColorSave);
      }
    }

    // Save picked object and color
    pickedObj = intersect.object;
    tempColorSave = intersect.object.material.emissive.getHex();
    intersect.object.material.emissive.setHex(0x3f3f3f);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
})();
