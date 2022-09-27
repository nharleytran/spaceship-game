import Block from "./Block";
import Missiles from "./Missiles";

class MissilesDirector {
    missilesList = [];
    time = 0;

    constructor(){
        this.maxMissiles = 10;
    }  

    draw(ctx) {
        this.missilesList = this.missilesList.filter(function(missile){return missile.y + missile.width > 0;});
        this.missilesList.forEach((missile) => missile.draw(ctx));
        if(this.time > 0){
            this.time--;
        }
    }

    fire(x,y, time = 0){
        if(this.time <= 0 && this.missilesList.length < this.maxMissiles) {
            this.time = time;
            const missile = new Missiles(x,y);
            this.missilesList.push(missile);
        }
    }

    collideWith(sprite) {
        const missileThatHitsIndex = this.missilesList.findIndex((missile) => (missile.intersects(sprite)));
        if (missileThatHitsIndex >= 0){
            this.missilesList.splice(missileThatHitsIndex,1);
            return true;
        }
        return false;
    }


}

export default MissilesDirector;