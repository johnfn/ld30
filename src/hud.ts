/// <reference path="references.ts" />

class HUD extends Phaser.Group {
  switchPlayer:Phaser.Signal;

  constructor() {
    super(G.game);

    this.add(new Icon());

    this.switchPlayer = new Phaser.Signal();
    this.switchPlayer.add(() => {
      console.log("hey!");
    });
  }
}
