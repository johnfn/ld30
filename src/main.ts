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
			body.velocity.y = -600;
		}
	}

	body.velocity.y += 30;
}

function controlBodyLadder(body:Phaser.Physics.Arcade.Body) {
	body.velocity.y = 0;

	if (cursors.up.isDown) {
		body.velocity.y = -300;
	}

	if (cursors.down.isDown) {
		body.velocity.y = 300;
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
		this.load.spritesheet("dialog", "assets/dialog.png", 400, 200, 1);
		this.load.spritesheet("rain", "assets/rain.png", 32, 32, 4);
		this.load.spritesheet("laserkey", "assets/laser.png", 32, 32, 1);
		this.load.spritesheet("shroomkey", "assets/shroom.png", 32, 32, 4);
		this.load.spritesheet("switchkey", "assets/switch.png", 32, 32, 1);
		this.load.spritesheet("ladderkey", "assets/ladder.png", 32, 32, 1);
		this.load.spritesheet("cratekey", "assets/crate.png", 32, 32, 1);

		this.load.tilemap("map", "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
	}

	public init():void {
		G.keyboard = G.game.input.keyboard;

		G.onDown(Phaser.Keyboard.SPACEBAR, this.switchPlayer, this);

		G.game.stage.backgroundColor = "#356b92";
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

		new Rain();

		tileset.setCollisionBetween(1, 1000, true, "collision");
		G.walls = tileset.createLayer("collision");

		var bg = tileset.createLayer("bg");

		G.player = new Player();
		this.game.add.existing(G.player);

		if (DEBUG.debug) {
			G.player.x = DEBUG.dPlayerX;
			G.player.y = DEBUG.dPlayerY;

			G.player.x += DEBUG.dMapX * GameMap.w;
			G.player.y += DEBUG.dMapY * GameMap.h;
		}

		/*
		var qq = new FollowText(G.player,
			[ { text: 'hello', time: 100 },
				{ text: 'hi', time: 100 },
				{ text: 'sup', time: 100 },
				{ text: 'bleh', time: 100 }
			]);

		this.game.add.existing(qq);
		*/

		G.hud = new HUD();

		this.game.add.existing(G.hud);

		G.focus = G.player;

		Laser.all = this.game.add.group(this.game.world);
		tileset.createFromObjects("lasers_up", 4, "laserkey", 0, true, true, Laser.all, Laser);

		Switch.all = this.game.add.group(this.game.world);
		tileset.createFromObjects("switch", 5, "switchkey", 0, true, true, Switch.all, Switch);

		BounceShroom.all = this.game.add.group(this.game.world);
		tileset.createFromObjects("bounceshroom", 6, "shroomkey", 0, true, true, BounceShroom.all, BounceShroom);

		Ladder.all = this.game.add.group(this.game.world);
		tileset.createFromObjects("ladder", 10, "ladderkey", 0, true, true, Ladder.all, Ladder);

		Crate.all = this.game.add.group(this.game.world);
		tileset.createFromObjects("crate", 11, "cratekey", 0, true, true, Crate.all, Crate);

		G.dialog = new Dialog();
		this.game.add.existing(G.dialog);

		G.dead = new Phaser.Group(G.game);

		/*
		var robotGroup = new Phaser.Group(G.game);
		tileset.createFromObjects("robot", 10, "robot", 0, true, true, robotGroup, Robot);
		var robot = robotGroup.getFirstAlive(); // there's only one.
		*/

		//G.robot = robot;
	}

	public update():void {
		(<any> this.game.physics.arcade).TILE_BIAS = 30;

		this.game.physics.arcade.collide(G.player, G.walls);
		this.game.physics.arcade.collide(G.robot, G.walls);

		/*
		this.game.physics.arcade.collide(G.player, Crate.all);
		this.game.physics.arcade.collide(G.walls, Crate.all);

		this.game.physics.arcade.collide(Laser.all, G.walls);
		this.game.physics.arcade.collide(Laser.all, Crate.all);
		*/

		this.game.physics.arcade.collide(G.rain, G.walls
			, (rain:Phaser.Sprite, wall) => {
				/*
				// this doesn't work?
	    rain.animations.add("die", [0, 1, 2, 3], 15, false);

	    if (rain.animations.currentAnim.name !== "die") {
		    rain.play("die");
		  }
		  */

		  if (rain.visible) {
			  rain.visible = false;

			  var rd:RainDrop = new RainDrop()
			  G.game.add.existing(rd);
			  rd.x = rain.x;
			  rd.y = rain.y;

			  rd.scale.x = rain.scale.x;
			  rd.scale.y = rain.scale.y;
			}
		});

		this.game.physics.arcade.overlap(G.player, Switch.all, (player, button) => {
			button.trigger();
		});

		G.player.onLadder = false;
		this.game.physics.arcade.overlap(G.player, Ladder.all, (player, ladder) => {
			G.player.onLadder = true;
		});

		this.game.physics.arcade.collide(G.player, BounceShroom.all, (player, shroom) => {
			if (shroom.y - player.y > 5) {
				G.player.body.velocity.y = -800;

				shroom.wither();
			}
		});

		G.dead.destroy(true);

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

				if (Dialogs.byMap[key]) {
					G.dialog.start(Dialogs.byMap[key]);
				}
			}

			for (var i = 0; i < MapObject.allMapObjects.length; i++) {
				var mo:MapObject = MapObject.allMapObjects[i];

				if (mo.mapX == relMapX && mo.mapY == relMapY) {
					mo.enterLevel.dispatch(relMapX, relMapY);
				}
			}

			G.player.enteredLevel.dispatch(relMapX, relMapY);
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