/// <reference path="references.ts" />

class Player extends Focusable {
  body:Phaser.Physics.Arcade.Body;

  constructor() {
    super(G.game, 64, 0, "player", 0);

    G.game.physics.enable(this, Phaser.Physics.ARCADE);
  }

  update():void {
    if (!this.isFocused) return;

    controlBody(this.body);
  }
}
