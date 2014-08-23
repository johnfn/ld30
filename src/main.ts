/// <reference path="../d/phaser.d.ts" />

var cursors:Phaser.CursorKeys;

class G {
	static walls:Phaser.TilemapLayer;
	static player:Player;
}

class Player extends Phaser.Sprite {
	body:Phaser.Physics.Arcade.Body;

	constructor(game:Phaser.Game) {
		super(game, 64, 0, "player", 0);

		game.physics.enable(this, Phaser.Physics.ARCADE);
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
	}
}

class MainState extends Phaser.State {
	public preload():void {
		this.load.spritesheet("player", "assets/player.png", 32, 32, 1, 0, 0);
		this.load.spritesheet("robot", "assets/robot.png", 32, 32, 1, 0, 0);
		this.load.spritesheet("tileskey", "assets/tiles.png", 32, 32, 1, 0, 0);

		this.load.tilemap("map", "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
	}

	public init():void {

	}

	public create():void {
		cursors = this.game.input.keyboard.createCursorKeys();

		G.player = new Player(this.game);

		this.game.add.existing(G.player);

		var tileset:Phaser.Tilemap = this.game.add.tilemap("map", 32, 32, 30, 30); // w,h, mapw, maph
		tileset.addTilesetImage("tiles", "tileskey", 25, 25);
		tileset.setCollisionBetween(1, 151, true, "collision");

		G.walls = tileset.createLayer("collision");
	}

	public update():void {
		this.game.physics.arcade.collide(G.player, G.walls);
	}
}

class Game {
	game:Phaser.Game;
	state: Phaser.State;

	constructor() {
		this.state = new MainState();
		this.game = new Phaser.Game(800, 600, Phaser.WEBGL, "main", this.state);
	}

}

new Game();
