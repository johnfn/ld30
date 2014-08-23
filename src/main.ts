/// <reference path="references.ts" />

var cursors:Phaser.CursorKeys;

class G {
	static walls:Phaser.TilemapLayer;
	static player:Player;
	static game:Phaser.Game;
	static hud:HUD;
	static keyboard:Phaser.Keyboard;
	static robot:Robot;

	static onDown:Function = (key:number, callback: Function, context:any = G) => {
		G.game.input.keyboard.addKey(key).onDown.add(callback, context);
	}
}

function controlBody(body:Phaser.Physics.Arcade.Body) {
	if (cursors.left.isDown) {
		body.velocity.x = -300;
	} else if (cursors.right.isDown) {
		body.velocity.x = 300;
	} else {
		body.velocity.x = 0;
	}

	if (cursors.up.isDown) {
		body.velocity.y = -300;
	} else if (cursors.down.isDown) {
		body.velocity.y = 300;
	} else {
		body.velocity.y = 0;
	}
}

class Icon extends Phaser.Sprite {
	constructor() {
		super(G.game, 0, 0, "hud", 1);
	}
}

class MainState extends Phaser.State {
	groups: {[key: string]: Phaser.Group} = {};

	public preload():void {
		//fw, fh, num frames,
		this.load.spritesheet("player", "assets/player.png", 32, 32);
		this.load.spritesheet("robot", "assets/robot.png", 32, 32);
		this.load.spritesheet("tileskey", "assets/tiles.png", 32, 32);
		this.load.spritesheet("hud", "assets/hud.png", 32, 32, 2);
		this.load.spritesheet("selection", "assets/selection.png", 32, 32, 1);

		this.load.tilemap("map", "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
	}

	public init():void {
		G.keyboard = G.game.input.keyboard;

		G.onDown(Phaser.Keyboard.SPACEBAR, this.switchPlayer, this);
	}

 	switchPlayer():void {
		G.hud.switchPlayer.dispatch();
 	}

	public create():void {
		cursors = this.game.input.keyboard.createCursorKeys();

		var tileset:Phaser.Tilemap = this.game.add.tilemap("map", 32, 32, 30, 30); // w,h, mapw, maph
		tileset.addTilesetImage("tiles", "tileskey", 25, 25);
		tileset.setCollisionBetween(1, 151, true, "collision");

		G.walls = tileset.createLayer("collision");
		var bg = tileset.createLayer("bg");

		G.player = new Player();
		this.game.add.existing(G.player);

		G.robot = new Robot();
		this.game.add.existing(G.robot);

		G.robot.x = 200;
		G.robot.y = 50;

		G.hud = new HUD();

		this.game.add.existing(G.hud);
	}

	public update():void {
		this.game.physics.arcade.collide(G.player, G.walls);
		this.game.physics.arcade.collide(G.robot, G.walls);
	}
}

class Game {
	state: Phaser.State;

	constructor() {
		this.state = new MainState();
		G.game = new Phaser.Game(800, 600, Phaser.WEBGL, "main", this.state);
	}

}

new Game();