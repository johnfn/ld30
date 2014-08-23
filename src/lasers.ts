/// <reference path="references.ts" />

class Laser extends MapObject {
  line:Phaser.Line;
  data:Phaser.BitmapData;
  w:number = 10;

  gfx:Phaser.Graphics;

  constructor(a, b, c, d, e) {
    super(a, b, c, d, e);

    this.gfx = G.game.add.graphics(0, 0);

    this.line = new Phaser.Line(this.x, this.y + 32, this.x, 0);

    this.render();
  }

  render() {
    var top = this.raycast();

    this.gfx.clear();
    this.gfx.beginFill(0xff0000, 1);
    this.gfx.drawRect(this.x, top, this.w, this.y - top);
  }

  update() {
    this.render();
  }

  raycast() {
    var collisions:Phaser.Tile[] = G.walls.getRayCastTiles(this.line, 4, true);
    var maxHeight = 0;

    for (var i = 0; i < collisions.length; i++) {
      maxHeight = Math.max(maxHeight, collisions[i].y);
    }

    return maxHeight;
  }
}