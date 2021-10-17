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

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
  const colors = [
    '#9CA3AF',
    '#34D399',
    '#60A5FA',
    '#F472B6',
    '#FBBF24',
    '#F87171',
    '#8B5CF6',
  ];

  const random = Math.floor(Math.random() * colors.length);
  return colors[random];
}
