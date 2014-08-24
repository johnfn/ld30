/// <reference path="references.ts" />

class DEBUG {
  static debug:boolean = true;
  static showDialog:boolean = true;

  static dMapX = 3;
  static dMapY = 0;
}

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
  static screensSeen:{[key: string]: boolean} = {};

  static onDown:Function = (key:number, callback: Function, context:any = G) => {
    G.game.input.keyboard.addKey(key).onDown.add(callback, context);
  }
}

class GameMap {
  static x:number = -1; // trigger an enter event even on the first map
  static y:number = 0;

  static w:number = 640;
  static h:number = 640;
}

class Dialogs {
  static byMap:{[key: string]: string[]} = {
    "0,0": [
      "DIARY LOG: Day 53, 2836 A.D.",
      "I was on a routine reconnaissance mission in Sector 28 when my ship took heavy damage from an unknown assailant.",
      "My spaceship ran out of fuel.",
      "I thought that I was going to die in empty space, but a desperate scan turned up this strange world in a sector that was supposedly empty.",
      "I guess there's not much to do but look around."
    ],

    "1,0": [
      "This place seems barren but for plant life.",
      "It seems like the bounce shroom has taken a hold here.",
      "The bounce shroom is a mushroom-like plant with a coil-like skeleton.",
      "Jumping on one will spring you into the air, but also kill the plant.",
      "They are resilient, and seem to grow back if you leave and re-enter the area.",
      "If you jump on several in a row, you could jump very high."
    ],

    "2,0": [
      "It seems that, while all the inhabitants of this world are long gone, their technology continues to run.",
      "This laser seems particularly dangerous. I should exercise caution around it."
    ],

    "3,0": [
      "DIARY LOG: Day 53, 2836 A.D., entry 2.",
      "As I was hurtling downwards, I looked down on this planet and my vision blurred.",
      "For a second I would have said there were *two* planets I was crashing into, not one.",
      "But when I looked again, it was only one.",
      "...",
      "A strange experience."
    ]


  }
}