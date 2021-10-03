export default class Snake {

  // 蛇的容器
  sanke: HTMLElement;
  // 蛇头
  head: HTMLElement;
  // 蛇身（包括蛇头）
  bodies: HTMLCollection;

  constructor () {
    this.sanke = document.getElementById('snake')!;
    this.head = document.querySelector('#snake > div')!;
    this.bodies = this.sanke.getElementsByTagName('div');
  }

  get X () {
    return this.head.offsetLeft;
  }

  get Y () {
    return this.head.offsetTop;
  }

  set X (value: number) {
    if (this.X === value) return;
    // 禁止撞墙
    if ( value < 0 || value > 290) {
      throw new Error('Game Over!');
    }
    // 禁止反方向直接掉头
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      if (value > this.X) {
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }
    this.moveBody();
    this.head.style.left = value + 'px';
    this.checkHeadBody();
  }
  
  set Y (value: number) {
    if (this.Y === value) return;
    // 检测撞墙
    if ( value < 0 || value > 290) {
      throw new Error('Game Over!');
    }
    // 禁止反方向直接掉头
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }
    this.moveBody();
    this.head.style.top = value + 'px';
    this.checkHeadBody();
  }

  addBody () {
    this.sanke.insertAdjacentHTML('beforeend', "<div></div>")
  }

  moveBody () {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let prevbd = this.bodies[i-1] as HTMLElement;
      let bd = this.bodies[i] as HTMLElement;
      let x = prevbd.offsetLeft;
      let y  = prevbd.offsetTop;
      bd.style.left = x + 'px';
      bd.style.top = y + 'px';
    }
  }

  // 检测蛇头有没有撞到蛇身
  checkHeadBody () {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y == bd.offsetTop) {
        throw new Error('Game Over!');
      }
    }
  }

}