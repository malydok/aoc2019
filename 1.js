const runWithInput = require("./runWithInput");

const fuelByMass = mass => Math.floor(mass / 3) - 2;
const calculateFuel = moduleMass => {
  const fuel = fuelByMass(moduleMass);
  return fuel > 0 ? fuel + calculateFuel(fuel) : 0;
};
const calculateFuelSum = moduleMasses =>
  moduleMasses.reduce((sum, mass) => sum + calculateFuel(mass), 0);

runWithInput(calculateFuelSum);
