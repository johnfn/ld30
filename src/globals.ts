/// <reference path="references.ts" />

class G {
  static walls:Phaser.TilemapLayer;
  static player:Player;
  static game:Phaser.Game;
  static hud:HUD;
  static keyboard:Phaser.Keyboard;
  static robot:Robot;
  static focus:Focusable;

  static SCREEN_WIDTH:number = 512;
  static SCREEN_HEIGHT:number = 512;

  static onDown:Function = (key:number, callback: Function, context:any = G) => {
    G.game.input.keyboard.addKey(key).onDown.add(callback, context);
  }
}

class GameMap {
  static x:number = 0;
  static y:number = 0;

  static w:number = 640;
  static h:number = 640;
}
