class Game {
  constructor(snake, ghostSnake, food, border) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.border = border.slice();
    this.score = 0;
  }
  //have to change it by setting food inside
  newFood(newFood) {
    this.food = newFood;
  }
  getSnakes() {
    return [this.snake, this.ghostSnake];
  }
  moveSnakes() {
    this.snake.move();
    this.ghostSnake.move();
    if (this.ghostSnake.isCrossBorder(this.border)) {
      this.ghostSnake.comeThroughOtherSide();
    }
  }
  isSnakeEatFood() {
    const isFoodEaten = this.snake.eat(this.food);
    if (isFoodEaten) this.updateScore();
    return isFoodEaten;
  }
  updateScore() {
    this.score += 5;
  }
  isSnakeDead() {
    return this.snake.isCrossBorder(this.border) || this.snake.isTouchItself();
  }
}
