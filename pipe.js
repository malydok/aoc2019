const pipe = (unit, fns) => fns.reduce((output, fn) => fn(output), unit);

module.exports = pipe;
