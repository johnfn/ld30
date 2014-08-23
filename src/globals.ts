/// <reference path="references.ts" />

class G {
  static walls:Phaser.TilemapLayer;
  static player:Player;
  static game:Phaser.Game;
  static hud:HUD;
  static keyboard:Phaser.Keyboard;
  static robot:Robot;
  static foundRobot:boolean = false;
  static focus:Focusable;
  static dialog:Dialog;

  static SCREEN_WIDTH:number = 512;
  static SCREEN_HEIGHT:number = 512;

  static objects:{[key: string]: Phaser.Sprite[]} = {};

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

class Dialogs {
  byMap:{[key: string]: string[]} = {
    "0,0": [
      "DIARY LOG: Day 53, 2836 A.D.",
      "I was on a routine reconnaissance mission in Sector 28 when my ship took heavy damage from an unknown assailant.",
      "My spaceship ran out of fuel.",
      "I thought that I was going to die in empty space, but a desperate scan turned up this strange world in a sector that was supposedly empty.",
      "I guess there's not much to do but look around.",
      "Maybe I can find something to get me off this rock."
    ],

    "1,0": [
      "This place seems barren..."
    ],

    "2,0": [
      "It seems like some electronic systems here are still working.",
      "This laser seems particularly dangerous. I should exercise caution around it."
    ],

    "3,0": [
      "DIARY LOG: Day 53, 2836 A.D., entry 2.",
      "As my ship was going down, I looked down on this planet and my vision blurred.",
      "For a second I would have said there were *two* planets I was crashing into, not one.",
      "But when I looked again, it was only one.",
      "...",
      "A strange experience."
    ]


  }
}