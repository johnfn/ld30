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
    G.onDown = function (key, callback, context) {
        if (typeof context === "undefined") { context = G; }
        G.game.input.keyboard.addKey(key).onDown.add(callback, context);
    };
    return G;
})();

function controlBody(body) {
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

var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity(game, x, y, spritesheet, frame) {
        _super.call(this, game, x, y, spritesheet, frame);

        game.physics.enable(this, Phaser.Physics.ARCADE);

        var superclassName = this.constructor.name;
        var currentState = game.state.getCurrentState();
        if (!currentState.groups[superclassName]) {
            var newGroup = game.add.group();
            currentState.groups[superclassName] = newGroup;
            this.game.add.existing(newGroup);
        }

        currentState.groups[superclassName].add(this);
    }
    return Entity;
})(Phaser.Sprite);

var Focusable = (function (_super) {
    __extends(Focusable, _super);
    function Focusable() {
        _super.apply(this, arguments);
        this.isFocused = true;
    }
    Focusable.prototype.toggle = function () {
        this.isFocused = !this.isFocused;
    };
    return Focusable;
})(Entity);

var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this, G.game, 64, 0, "player", 0);

        G.game.physics.enable(this, Phaser.Physics.ARCADE);
    }
    Player.prototype.update = function () {
        if (!this.isFocused)
            return;

        controlBody(this.body);
    };
    return Player;
})(Focusable);

var Icon = (function (_super) {
    __extends(Icon, _super);
    function Icon() {
        _super.call(this, G.game, 0, 0, "hud", 1);
    }
    return Icon;
})(Phaser.Sprite);

var HUD = (function (_super) {
    __extends(HUD, _super);
    function HUD() {
        _super.call(this, G.game);

        this.add(new Icon());

        this.switchPlayer = new Phaser.Signal();
        this.switchPlayer.add(function () {
            console.log("hey!");
        });
    }
    return HUD;
})(Phaser.Group);

var MainState = (function (_super) {
    __extends(MainState, _super);
    function MainState() {
        _super.apply(this, arguments);
        this.groups = {};
    }
    MainState.prototype.preload = function () {
        //fw, fh, num frames,
        this.load.spritesheet("player", "assets/player.png", 32, 32);
        this.load.spritesheet("robot", "assets/robot.png", 32, 32);
        this.load.spritesheet("tileskey", "assets/tiles.png", 32, 32);
        this.load.spritesheet("hud", "assets/hud.png", 32, 32, 2);

        this.load.tilemap("map", "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
    };

    MainState.prototype.init = function () {
        G.keyboard = G.game.input.keyboard;

        G.onDown(Phaser.Keyboard.SPACEBAR, this.switchPlayer, this);
    };

    MainState.prototype.switchPlayer = function () {
        G.hud.switchPlayer.dispatch();
    };

    MainState.prototype.create = function () {
        cursors = this.game.input.keyboard.createCursorKeys();

        var tileset = this.game.add.tilemap("map", 32, 32, 30, 30);
        tileset.addTilesetImage("tiles", "tileskey", 25, 25);
        tileset.setCollisionBetween(1, 151, true, "collision");

        G.walls = tileset.createLayer("collision");
        var bg = tileset.createLayer("bg");

        G.player = new Player();
        this.game.add.existing(G.player);

        G.hud = new HUD();

        this.game.add.existing(G.hud);
    };

    MainState.prototype.update = function () {
        this.game.physics.arcade.collide(G.player, G.walls);
    };
    return MainState;
})(Phaser.State);

var Game = (function () {
    function Game() {
        this.state = new MainState();
        G.game = new Phaser.Game(800, 600, Phaser.WEBGL, "main", this.state);
    }
    return Game;
})();

new Game();
