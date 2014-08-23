/// <reference path="references.ts" />

class BounceShroom extends MapObject {
  static all:Phaser.Group = undefined;
  constructor(game:Phaser.Game, x:number, y:number, spritesheet:string, frame:number) {
    var self = this;

    super(game, x, y, spritesheet, frame);

    this.enterLevel.add(this.revive);

    this.enterLevel.add(() => {
      self.revive();
    });
  }

  wither() {
    // insert nice animation here.

    this.kill();
  }
}