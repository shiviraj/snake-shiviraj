class Draw {
  constructor(game, grid, score) {
    this.grid = grid;
    this.game = game;
    this.scoreCard = score;
  }
  initialize() {
    const [numOfCols, numOfRows] = this.game.border;
    for (let row = 0; row < numOfRows; row++) {
      for (let col = 0; col < numOfCols; col++) {
        createCell(this.grid, col, row);
      }
    }
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
  gameOver(gameOver, score) {
    score.innerText = `${this.game.score}`;
    gameOver.style.margin = '0 2%';
    gameOver.style.transition = 'margin 1s';
  }
}
