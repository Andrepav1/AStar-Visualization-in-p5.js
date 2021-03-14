class Position {

  constructor(_x,_y) {
    this.x = _x;
    this.y = _y;
  }

  exists() {
    return this.x && this.y;
  }

  equals(x, y) {
    if((typeof x) === "object") {
      let pos = x;
      return this.x == pos.x && this.y == pos.y;
    }
    else {
      return this.x == x && this.y == y;
    }
  }
}