export default function findDeltas(length, angle, isRadians = false) {
  if (arguments.length === 0) {
    throw new TypeError(
      'Pass both a length and angle as arguments to findDeltas()',
    );
  }
  if (arguments.length === 1) {
    throw new TypeError('Path an angle as a second argument to findDeltas()');
  }
  if (typeof length !== 'number') {
    throw new TypeError(`${length} is not a number`);
  }
  if (typeof angle !== 'number') {
    throw new TypeError(`${angle} is not a number`);
  }
  if (typeof isRadians !== 'boolean') {
    throw new TypeError(`${isRadians} is not a boolean`);
  }
  let radians;
  let xMultiplier = 1;
  let yMultiplier = 1;
  if (isRadians) {
    radians = angle;
  } else {
    radians = (angle * Math.PI) / 180;
  }
  // Deal with really large angles
  radians %= Math.PI * 2;
  if (radians <= Math.PI * 0.5) {
    yMultiplier = -1;
  } else if (radians <= Math.PI) {
    radians = Math.PI - radians;
    xMultiplier = -1;
    yMultiplier = -1;
  } else if (radians <= Math.PI * 1.5) {
    radians -= Math.PI;
    xMultiplier = -1;
  } else {
    radians = Math.PI * 2 - radians;
  }
  const deltaX = Math.cos(radians) * length * xMultiplier;
  const deltaY = Math.sin(radians) * length * yMultiplier;
  return { x: deltaX, y: deltaY };
}
