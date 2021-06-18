function Paddle(pos_) {
  this.pos = pos_;
  this.rotation = 0;
  this.radius = tileWidth * 1.7;
  this.speed = 0;

  //draw a ellipse
  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(radians(this.rotation));
    // imageMode(CENTER);
    // image(Earth, 0, 0, this.radius * 2, this.radius * 2);
    ellipse(0, 0, this.radius * 2, this.radius * 2);
    pop();
  }


  this.hittile = function() {
    for (var t = tiles.length - 1; t >= 0; t--) {
      if (dist(this.pos.x, this.pos.y, tiles[t].pos.x, tiles[t].pos.y) < this.radius + tiles[t].tileWidth / 2) {
        lives--;
        if (lives == 0) {
          newGame = true;
        } else {
         newRound = true
          }
        }
        }
      }


    this.update = function() {
      this.pos.x += this.speed;
      this.pos.x = constrain(this.pos.x, boundary.x - this.radius * 3 / 5, width - boundary.x + this.radius * 3 / 5);
      this.rotation = ((this.pos.x - width / 2) * PI) / 4;
    }
  }