import "./style.css";
import Tank from "./model/Tank.js";
import MissilesDirector from "./model/MissilesDirector.js";
import InvadersDirector from "./model/InvadersDirector.js";


const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2 - 25;
let y = canvas.height - 60;;
let gameIsOver = false;
const backgroundMusic = new Audio("../assets/music.mpeg");

const mdirector = new MissilesDirector();
const tank = new Tank(x, y, mdirector); 
const idirector = new InvadersDirector(canvas,gameIsOver,mdirector,tank);

function game() {
  checkGameOver();
  // playsound();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(!gameIsOver){
    tank.draw(ctx);
    tank.move(canvas.width);
    // console.log(tank.gameOn);
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Missiles remaining: "+ (10 - mdirector.missilesList.length) , 10, 40);
    mdirector.draw(ctx);
    if (tank.gameOn > 0){
      backgroundMusic.play();
      idirector.arrive(100);
      idirector.collisionDectection();
      idirector.draw(ctx);
    }
    window.requestAnimationFrame(game);
  }else{
    backgroundMusic.pause();
    tank.x = canvas.width / 2 - 25;
    tank.draw(ctx);
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Game Over!", 10, 40);
  }
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Invders shot down: "+ idirector.invaderShotDown , 10, 20);
}

function checkGameOver(){
  if (idirector.invaded()) {
    return gameIsOver = true;
  }
  if(idirector.collideWith(tank)){
    gameIsOver = true;
  }
}

game();
