const runWithInput = require("./runWithInput");
const pipe = require("./pipe");

const DIRECTION = {
  UP: "U",
  DOWN: "D",
  RIGHT: "R",
  LEFT: "L"
};
const CENTER = [0, 0];

const distance = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2);
const samePoint = ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2;
const includesPoint = (points, point) =>
  points.find(el => samePoint(el, point));
const tail = arr => arr[arr.length - 1];
const getDistances = points => points.map(point => distance(CENTER, point));
const getSmallest = values => tail(values.sort((a, b) => b - a));

const findRepeating = points =>
  points.reduce(
    ({ intersections, unique }, point) => {
      if (includesPoint(unique, point)) {
        return {
          intersections: intersections.concat([point]),
          unique
        };
      }
      return {
        intersections,
        unique: unique.concat([point])
      };
    },
    {
      intersections: [],
      unique: []
    }
  );
const findIntersections = points => findRepeating(points).intersections;
const findUnique = points => findRepeating(points).unique;

const runInstruction = ([startPointX, startPointY], { direction, count }) =>
  Array.from({ length: count }, (_, i) => {
    switch (direction) {
      case DIRECTION.UP:
        return [startPointX, startPointY + (i + 1)];
      case DIRECTION.DOWN:
        return [startPointX, startPointY - (i + 1)];
      case DIRECTION.RIGHT:
        return [startPointX + (i + 1), startPointY];
      case DIRECTION.LEFT:
        return [startPointX - (i + 1), startPointY];
    }
  });

const runWire = (wire, startPoint = CENTER) =>
  wire.reduce((points, instruction) => {
    const lastPoint = tail(points) || startPoint;
    return points.concat(runInstruction(lastPoint, instruction));
  }, []);

const getPoints = wires =>
  wires.reduce(
    (points, wire) => points.concat(pipe(wire, [runWire, findUnique])),
    []
  );

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
  return pipe(data, [
    prepareData,
    getPoints,
    findIntersections,
    getDistances,
    getSmallest
  ]);
});
