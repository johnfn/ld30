/// <reference path="../d/phaser.d.ts" />

var cursors:Phaser.CursorKeys;

class G {
	static walls:Phaser.TilemapLayer;
	static player:Player;
	static game:Phaser.Game;
	static hud:HUD;
	static keyboard:Phaser.Keyboard;
}

class Player extends Phaser.Sprite {
	body:Phaser.Physics.Arcade.Body;

	constructor() {
		super(G.game, 64, 0, "player", 0);

		G.game.physics.enable(this, Phaser.Physics.ARCADE);
 	}

	update():void {
		if (cursors.left.isDown) {
			this.body.velocity.x = -300;
		} else if (cursors.right.isDown) {
			this.body.velocity.x = 300;
		} else {
			this.body.velocity.x = 0;
		}

		if (cursors.up.isDown) {
			this.body.velocity.y = -300;
		} else if (cursors.down.isDown) {
			this.body.velocity.y = 300;
		} else {
			this.body.velocity.y = 0;
		}

		if (G.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			G.hud.switchPlayer.dispatch();
		}

	}
}

class Icon extends Phaser.Sprite {
	constructor() {
		super(G.game, 0, 0, "hud", 1);
	}
}

class HUD extends Phaser.Group {
	switchPlayer:Phaser.Signal;

	constructor() {
		super(G.game);

		this.add(new Icon());

		this.switchPlayer = new Phaser.Signal();
		this.switchPlayer.add(() => {
			console.log("hey!");
		});
	}
}

class MainState extends Phaser.State {
	public preload():void {
		//fw, fh, num frames,
		this.load.spritesheet("player", "assets/player.png", 32, 32);
		this.load.spritesheet("robot", "assets/robot.png", 32, 32);
		this.load.spritesheet("tileskey", "assets/tiles.png", 32, 32);
		this.load.spritesheet("hud", "assets/hud.png", 32, 32, 2);

		this.load.tilemap("map", "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
	}

	public init():void {
		G.keyboard = G.game.input.keyboard;
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

		G.hud = new HUD();

		this.game.add.existing(G.hud);
	}

	public update():void {
		this.game.physics.arcade.collide(G.player, G.walls);
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