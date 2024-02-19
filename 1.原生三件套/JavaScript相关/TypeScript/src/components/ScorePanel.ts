export default class ScorePanel {

  score = 0;
  level = 1;
  scoreElm: HTMLElement;
  levelElm: HTMLElement;
  maxLevel: number;
  upScore: number;

  constructor (maxLevel: number = 10, upScore: number = 10) {
    this.scoreElm = document.getElementById('score')!;
    this.levelElm = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  addScore() {
    this.scoreElm.innerHTML = ++this.score + '';
    if (this.score % this.upScore === 0) {
      this.addLevel();
    }
  }

  addLevel() {
    if (this.level >= this.maxLevel) return;
    this.levelElm.innerHTML = ++this.level + '';
  }

}