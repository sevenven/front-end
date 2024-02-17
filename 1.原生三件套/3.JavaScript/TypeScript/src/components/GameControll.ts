import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';

export default class GameControll {

  direction = '';
  isLive = true;
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(10, 1);
    this.init();
  }
  
  init () {
    document.addEventListener('keydown', this.keydownHandler);
    this.food.change();
    this.run();
    console.log('300 - this.scorePanel.level * 30', 300 - this.scorePanel.level * 30)
  }

  run = () => {

    let X = this.snake.X;
    let Y = this.snake.Y;
    
    // ArrowUp Up top-
    // ArrowRight Right left+
    // ArrowDown Down top+
    // ArrowLeft Left left-
    switch (this.direction) {
      case "ArrowUp":
      case "Up": // 兼容IE
        Y -= 10;
        break;
      case "ArrowRight":
      case "Right":
        X += 10;
        break;
      case "ArrowDown":
      case "Down":
        Y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        X -= 10;
        break;
    }

    // 检查蛇是否吃到了食物
    this.checkEat(X, Y);

    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e) {
      alert(e)
      this.isLive = false;
    }

    this.isLive && setTimeout(this.run, 300 - (this.scorePanel.level - 1) * 30);

  }

  // 检查蛇是否吃到了食物
  checkEat (x: number, y: number) {
    if (x !== this.food.X || y !== this.food.Y) return;
    this.food.change();
    this.snake.addBody();
    this.scorePanel.addScore();
  }

  keydownHandler = (event: KeyboardEvent) => {
    this.direction = event.key;
  }

}



