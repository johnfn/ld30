/// <reference path="references.ts" />

class Switch extends MapObject {
  static all:Phaser.Group = undefined;

  constructor(game:Phaser.Game, x:number, y:number, spritesheet:string, frame:number) {
    super(game, x, y, spritesheet, frame);
  }

  trigger() {
    console.log("trigger");

    //TODO
    var laser:Laser = <any> this.getObjectsOnLevel()[0];

    laser.off();
  }
}