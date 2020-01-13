const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

class Direction {
  constructor(initialHeading) {
    this.heading = initialHeading;
    this.deltas = {};
    this.deltas[EAST] = [1, 0];
    this.deltas[WEST] = [-1, 0];
    this.deltas[NORTH] = [0, -1];
    this.deltas[SOUTH] = [0, 1];
  }
  get delta() {
    return this.deltas[this.heading];
  }
  turnLeft() {
    this.heading = (this.heading + 1) % 4;
  }
  turnRight() {
    this.heading = this.heading - 1;
    if (this.heading == -1) this.heading = 3;
  }
}

class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }
  get location() {
    return this.positions.slice();
  }
  get species() {
    return this.type;
  }
  turnLeft() {
    this.direction.turnLeft();
  }
  turnRight() {
    this.direction.turnRight();
  }
  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();
    const [deltaX, deltaY] = this.direction.delta;
    this.positions.push([headX + deltaX, headY + deltaY]);
  }
  eat(food) {
    const [colId, rowId] = food.position();
    const lastIndex = this.positions.length - 1;
    const snakeHead = this.positions[lastIndex];
    const hasEatenFood = snakeHead[0] == colId && snakeHead[1] == rowId;
    if (hasEatenFood) {
      this.positions.unshift(this.previousTail);
    }
    return hasEatenFood;
  }
}

class Food {
  constructor(colId, rowId) {
    this.colId = colId;
    this.rowId = rowId;
  }
  position() {
    return [this.colId, this.rowId];
  }
}

class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.score = 0;
  }
  newFood(newFood) {
    this.food = newFood;
  }
  moveSnakes() {
    this.snake.move();
    this.ghostSnake.move();
  }
  isSnakeEatFood() {
    const isFoodEaten = this.snake.eat(this.food);
    if (isFoodEaten) this.updateScore();
    return isFoodEaten;
  }
  updateScore() {
    this.score += 5;
  }
}

class Draw {
  constructor(game, grid, score) {
    this.grid = grid;
    this.game = game;
    this.scoreCard = score;
  }
  initialize(numOfCols, numOfRows) {
    for (let y = 0; y < numOfRows; y++) {
      for (let x = 0; x < numOfCols; x++) {
        createCell(this.grid, x, y);
      }
    }
  }
  setup() {
    this.snakes();
    this.food();
    this.score();
  }
  eraseTail(snake) {
    const [colId, rowId] = snake.previousTail;
    const cell = getCell(colId, rowId);
    cell.classList.remove(snake.species);
  }
  snakes() {
    const singleSnake = snake => {
      this.eraseTail(snake);
      snake.location.forEach(([colId, rowId]) => {
        const cell = getCell(colId, rowId);
        cell.classList.add(snake.species);
      });
    };
    singleSnake(this.game.snake);
    singleSnake(this.game.ghostSnake);
  }
  eraseFood() {
    const [colId, rowId] = this.game.food.position();
    const cell = getCell(colId, rowId);
    cell.classList.remove('food');
  }
  food() {
    const [colId, rowId] = this.game.food.position();
    const cell = getCell(colId, rowId);
    cell.classList.add('food');
  }
  score() {
    this.scoreCard.innerText = `Score: ${this.game.score}`;
  }
}
