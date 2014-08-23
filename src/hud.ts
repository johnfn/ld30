/// <reference path="references.ts" />

class Icon extends Phaser.Sprite {
  constructor() {
    super(G.game, 0, 0, "hud", 1);
  }

  toggle() {
    this.frame = (this.frame + 1) % 2;
  }
}

class HUD extends Phaser.Group {
  switchPlayer:Phaser.Signal;
  icon:Icon;

  constructor() {
    var self = this;

    super(G.game);

    this.icon = new Icon();

    this.add(this.icon);

    this.switchPlayer = new Phaser.Signal();
    this.switchPlayer.add(() => {
      self.icon.toggle();
    });

    this.fixedToCamera = true;
  }
}
