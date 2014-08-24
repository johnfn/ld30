/// <reference path="references.ts" />

class Laser extends MapObject {
  w:number = 10;
  on:boolean = true;
  top:number = 0;

  static all:Phaser.Group;

  gfx:Phaser.Graphics;

  constructor(a, b, c, d, e) {
    super(a, b, c, d, e);

    this.gfx = G.game.add.graphics(0, 0);

    this.render();
  }

  render() {
    this.gfx.clear();

    if (!this.onScreen()) return;

    if (this.on) {
      this.top = this.raycast();

      this.gfx.beginFill(0xff0000, 1);
      this.gfx.drawRect(this.x, this.top, this.w, this.y - this.top);
    }
  }

  public update() {
    super.update();

    this.render();

    if (this.collides(G.player)) {
      G.player.hit(this);
    }
  }

  raycast() {
    var maxHeight = 0;
    var line:Phaser.Line = new Phaser.Line(this.x, this.y, this.x, 0);

    var collisions:Phaser.Tile[] = G.walls.getRayCastTiles(line, 4, true);

    for (var i = 0; i < collisions.length; i++) {
      maxHeight = Math.max(maxHeight, collisions[i].y + 32);
    }

    if (Crate.all) {
      Crate.all.forEachAlive((c:Crate) => {
        var hitPoint = c.y + c.height;

        if (this.collides(c) && hitPoint > maxHeight) {
          maxHeight = hitPoint;
        }
      }, this);
    }

    return maxHeight;
  }

  collides(who:Phaser.Sprite) {
    if (!this.on) return false;
    if (!this.onScreen()) return false;

    var line:Phaser.Line = new Phaser.Line(this.x, this.y, this.x, this.top);

    var distanceToWall = Number.POSITIVE_INFINITY;
    var closestIntersection = null;

    // Create an array of lines that represent the four edges of each wall
    var lines:Phaser.Line[] = [
        new Phaser.Line(who.x, who.y, who.x + who.width, who.y),
        new Phaser.Line(who.x, who.y, who.x, who.y + who.height),
        new Phaser.Line(who.x + who.width, who.y,
            who.x + who.width, who.y + who.height),
        new Phaser.Line(who.x, who.y + who.height,
            who.x + who.width, who.y + who.height)
    ];

    var hit:boolean = false;

    // Test each of the edges in this wall against the ray.
    // If the ray intersects any of the edges then the wall must be in the way.
    for(var i = 0; i < lines.length; i++) {
        var intersect:Phaser.Point = Phaser.Line.intersects(line, lines[i]);

        if (intersect) {
            // Find the closest intersection
            var distance:number =
                Phaser.Math.distance(line.start.x, line.start.y, intersect.x, intersect.y);

            if (distance < distanceToWall) {
              hit = true;

              distanceToWall = distance;
              closestIntersection = intersect;
            }
        }
    }

    return hit;
  }

  off() {
    this.on = false;
  }
}