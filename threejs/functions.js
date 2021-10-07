function createObject(geometry, material) {
  return new THREE.Mesh(geometry, material);
}

/**
 *
 * @param {THREE.Scene} scene
 */
function addObjects(scene, arr) {
  arr.forEach((obj) => scene.add(obj));
}
