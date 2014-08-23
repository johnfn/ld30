/// <reference path="references.ts" />

class Dialog extends Phaser.Group {
  bottomOffset:number = 50;
  box:Phaser.Sprite;
  text:Phaser.Text;
  pressXText:Phaser.Text;
  style:any;

  constructor() {
    super(G.game);

    this.addBox();
    this.addText();
    this.addPressXText();

    this.fixedToCamera = true;

    G.onDown(Phaser.Keyboard.X, this.advance, this);
  }

  addBox() {
    this.box = new Phaser.Sprite(G.game, 0, 0, "dialog", 1);

    this.box.y = G.SCREEN_HEIGHT - (this.box.height + this.bottomOffset);
    this.box.x = (G.SCREEN_WIDTH - this.box.width) / 2;

    this.add(this.box);

    this.setStyle();
  }

  setStyle() {
    this.style = {
      wordWrapWidth: this.box.width - 20,
      font: "15px Arial",
      wordWrap: true,
      fill: "#000"
    };
  }

  addText() {
    this.text = new Phaser.Text(G.game, this.box.x + 10, this.box.y + 10, "Werdz werds werds wwerds werds wwerds werds wwerds werds wwerds werds wwerds werds wwerds werds wwerds werds wwerds werds wwerds werds wwerds werds werds", this.style);
    this.add(this.text);
  }

  addPressXText() {
    this.pressXText = new Phaser.Text(G.game, 0, 0, "Press X to continue", this.style);

    this.pressXText.x = this.box.x + this.box.width - this.pressXText.width - 10;
    this.pressXText.y = this.box.y + this.box.height - this.pressXText.height;
    this.add(this.pressXText);
  }

  advance() {
    this.visible = false;
  }
}