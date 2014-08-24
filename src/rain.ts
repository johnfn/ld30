/// <reference path="references.ts" />

class Rain {
  constructor() {
    var emitter:Phaser.Particles.Arcade.Emitter = G.game.add.emitter(G.game.world.centerX, 0, 400);

    emitter.width = G.game.world.width;
    emitter.makeParticles('rain');

    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.5;

    emitter.setYSpeed(300, 500);
    emitter.setXSpeed(-5, 5);

    emitter.minRotation = 0;
    emitter.maxRotation = 0;

    emitter.start(false, 1600, 5, 0);

    emitter.fixedToCamera = true;
  }
}