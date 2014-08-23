/// <reference path="references.ts" />

class Entity extends Phaser.Sprite {
  body:Phaser.Physics.Arcade.Body;

  constructor(game:Phaser.Game, x:number, y:number, spritesheet:string, frame:number) {
    super(game, x, y, spritesheet, frame);

    game.physics.enable(this, Phaser.Physics.ARCADE);

    var superclassName:string = <string> (<any> this).constructor.name;
    var currentState:MainState = (<MainState> game.state.getCurrentState());
    if (!currentState.groups[superclassName]) {
      var newGroup:Phaser.Group = game.add.group();
      currentState.groups[superclassName] = newGroup;
      this.game.add.existing(newGroup);
    }

    currentState.groups[superclassName].add(this);
  }
}
