const runWithInput = require("./runWithInput");

const OPCODE = {
  ADD: 1,
  MULTIPLY: 2,
  END: 99
};

const runInstruction = (memory, pointer) => {
  const inputAddress1 = memory[pointer + 1];
  const inputAddress2 = memory[pointer + 2];
  const outputAddress = memory[pointer + 3];
  switch (memory[pointer]) {
    case OPCODE.ADD:
      return [
        ...memory.slice(0, outputAddress),
        memory[inputAddress1] + memory[inputAddress2],
        ...memory.slice(outputAddress + 1)
      ];
    case OPCODE.MULTIPLY:
      return [
        ...memory.slice(0, outputAddress),
        memory[inputAddress1] * memory[inputAddress2],
        ...memory.slice(outputAddress + 1)
      ];
    default:
      throw Error(`Unknown command ${memory[pointer]}`);
  }
};
const runProgram = (memory, pointer = 0) =>
  memory[pointer] === OPCODE.END
    ? memory
    : runProgram(runInstruction(memory, pointer), pointer + 4);

const head = array => array[0];
const findInputs = (output, memory) => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      if (head(runProgram(insertInputs(memory, noun, verb))) === output) {
        return [noun, verb];
      }
    }
  }
  throw Error(`No matching inputs found for ${output}`);
};
const insertInputs = (memory, noun, verb) => [
  memory[0],
  noun,
  verb,
  ...memory.slice(3)
];

const prepareData = data => data.split(",").map(Number);
runWithInput("input2.txt", data => {
  const memory = prepareData(data);
  const [noun, verb] = findInputs(19690720, memory);
  return 100 * noun + verb;
});
