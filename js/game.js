class Game {
  #snake;
  #ghostSnake;
  #border;
  #score;
  #food;
  constructor(snake, ghostSnake, food, border) {
    this.#snake = snake;
    this.#ghostSnake = ghostSnake;
    this.#food = food;
    this.#border = border.slice();
    this.#score = 0;
  }
  //have to change it by setting food inside
  newFood(newFood) {
    this.#food = newFood;
  }
  status() {
    return {border: this.#border.slice(), food: this.#food, score: this.#score};
  }
  getSnakes() {
    return [this.#snake, this.#ghostSnake];
  }
  moveSnakes() {
    this.#snake.move();
    this.#ghostSnake.move();
    if (this.#ghostSnake.isCrossBorder(this.#border)) {
      this.#ghostSnake.comeThroughOtherSide();
    }
  }
  isSnakeEatFood() {
    const isFoodEaten = this.#snake.eat(this.#food);
    if (isFoodEaten) this.updateScore();
    return isFoodEaten;
  }
  updateScore() {
    this.#score += 5;
  }
  isSnakeDead() {
    const isSnakeCrossBorder = this.#snake.isCrossBorder(this.#border.slice());
    const isSnakeEatItself = this.#snake.isTouchItself();
    return isSnakeCrossBorder || isSnakeEatItself;
  }
}
