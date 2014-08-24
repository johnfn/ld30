/// <reference path="references.ts" />

class Laser extends MapObject {
  line:Phaser.Line;
  w:number = 10;
  on:boolean = true;

  static all:Phaser.Group;

  gfx:Phaser.Graphics;

  constructor(a, b, c, d, e) {
    super(a, b, c, d, e);

    this.gfx = G.game.add.graphics(0, 0);

    this.line = new Phaser.Line(this.x, this.y + 32, this.x, 0);

    this.render();
  }

  render() {
    this.gfx.clear();

    if (this.on) {
      var top = this.raycast();

      this.gfx.beginFill(0xff0000, 1);
      this.gfx.drawRect(this.x, top, this.w, this.y - top);

      this.line.start.x = this.x + 12;
      this.line.end.x = this.x + 12;

      this.line.start.y = top;
      this.line.end.y = this.y + 12;
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
    var collisions:Phaser.Tile[] = G.walls.getRayCastTiles(this.line, 4, true);
    var maxHeight = 0;

    for (var i = 0; i < collisions.length; i++) {
      maxHeight = Math.max(maxHeight, collisions[i].y);
    }

    var did:boolean = false;

    if (Crate.all) {
      Crate.all.forEachAlive((c:Crate) => {
        var hitPoint = c.y + c.height;

        if (this.collides(c) && hitPoint > maxHeight) {
          maxHeight = hitPoint;

          did = true;
        }
      }, this);
    }

    console.log(did);

    return maxHeight;
  }

  collides(who:Phaser.Sprite) {
    if (!this.on) return false;

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

    // Test each of the edges in this wall against the ray.
    // If the ray intersects any of the edges then the wall must be in the way.
    for(var i = 0; i < lines.length; i++) {
        var intersect:Phaser.Point = Phaser.Line.intersects(this.line, lines[i]);

        if (intersect) {
            // Find the closest intersection
            var distance:number =
                Phaser.Math.distance(this.line.start.x, this.line.start.y, intersect.x, intersect.y);

            if (distance < distanceToWall) {
                distanceToWall = distance;
                closestIntersection = intersect;

                return true;
            }
        }
    }

    return false;
    // return closestIntersection;
  }

  off() {
    this.on = false;
  }
}