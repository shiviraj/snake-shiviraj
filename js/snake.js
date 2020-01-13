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
  get head() {
    return this.positions[this.positions.length - 1];
  }
  move() {
    const [headX, headY] = this.head;
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
  isTouchItself() {
    const snakeBody = this.location.slice(0, -1);
    return snakeBody.some(body =>
      this.head.every(headCoords => body.includes(headCoords))
    );
  }
  isCrossBorder(wall) {
    return false;
  }
}
