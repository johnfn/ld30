/// <reference path="references.ts" />

class SelectionIndicator extends Phaser.Sprite {
  constructor() {
    super(G.game, 0, 0, "selection", 0);
  }
}

class Focusable extends Entity {
  isFocused:boolean = true;
  indicator:SelectionIndicator;

  constructor(a,b,c,d,e) {
    super(a,b,c,d,e);

    this.indicator = new SelectionIndicator();
    G.game.add.existing(this.indicator);
  }

  toggle() {
    this.isFocused = !this.isFocused;
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
  }

  update() {
    super.update();

    if (this.isFocused) {
      this.indicator.x = this.x;
      this.indicator.y = this.y - 32;
    }
  }
}
