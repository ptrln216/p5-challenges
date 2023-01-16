// point position
let x, y;
// prev point position
let px, py;
// total numbers to print
let total;
// size of number gap
let stepSize = 15;

function setup() {
  createCanvas(800, 800);
  textFont("Courier");
  background(0);
  x = px = width / 2;
  y = py = height / 2;
  let cols = Math.floor(width / stepSize);
  let rows = Math.floor(height / stepSize);
  total = cols * rows;
}

// The current number, also as a counter, until it reaches total limit
let num = 1;
// current direction
// 0 - right
// 1 - up
// 2 - left
// 3 - down
let direction = 0;

// how many turns we have taken, every 2 turns increase the distance
let turns = 0;
// how many steps to take in current direction till next turn
let distance = 1;

const isPrime = (n) => {
  if (n === 1) return false;
  let i = 2;
  while (i * i < n) {
    if (n % i === 0) return false;
    i++;
  }
  return true;
};

const drawCircleIfPrime = () => {
  fill(255);
  if (isPrime(num)) {
    circle(x, y, stepSize * 0.5);
  }
};

const connectPrevPoint = () => {
  line(px, py, x, y);
  stroke(255);
};

const updatePrevPosition = () => {
  px = x;
  py = y;
};

const calcNextPosition = () => {
  switch (direction) {
    case 0:
      x += stepSize;
      break;
    case 1:
      y -= stepSize;
      break;
    case 2:
      x -= stepSize;
      break;
    case 3:
      y += stepSize;
      break;
  }
};

/**
 * `num` is current drawing number, modulo by distance means we're counting how
 * many steps have been taken in current direction.
 * If the distance is reached, we should take a turn.
 */
const takeEnoughSteps = () => num % distance === 0;

const shouldMakeTurnNext = () => {
  direction = ++direction % 4;
  // increase the distance every 2 turns
  if (++turns % 2 === 0) {
    distance++;
  }
};

function draw() {
  drawCircleIfPrime();
  connectPrevPoint();
  updatePrevPosition();

  calcNextPosition();

  if (takeEnoughSteps()) {
    shouldMakeTurnNext();
  }

  num++;

  if (num > total) {
    noLoop();
  }
}
