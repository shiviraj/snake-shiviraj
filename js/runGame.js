const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;
const GRID_ID = 'grid';
const SCORE_ID = 'score-card';
const GAME_OVER = 'game-over';
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
  document.body.onkeydown = () => handleKeyPress(event, snake);
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

const playGame = function(game, draw, gameContinue, ghostTurn) {
  if (game.isSnakeDead()) {
    clearInterval(gameContinue);
    clearInterval(ghostTurn);
    draw.gameOver(getGrid(GAME_OVER), getGrid('score'));
    return;
  }
  if (game.isSnakeEatFood()) {
    draw.score();
    draw.eraseFood();
    game.newFood(generateNewFood());
    draw.food();
  }
  draw.snakes();
  game.moveSnakes();
};

const randomlyTurnGhost = ghostSnake => {
  const x = Math.random() * 100;
  if (x < 50) ghostSnake.turnLeft();
};

const main = function() {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(50, 25);
  const border = [NUM_OF_COLS, NUM_OF_ROWS];
  const game = new Game(snake, ghostSnake, food, border);
  const draw = new Draw(game, getGrid(GRID_ID), getGrid(SCORE_ID));
  draw.initialize();
  attachEventListeners(snake);
  const gameContinue = setInterval(
    () => playGame(game, draw, gameContinue, ghostTurn),
    150
  );
  const ghostTurn = setInterval(randomlyTurnGhost, 250, ghostSnake);
};
