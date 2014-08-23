/// <reference path="references.ts" />

class MapObject extends Phaser.Sprite {
  private objKey:string;

  constructor(game:Phaser.Game, x:number, y:number, spritesheet:string, frame:number) {
    super(game, x, y, spritesheet, frame);

    var mapX:number = Math.floor(this.x / GameMap.w);
    var mapY:number = Math.floor(this.y / GameMap.h);
    this.objKey = mapX + "," + mapY;

    if (!G.objects[this.objKey]) {
      G.objects[this.objKey] = [];
    }

    G.objects[this.objKey].push(this);
  }

  getObjectsOnLevel():Phaser.Sprite[] {
    var objs:Phaser.Sprite[] = G.objects[this.objKey];
    var self = this;

    return objs.filter((item) => { return item !== self; });
  }
}
