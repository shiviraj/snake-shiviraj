const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;
const GRID_ID = 'grid';
const SCORE_ID = 'score-card';
const LEFT_KEY_CODE = 37;
const RIGHT_KEY_CODE = 39;

const getGrid = id => document.getElementById(id);
const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const handleKeyPress = (event, snake) => {
  if (event.keyCode === LEFT_KEY_CODE) snake.turnLeft();
  if (event.keyCode === RIGHT_KEY_CODE) snake.turnRight();
};

const attachEventListeners = snake => {
  document.onkeydown = () => handleKeyPress(event, snake);
};

const initSnake = () => {
  const snakePosition = [
    [40, 25],
    [41, 25],
    [42, 25]
  ];
  return new Snake(snakePosition, new Direction(EAST), 'snake');
};
const initGhostSnake = () => {
  const snakePosition = [
    [40, 30],
    [41, 30],
    [42, 30]
  ];
  return new Snake(snakePosition, new Direction(SOUTH), 'ghost');
};

const generateNewFood = function() {
  const colId = Math.floor(Math.random() * NUM_OF_COLS);
  const rowId = Math.floor(Math.random() * NUM_OF_ROWS);
  return new Food(colId, rowId);
};

const playGame = function(game, draw) {
  if (game.isSnakeEatFood()) {
    draw.score();
    draw.eraseFood();
    game.newFood(generateNewFood());
    draw.food();
  }
  game.moveSnakes();
  draw.snakes();
};

const randomlyTurnGhost = ghostSnake => {
  const x = Math.random() * 100;
  if (x < 50) ghostSnake.turnLeft();
};

const main = function() {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(50, 25);
  const game = new Game(snake, ghostSnake, food);
  const draw = new Draw(game, getGrid(GRID_ID), getGrid(SCORE_ID));
  draw.initialize(NUM_OF_COLS, NUM_OF_ROWS);
  draw.setup();
  attachEventListeners(snake);
  setInterval(() => playGame(game, draw), 200);
  setInterval(randomlyTurnGhost, 500, ghostSnake);
};
