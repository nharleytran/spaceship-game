import Block from "./Block.js";

class Missiles extends Block {
  constructor( x, y, width, height, img) {
    super( x, y, 15, 15);
    this.img = new Image(15,15);
    this.img.src = "./assets/missile.png"
    this.displacement = 3;
    this.visible = true;
  }
  draw(ctx){
      this.y -= this.displacement;
      ctx.beginPath();
      ctx.drawImage(this.img,this.x, this.y, this.width, this.height);
      ctx.closePath();
  }

}

export default Missiles;