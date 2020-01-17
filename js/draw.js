class Draw {
  #grid;
  #game;
  #scoreCard;
  constructor(game, grid, score) {
    this.#grid = grid;
    this.#game = game;
    this.#scoreCard = score;
  }
  initialize() {
    const {border} = this.#game.status();
    const [numOfCols, numOfRows] = border;
    for (let row = 0; row < numOfRows; row++) {
      for (let col = 0; col < numOfCols; col++) {
        createCell(this.#grid, col, row);
      }
    }
    this.snakes();
    this.food();
    this.score();
  }
  eraseTail(snake) {
    const [colId, rowId] = snake.getTail();
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
    const snakes = this.#game.getSnakes();
    snakes.forEach(snake => singleSnake(snake));
  }
  eraseFood() {
    const {food} = this.#game.status();
    const [colId, rowId] = food.position();
    const cell = getCell(colId, rowId);
    cell.classList.remove('food');
  }
  food() {
    const {food} = this.#game.status();
    const [colId, rowId] = food.position();
    const cell = getCell(colId, rowId);
    cell.classList.add('food');
  }
  score() {
    const {score} = this.#game.status();
    this.#scoreCard.innerText = `Score: ${score}`;
  }
  gameOver(gameOver, scoreElement) {
    const {score} = this.#game.status();
    scoreElement.innerText = `${score}`;
    gameOver.style.margin = '0 5%';
    gameOver.style.transition = 'margin 1s';
  }
}
