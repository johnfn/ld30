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

    this.animations.add("boing", [0, 1, 2, 3]);

    this.body.immovable = true;
  }

  wither() {
    // insert nice animation here.

    this.animations.play("boing", 15)/*.onComplete.add(() =>
      console.log("done")
    );*/

    //this.kill();
  }
}