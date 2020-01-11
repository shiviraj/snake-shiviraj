class Draw {
  constructor(numOfCols, numOfRows, grid) {
    this.numOfCols = numOfCols;
    this.numOfRows = numOfRows;
    this.grid = grid;
  }
  initialize() {
    const grid = getGrid(this.grid);
    for (let y = 0; y < this.numOfRows; y++) {
      for (let x = 0; x < this.numOfCols; x++) {
        createCell(grid, x, y);
      }
    }
  }
  snake(snake) {
    this.eraseTail(snake);
    snake.location.forEach(([colId, rowId]) => {
      const cell = getCell(colId, rowId);
      cell.classList.add(snake.species);
    });
  }
  eraseTail(snake) {
    let [colId, rowId] = snake.previousTail;
    const cell = getCell(colId, rowId);
    cell.classList.remove(snake.species);
  }
  food(food) {
    const [colId, rowId] = food.position();
    const cell = getCell(colId, rowId);
    cell.classList.add('food');
  }
}

class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
  }
  moveSnake() {
    this.snake.move();
    this.ghostSnake.move();
  }
}

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

const handleKeyPress = snake => {
  snake.turnLeft();
};

const moveAndDrawSnake = function(snake, draw) {
  snake.move();
  draw.eraseTail(snake);
  draw.snake(snake);
};

const attachEventListeners = snake => {
  document.body.onkeydown = handleKeyPress.bind(null, snake);
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

const main = function() {
  const draw = new Draw(100, 60, 'grid');
  draw.initialize();
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(5, 5);
  const game = new Game(snake, ghostSnake, food);
  draw.snake(snake);
  draw.snake(ghostSnake);
  draw.food(food);
  attachEventListeners(snake);
  setInterval(() => {
    game.moveSnake();
    draw.snake(snake);
    draw.snake(ghostSnake);
  }, 200);

  setInterval(() => {
    const x = Math.random() * 100;
    if (x > 50) {
      ghostSnake.turnLeft();
    }
  }, 500);
};
