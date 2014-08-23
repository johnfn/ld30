/// <reference path="references.ts" />

class Laser extends Phaser.Sprite {
  laserLine:Phaser.Line;
  data:Phaser.BitmapData;

  constructor(a, b, c, d, e) {
    super(a, b, c, d, e);

    var shape = G.game.add.graphics(0, 0);
    shape.beginFill(0xff0000, 1);
    shape.drawRect(0, 0, 20, 500);
  }
}