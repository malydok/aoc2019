const input = "234208-765869";
const [min, max] = input.split("-").map(Number);

const passes = [];
const getRepeats = number => [...String(number).matchAll(/(\d)\1+/g)];
const checkPass = pass => {
  const repeats = getRepeats(pass);
  return Boolean(repeats.find(([repeat]) => repeat.length === 2));
};
// checkPass(288588);
const fixDigitOrder = number => {
  let override;
  return Number(
    String(number)
      .split("")
      .map((char, index, str) => {
        if (override) {
          return override;
        }
        if (char < str[index - 1]) {
          override = str[index - 1];
          return str[index - 1];
        }
        return char;
      })
      .join("")
  );
};

for (
  let pass = fixDigitOrder(min);
  pass <= max;
  pass = fixDigitOrder(pass + 1)
) {
  if (!checkPass(pass)) {
    continue;
  }
  passes.push(pass);
}

console.log(passes.length);
console.log(passes.join(","));
