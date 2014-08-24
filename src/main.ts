/// <reference path="references.ts" />

var cursors:Phaser.CursorKeys;

function controlBody(body:Phaser.Physics.Arcade.Body) {
	if (cursors.left.isDown) {
		body.velocity.x = -300;
	} else if (cursors.right.isDown) {
		body.velocity.x = 300;
	} else {
		body.velocity.x = 0;
	}

	if (cursors.up.isDown) {
		if ((body.blocked.down || body.touching.down) && body.velocity.y > -600) {
			console.log("derp");

			body.velocity.y = -600;
		}
	}

	body.velocity.y += 30;
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
		this.load.spritesheet("dialog", "assets/dialog.png", 400, 200, 1);
		this.load.spritesheet("laserkey", "assets/laser.png", 32, 32, 1);
		this.load.spritesheet("shroomkey", "assets/shroom.png", 32, 32, 2);
		this.load.spritesheet("switchkey", "assets/switch.png", 32, 32, 1);

		this.load.tilemap("map", "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
	}

	public init():void {
		G.keyboard = G.game.input.keyboard;

		G.onDown(Phaser.Keyboard.SPACEBAR, this.switchPlayer, this);
	}

 	switchPlayer():void {
 		if (!G.foundRobot) return;

		G.hud.switchPlayer.dispatch();

		G.player.toggle();
		G.robot.toggle();

		if (G.player.isFocused) {
			G.focus = G.player;
		}

		if (G.robot.isFocused) {
			G.focus = G.robot;
		}
 	}

	public create():void {
		G.game.world.setBounds(0, 0, GameMap.w, GameMap.h);

		cursors = this.game.input.keyboard.createCursorKeys();

		var tileset:Phaser.Tilemap = this.game.add.tilemap("map", 32, 32, 30, 30); // w,h, mapw, maph
		tileset.addTilesetImage("tiles", "tileskey", 25, 25);
		tileset.setCollisionBetween(1, 151, true, "collision");

		G.walls = tileset.createLayer("collision");
		var bg = tileset.createLayer("bg");

		G.player = new Player();
		this.game.add.existing(G.player);

		var qq = new FollowText(G.player,
			[ { text: 'hello', time: 100 },
				{ text: 'hi', time: 100 },
				{ text: 'sup', time: 100 },
				{ text: 'bleh', time: 100 }
			]);

		this.game.add.existing(qq);

		/*
		G.robot = new Robot();
		this.game.add.existing(G.robot);

		G.robot.x = 200;
		G.robot.y = 50;
		*/

		G.hud = new HUD();

		this.game.add.existing(G.hud);

		G.focus = G.player;

		G.dialog = new Dialog();
		this.game.add.existing(G.dialog);

		tileset.createFromObjects("lasers_up", 4, "laserkey", 0, true, true, this.game.world, Laser);

		Switch.all = this.game.add.group(this.game.world);
		tileset.createFromObjects("switch", 5, "switchkey", 0, true, true, Switch.all, Switch);

		BounceShroom.all = this.game.add.group(this.game.world);
		tileset.createFromObjects("bounceshroom", 6, "shroomkey", 0, true, true, BounceShroom.all, BounceShroom);
	}

	public update():void {
		(<any> this.game.physics.arcade).TILE_BIAS = 30;

		this.game.physics.arcade.collide(G.player, G.walls);
		this.game.physics.arcade.collide(G.robot, G.walls);

		this.game.physics.arcade.overlap(G.player, Switch.all, (player, button) => {
			button.trigger();
		});

		this.game.physics.arcade.collide(G.player, BounceShroom.all, (player, shroom) => {
			if (shroom.y - player.y > 5) {
				G.player.body.velocity.y = -800;

				shroom.wither();
			}
		});

		this.camera.follow(G.focus, Phaser.Camera.FOLLOW_PLATFORMER);

		this.checkForCameraUpdate();
	}

	checkForCameraUpdate():void {
		var newMapX:number = Math.floor(G.focus.x / GameMap.w) * GameMap.w;
		var newMapY:number = Math.floor(G.focus.y / GameMap.h) * GameMap.h;

		var relMapX:number = Math.floor(G.focus.x / GameMap.w);
		var relMapY:number = Math.floor(G.focus.y / GameMap.h);

		if (newMapX != GameMap.x || newMapY != GameMap.y) {
			G.game.world.setBounds(newMapX, newMapY, GameMap.w, GameMap.h);

			GameMap.x = newMapX;
			GameMap.y = newMapY;

			var key = relMapX + "," + relMapY;
			if (!(key in G.screensSeen)) {
				G.screensSeen[key] = true;

				G.dialog.start(Dialogs.byMap[key]);
			}

			for (var i = 0; i < MapObject.allMapObjects.length; i++) {
				var mo:MapObject = MapObject.allMapObjects[i];

				if (mo.mapX == relMapX && mo.mapY == relMapY) {
					mo.enterLevel.dispatch(relMapX, relMapY);
				}
			}
		}
	}
}

class Game {
	state: Phaser.State;

	constructor() {
		this.state = new MainState();
		G.game = new Phaser.Game(G.SCREEN_WIDTH, G.SCREEN_HEIGHT, Phaser.WEBGL, "main", this.state);
	}
}

new Game();