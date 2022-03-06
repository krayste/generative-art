function w(val) {
  if (val == null) return width;
  return (val * width) / 3;
}

function h(val) {
  if (val == null) return height;
  return val * height;
}

function getSeed() {
  return;
}

function makeCircle(numSides, radius) {
  const points = [];
  const radiansPerStep = (Math.PI * 2) / numSides;

  for (let theta = 0; theta < Math.PI * 2; theta += radiansPerStep) {
    const x = 0.5 + radius * Math.cos(theta);
    const y = 0.5 + radius * Math.sin(theta);
    points.push([x, y]);
  }

  return points;
}

function distortPolygon(polygon) {
  return polygon.map((point) => {
    const x = point[0];
    const y = point[1];
    const distance = dist(0.5, 0.5, x, y);

    const z = (frameCount + 27000) / 500;
    const z2 = (frameCount + 27000) / 200;

    const noiseFn = (x, y) => {
      const noiseX = (x + 0.31) * distance * 2 + z2;
      const noiseY = (y - 1.73) * distance * 2 + z2;
      return noise(noiseX, noiseY, z);
    };

    const theta = noiseFn(x, y) * Math.PI * 3;

    const amountToNudge = 0.08 - Math.cos((frameCount + 27000) / 500) * 0.08;
    const newX = x + amountToNudge * Math.cos(theta);
    const newY = y + amountToNudge * Math.sin(theta);

    return [newX, newY];
  });
}

function chaikin(arr, num) {
  if (num === 0) return arr;
  const l = arr.length;
  const smooth = arr
    .map((c, i) => {
      return [
        [
          0.75 * c[0] + 0.25 * arr[(i + 1) % l][0],
          0.75 * c[1] + 0.25 * arr[(i + 1) % l][1],
        ],
        [
          0.25 * c[0] + 0.75 * arr[(i + 1) % l][0],
          0.25 * c[1] + 0.75 * arr[(i + 1) % l][1],
        ],
      ];
    })
    .flat();
  return num === 1 ? smooth : chaikin(smooth, num - 1);
}

function setup() {
  createCanvas(1500, 500);

  colorMode(HSB, 360, 100, 100, 1.0);
}

function draw() {
  background(0, 0, 0); // white background
  noFill(); // no fill
  stroke(Math.random() * 360, Math.random() * 100, 100); // black stroke
  strokeWeight(w(0.003));

  for (let radius = 0.05; radius < 1.9; radius += 0.01) {
    const circle = makeCircle(20, radius);
    const distortedCircle = distortPolygon(circle);
    const smoothCircle = chaikin(distortedCircle, 4);

    beginShape();
    smoothCircle.forEach((point) => {
      vertex(w(point[0]), h(point[1]));
    });
    endShape(CLOSE); // CLOSE because the last point is not the first point
  }
  noLoop();
  //   save("testimage.png");
}
