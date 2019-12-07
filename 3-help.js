const firstSteps = "R1005,U370,L335,D670,R236,D634,L914,U15,R292,D695";
const secondSteps =
  "L998,U242,R333,U631,L507,U313,R286,U714,R709,U585,R393,D893,R404,D448,R882,U246,L190,U238,R672,D184,L275,D120,R352,D584,L626,U413,L288,D942,R770,D551,L926,D242,R568,U48,R108,D349,R750,D323,L529,D703,L672,U775,L700,D465,L528";

const overlap = 284 + 12 + 15 + 2 + 2;

const sum = (firstSteps + secondSteps)
  .split(",")
  .map(el => Number(el.substr(1)) || 0)
  .reduce((sum, x) => sum + x, 0);

console.log(sum - overlap);
