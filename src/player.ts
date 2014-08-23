/// <reference path="references.ts" />

class Player extends Focusable {
  constructor() {
    super(G.game, 64, 0, "player", 0);
  }

  update():void {
    super.update();

    if (!this.isFocused) return;

    controlBody(this.body);
  }
}
