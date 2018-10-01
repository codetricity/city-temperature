const ordinalScale = d3.scaleOrdinal();
const scalePoint = d3.scalePoint();
const scaleBand = d3.scaleBand();

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
  'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

ordinalScale.domain(alphabet);
scalePoint.domain(alphabet);
scaleBand.domain(alphabet);

const numbersUP = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  25, 26];

const numbersDN = [26, 25, 24, 23, 22, 21, 20, 19, 18,
  17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3,
  2, 1];

ordinalScale.range(numbersUP);
