/// <reference path="references.ts" />

class Focusable extends Entity {
  isFocused:boolean = true;

  toggle() {
    this.isFocused = !this.isFocused;
  }
}
