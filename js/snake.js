class Snake {
  #positions;
  #direction;
  #type;
  #previousTail;
  constructor(positions, direction, type) {
    this.#positions = positions.slice();
    this.#direction = direction;
    this.#type = type;
    this.#previousTail = [0, 0];
  }
  get location() {
    return this.#positions.slice();
  }
  get species() {
    return this.#type;
  }
  getTail() {
    return this.#previousTail.slice();
  }
  turnLeft() {
    this.#direction.turnLeft();
  }
  turnRight() {
    this.#direction.turnRight();
  }
  get head() {
    return this.#positions[this.#positions.length - 1];
  }
  move() {
    this.#previousTail = this.#positions.shift();
    let [headY, headX] = this.head;
    const [deltaY, deltaX] = this.#direction.delta;
    this.#positions.push([headY + deltaY, headX + deltaX]);
  }
  eat(food) {
    const [colId, rowId] = food.position();
    const lastIndex = this.#positions.length - 1;
    const snakeHead = this.#positions[lastIndex];
    const hasEatenFood = snakeHead[0] === colId && snakeHead[1] === rowId;
    if (hasEatenFood) {
      this.#positions.unshift(this.#previousTail);
    }
    return hasEatenFood;
  }
  isTouchItself() {
    const snakeBody = this.location.slice(0, -1);
    return snakeBody.some(
      body => this.head[0] == body[0] && this.head[1] == body[1]
    );
  }
  isCrossBorder(border) {
    const isOutOfCols = this.head[0] >= border[0] || this.head[0] < 0;
    const isOutOfRows = this.head[1] >= border[1] || this.head[1] < 0;
    return isOutOfCols || isOutOfRows;
  }
  comeThroughOtherSide() {
    this.#positions.forEach(([headY, headX], index) => {
      if (headY < 0) headY = NUM_OF_COLS - 1;
      headY = headY % NUM_OF_COLS;
      if (headX < 0) headX = NUM_OF_ROWS - 1;
      headX = headX % NUM_OF_ROWS;
      this.#positions[index] = [headY, headX];
    });
  }
}
