/// <reference path="references.ts" />

class Crate extends MapObject {
  static all:Phaser.Group = undefined;

  constructor(game:Phaser.Game, x:number, y:number, spritesheet:string, frame:number) {
    super(game, x, y, spritesheet, frame);
  }

  update():void {
    this.body.velocity.y = 90;
    this.body.velocity.x *= 0.9;
  }
}