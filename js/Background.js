class Background {
  constructor() {
    this.img = new Image();
    this.img.src = "../img/Background.png";
  }
  draw(ctx) {
    ctx.drawImage(this.img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
  update() {}
}
