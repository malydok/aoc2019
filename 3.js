const runWithInput = require("./runWithInput");
const pipe = require("./pipe");

const DIRECTION = {
  UP: "U",
  DOWN: "D",
  RIGHT: "R",
  LEFT: "L"
};
const CENTER = [0, 0];

const within = (a, b, x) => x >= a && x <= b;
const distance = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const tail = arr => arr[arr.length - 1];
const getDistances = points => points.map(point => distance(CENTER, point));
const getSmallest = values => tail(values.sort((a, b) => b - a));

const checkWires = (wireA, wireB) => {
  const intersections = [];
  for (let i = 0; i < wireA.length - 1; i++) {
    for (let j = 0; j < wireB.length - 1; j++) {
      if (
        linesIntersecting([wireA[i], wireA[i + 1]], [wireB[j], wireB[j + 1]])
      ) {
        intersections.push(
          linesIntersection([wireA[i], wireA[i + 1]], [wireB[j], wireB[j + 1]])
        );
      }
    }
  }
  return intersections;
};
const getIntersections = wires => {
  let intersections = [];
  for (let i = 1; i < wires.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      intersections = intersections.concat(checkWires(wires[i], wires[j]));
    }
  }
  return intersections;
};

const runInstruction = (startPoint, { direction, count }) => {
  switch (direction) {
    case DIRECTION.UP:
      return [startPoint[0], startPoint[1] + count];
    case DIRECTION.DOWN:
      return [startPoint[0], startPoint[1] - count];
    case DIRECTION.RIGHT:
      return [startPoint[0] + count, startPoint[1]];
    case DIRECTION.LEFT:
      return [startPoint[0] - count, startPoint[1]];
  }
};

const runWire = (wire, startPoint = CENTER) =>
  wire.reduce(
    (points, instruction) => {
      const lastPoint = tail(points);
      return points.concat([runInstruction(lastPoint, instruction)]);
    },
    [startPoint]
  );

const getPoints = wires =>
  wires.reduce((points, wire) => points.concat([runWire(wire)]), []);

const prepareData = data => {
  const lines = data.split("\r\n");
  return lines.map(line =>
    line.split(",").map(instruction => ({
      direction: instruction[0],
      count: Number(instruction.substring(1))
    }))
  );
};

runWithInput("input3.txt", data => {
  return pipe(data, [prepareData, getPoints, getIntersections]);
});
