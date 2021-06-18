function Tile(pos_, speed_, tileWidth_) {
  this.pos = pos_;
  this.speed = speed_;
  this.tileWidth = tileWidth_;
  this.radius = this.tileWidth / 2;
  this.tileColor = color(0, 255, 255);
  this.decay = false;
  this.whitch = int(random(3));

  this.render = function() {
    push();
    if (transparency) {
    tint(255, 120);
    }
    // imageMode(CENTER);
    rectMode(CENTER);
    // image(politicians[this.whitch], this.pos.x, this.pos.y, this.tileWidth, this.tileWidth);
    rect(this.pos.x, this.pos.y, this.tileWidth, this.tileWidth);
    pop();
  }

  this.decaying = function() {
    if (this.decay) {
      this.pos.y += this.speed;
    }
  }

  this.destroy = function(t) {
    if (this.pos.y > height + this.radius) {
      tiles.splice(t, 1);
    }
  }
}