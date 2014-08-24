/// <reference path="references.ts" />

class Player extends Focusable {
  enteredLevel:Phaser.Signal;
  safeX:number;
  safeY:number;

  onLadder:boolean;

  flickerTime:number = 0;

  constructor() {
    super(G.game, 64, 0, "player", 0);

    this.enteredLevel = new Phaser.Signal();

    this.enteredLevel.add(this.enterLevel, this);
  }

  enterLevel():void {
    this.safeX = this.x;
    this.safeY = this.y;
  }

  update():void {
    super.update();

    if (!this.isFocused) return;

    controlBody(this.body);

    if (this.onLadder) {
      controlBodyLadder(this.body);
    }

    if (this.flickerTime > 0) {
      this.flickerTime--;

      this.alpha = (Math.floor(this.flickerTime / 4) % 3 == 0) ? 0 : 1;
    } else {
      this.alpha = 1;
    }
  }

  hit(m:MapObject) {
    if (m instanceof Laser) {
      this.resetToBeginning();
    }
  }

  resetToBeginning() {
    this.x = this.safeX;
    this.y = this.safeY;

    this.flicker();
  }

  flicker() {
    this.flickerTime = 200;
  }
}
