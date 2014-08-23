/// <reference path="references.ts" />

class Robot extends Focusable {
  constructor() {
    super(G.game, 64, 0, "robot", 0);

    G.game.physics.enable(this, Phaser.Physics.ARCADE);
  }

  update():void {
    if (!this.isFocused) return;

    controlBody(this.body);
  }
}
