import Block from "./Block.js";

class Invaders extends Block {
  constructor( x, y, width, height, img, canvas, gameIsOver) {
    super(x, y, 40,40);
    this.canvas = canvas;
    this.img = new Image(40,40);
    this.img.src = "./assets/invader.png"
    this.displacement = Math.floor(Math.random() * ((5) - 1) + 1);
    this.y = 0;
    this.x = Math.floor(Math.random() * ((canvas.width-width) - 0) + 0);
    this.gameIsOver = false;
  }
  draw(ctx){ 
      this.y += this.displacement;
      // invader jiggle on the way down
      this.x += Math.round(Math.random()) * 2 - 1;
      // invader never jiggle off screen
      if(this.x < 0){
        this.x = 0;
      } else if (this.x + this.width > this.canvas.width){
        this.x = this.canvas.width - this.width;
      }
      ctx.beginPath();
      ctx.drawImage(this.img,this.x, this.y, this.width, this.height);
      ctx.closePath();
  }
  
}

export default Invaders;