/// <reference path="references.ts" />

class FollowText extends Phaser.Group {
  target:Phaser.Sprite;
  style:any;
  dialog:any; // too lazy to specify proper type
  text:Phaser.Text;
  timeLeft:number;

  constructor(target:Phaser.Sprite, dialog:any) {
    //[ { text: 'hello', time: 10 },

    super(G.game);

    this.setStyle();

    this.dialog = dialog;
    this.target = target;
    this.text = new Phaser.Text(G.game, this.target.x, this.target.y - 20, "", this.style);

    this.add(this.text);

    this.newDialog(dialog);
  }

  setStyle() {
    this.style = {
      wordWrapWidth: 150,
      font: "12px Arial",
      wordWrap: true,
      fill: "white"
    };
  }

  update() {
    this.timeLeft--;

    this.text.x = this.target.x;
    this.text.y = this.target.y - 20;

    if (this.timeLeft < 0) {
      if (this.dialog.length == 1) {
        this.destroy(true);
        return;
      }

      this.newDialog(this.dialog);
    }
  }

  newDialog(dialog:any) {
    this.dialog.shift();

    this.timeLeft = dialog[0].time;
    this.text.text = dialog[0].text;
  }
}