import Sprite from "./Sprite.js";


class Tank extends Sprite {
  
  firePressed = false;
  gameOn = 0;
  constructor( x, y, mdirector, width, height, img) {
    super(x, y, 50, 50, img, 0, 0);
    this.img = new Image(50,50);
    this.img.src = "./assets/tank.png"
    this.displacement = 7;
    this.mdirector = mdirector;
    this.fireSound = new Audio("../assets/shoot.wav"); 
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
    document.addEventListener("keyup", this.keyUpHandler.bind(this));
  }

  keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.dx = this.displacement;
      this.gameOn+=1;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.dx = -this.displacement;
      this.gameOn+=1;
    } else if (e.key === " ") {
      this.firePressed = true;
      this.fireSound.currentTime = 0;
      this.fireSound.play();
      this.gameOn+=1;
    }
  }

  keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.dx = 0;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.dx = 0;
    } else if (e.key === " ") {
      this.firePressed = false;
    }
  }

  move(canvasWidth){
      super.move();
      if(this.x < 0){
          this.x = 0;
      } else if (this.x + this.width > canvasWidth){
          this.x = canvasWidth - this.width;
      } 
  }

  draw(ctx) { 
    super.draw(ctx);
    if(this.firePressed) {
      this.mdirector.fire(this.x + this.width/3, this.y, 8);
    }
  }

}

export default Tank;