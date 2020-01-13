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
  }
  newFood(newFood) {
    this.food = newFood;
  }
  moveSnakes() {
    this.snake.move();
    this.ghostSnake.move();
  }
  isSnakeEatFood() {
    return this.snake.eat(this.food);
  }
}
