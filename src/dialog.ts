/// <reference path="references.ts" />

class Dialog extends Phaser.Group {
  bottomOffset:number = 50;
  box:Phaser.Sprite;
  text:Phaser.Text;

  constructor() {
    super(G.game);

    this.addBox();
    this.addText();

    this.fixedToCamera = true;
  }

  addBox() {
    this.box = new Phaser.Sprite(G.game, 0, 0, "dialog", 1);

    this.box.y = G.SCREEN_HEIGHT - (this.box.height + this.bottomOffset);
    this.box.x = (G.SCREEN_WIDTH - this.box.width) / 2;

    this.add(this.box);
  }

  addText() {
    var style = {
      wordWrapWidth: this.box.width - 20,
      font: "15px Arial",
      wordWrap: true,
      fill: "#000000"
    };

    this.text = new Phaser.Text(G.game, this.box.x + 10, this.box.y + 10, "Werdz werds werds wwerds werds wwerds werds wwerds werds wwerds werds wwerds werds wwerds werds wwerds werds wwerds werds wwerds werds wwerds werds werds", style);

    this.add(this.text);
  }
}