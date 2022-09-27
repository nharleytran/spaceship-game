import Invaders from "./Invaders.js";

class InvadersDirector {

    
    invadersList = [];
    time = 0;
    invaderShotDown = 0; 

    constructor(canvas, gameIsOver, mdirector, tank){
        this.canvas = canvas;
        this.gameIsOver = false;
        this.maxInvaders = 10;
        this.mdirector = mdirector;
        this.explosionSound = new Audio("../assets/explosion.wav"); 
    }  

    draw(ctx) {
        this.invadersList.forEach((invader) => invader.draw(ctx));
        this.time--;
    }

    collisionDectection() {
        this.invadersList.forEach((invader, index) =>{
            if (this.mdirector.collideWith(invader)) {
                this.explosionSound.play();
                this.invaderShotDown++;
                this.invadersList.splice(index, 1);
            }
        });
    }

    collideWith(sprite) {
        const invaderThatHitsIndex = this.invadersList.findIndex((invader) => (invader.intersects(sprite)));
        if (invaderThatHitsIndex >= 0){
            this.missilesList = [];
            this.explosionSound.play();
            return true;
        }
        return false;
    }

    invaded() {
        const invaderThatHitsIndex = this.invadersList.findIndex((invader) => (invader.y >= this.canvas.height));
        if (invaderThatHitsIndex >= 0){
            this.missilesList = [];
            return true;
        }
        return false;
    }

    arrive(time){ 
        if (this.time <= 0 && !this.gameIsOver){
            this.time = Math.floor(Math.random() * ((300) - 100) + 100);
            const invader = new Invaders(0,0,40,40,undefined,this.canvas,false);
            this.invadersList.push(invader);
        }
    }
}


export default InvadersDirector;