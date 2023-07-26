//turns a screen point into a canvas point
export function screenToCanvas(point, camera) {
  return {
    x: point.x / camera.z - camera.x,
    y: point.y / camera.z - camera.y,
  };
}

//turns a canvas point into a screen point
export function canvasToScreen(point, camera) {
  return {
    x: (point.x + camera.x) * camera.z,
    y: (point.y + camera.y) * camera.z,
  };
}

export function getViewport(camera, box) {
  const topLeft = screenToCanvas({ x: box.minX, y: box.minY }, camera);
  const bottomRight = screenToCanvas({ x: box.maxX, y: box.maxY }, camera);

  return {
    minX: topLeft.x,
    minY: topLeft.y,
    maxX: bottomRight.x,
    maxY: bottomRight.y,
    height: bottomRight.x - topLeft.x,
    width: bottomRight.y - topLeft.y,
  };
}

export const viewport = getViewport(camera, {
  minX: 0,
  minY: 0,
  maxX: window.innerWidth,
  maxY: window.innerHeight,
  width: window.innerWidth,
  height: window.innerHeight,
});

export function panCamera(camera, dx, dy) {
  return {
    x: camera.x - dx / camera.z,
    y: camera.y - dy / camera.z,
    z: camera.z,
  };
}

export function zoomCamera(camera, point, dz) {
  const zoom = camera.z - dz * camera.z;

  const p1 = screenToCanvas(point, camera);

  const p2 = screenToCanvas(point, { ...camera, z: zoom });

  return {
    x: camera.x + (p2.x - p1.x),
    y: camera.y + (p2.y - p1.y),
    z: zoom,
  };
}
