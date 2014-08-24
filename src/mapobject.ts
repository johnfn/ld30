/// <reference path="references.ts" />

class MapObject extends Phaser.Sprite {
  body:Phaser.Physics.Arcade.Body;
  private objKey:string;
  mapX:number;
  mapY:number;

  static allMapObjects:MapObject[] = [];
  enterLevel:Phaser.Signal;

  constructor(game:Phaser.Game, x:number, y:number, spritesheet:string, frame:number) {
    super(game, x, y, spritesheet, frame);

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.mapX = Math.floor(this.x / GameMap.w);
    this.mapY = Math.floor(this.y / GameMap.h);
    this.objKey = this.mapX + "," + this.mapY;

    if (!G.objects[this.objKey]) {
      G.objects[this.objKey] = [];
    }

    G.objects[this.objKey].push(this);

    MapObject.allMapObjects.push(this);

    this.enterLevel = new Phaser.Signal();
  }

  getObjectsOnLevel():Phaser.Sprite[] {
    var objs:Phaser.Sprite[] = G.objects[this.objKey];
    var self = this;

    return objs.filter((item) => { return item !== self; });
  }

  onScreen():boolean {
    return ((GameMap.x / GameMap.w) == this.mapX && (GameMap.y / GameMap.h) == this.mapY);
  }
}
