/// <reference path="references.ts" />

class Player extends Focusable {
  enteredLevel:Phaser.Signal;
  safeX:number;
  safeY:number;

  constructor() {
    super(G.game, 64, 0, "player", 0);

    this.enteredLevel = new Phaser.Signal();

    this.enteredLevel.add(this.enterLevel, this);
  }

  enterLevel():void {
    console.log("enter");

    this.safeX = this.x;
    this.safeY = this.y;
  }

  update():void {
    super.update();

    if (!this.isFocused) return;

    controlBody(this.body);
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

  }
}
