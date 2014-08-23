/// <reference path="../d/phaser.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cursors;

var G = (function () {
    function G() {
    }
    return G;
})();

var Player = (function (_super) {
    __extends(Player, _super);
    function Player(game) {
        _super.call(this, game, 64, 0, "player", 0);

        game.physics.enable(this, Phaser.Physics.ARCADE);
    }
    Player.prototype.update = function () {
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
    };
    return Player;
})(Phaser.Sprite);

var MainState = (function (_super) {
    __extends(MainState, _super);
    function MainState() {
        _super.apply(this, arguments);
    }
    MainState.prototype.preload = function () {
        this.load.spritesheet("player", "assets/player.png", 32, 32, 1, 0, 0);
        this.load.spritesheet("robot", "assets/robot.png", 32, 32, 1, 0, 0);
        this.load.spritesheet("tileskey", "assets/tiles.png", 32, 32, 1, 0, 0);

        this.load.tilemap("map", "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
    };

    MainState.prototype.init = function () {
    };

    MainState.prototype.create = function () {
        cursors = this.game.input.keyboard.createCursorKeys();

        G.player = new Player(this.game);

        this.game.add.existing(G.player);

        var tileset = this.game.add.tilemap("map", 32, 32, 30, 30);
        tileset.addTilesetImage("tiles", "tileskey", 25, 25);
        tileset.setCollisionBetween(1, 151, true, "collision");

        G.walls = tileset.createLayer("collision");
    };

    MainState.prototype.update = function () {
        this.game.physics.arcade.collide(G.player, G.walls);
    };
    return MainState;
})(Phaser.State);

var Game = (function () {
    function Game() {
        this.state = new MainState();
        this.game = new Phaser.Game(800, 600, Phaser.WEBGL, "main", this.state);
    }
    return Game;
})();

new Game();
