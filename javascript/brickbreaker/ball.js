 function Ball(pos_, angle_, tileWidth_) {
   this.speed;
   this.pos = pos_;
   this.angle = angle_;
   this.vel = this.angle.copy();
   this.tileWidth = tileWidth_
   this.radius = tileWidth / 2; // 14
   this.rotation = 0;


   this.update = function() {
     this.vel = this.angle.copy();
     this.vel.normalize();
     this.vel.mult(this.speed);
     this.rotation = (this.pos.y) * PI / 4;
     this.pos.add(this.vel);
   }


   this.render = function() {
     push();
     translate(this.pos.x, this.pos.y);
     rotate(radians(this.rotation));

     // imageMode(CENTER);
     // image(Earth, 0, 0, this.tileWidth, this.tileWidth);
     ellipse(0, 0, this.tileWidth, this.tileWidth);
     pop();
   }


   this.hitpaddle = function() {
     if (dist(this.pos.x, this.pos.y, paddle.pos.x, paddle.pos.y) < this.radius + paddle.radius) {
       var ab = atan2(this.pos.y - paddle.pos.y, this.pos.x - paddle.pos.x);
       var aa = atan2(this.angle.y - this.angle.y * 2, this.angle.x - this.angle.x * 2);
       //float ay = atan2(200 - y, 200 - x);
       this.angle.x = cos(2 * ab - aa);
       this.angle.y = sin(2 * ab - aa);

       var di = dist(this.pos.x, this.pos.y, paddle.pos.x, paddle.pos.y);
       var dis = this.radius + paddle.radius - di;
       this.pos.x += cos(2 * ab - aa) * dis;
       this.pos.y += sin(2 * ab - aa) * dis;
     }
   }




   this.hitwalls = function() {
     if (this.pos.x >= width - boundary.x - this.radius) {
       this.pos.x = width - boundary.x - this.radius;
       this.angle.x = -this.angle.x;
     }
     if (this.pos.x <= 0 + boundary.x + this.radius) {
       this.pos.x = 0 + boundary.x + this.radius;
       this.angle.x = -this.angle.x;
     }
     //for now
     if (this.pos.y <= 0 + boundary.y + this.radius) {
       this.pos.y = 0 + boundary.y + this.radius;
       this.angle.y = -this.angle.y;
     }
   }




   this.hitfloor = function() {
     if (this.pos.y >= height) {
       this.pos.y = height;
       lives--;
       if (lives == 0) {
         newGame = true;
       } else {
         newRound = true
       }
     }
   }





   this.hittile = function() {
     for (var t = tiles.length - 1; t >= 0; t--) {
       if (tiles[t].decay == false) {
         if ((this.pos.x >= tiles[t].pos.x - tiles[t].radius - this.radius &&
             this.pos.x <= tiles[t].pos.x + tiles[t].radius + this.radius &&
             this.pos.y + this.vel.y >= tiles[t].pos.y - tiles[t].radius - this.radius &&
             this.pos.y + this.vel.y <= tiles[t].pos.y + tiles[t].radius + this.radius) ||
           (this.pos.x + this.vel.x >= tiles[t].pos.x - tiles[t].radius - this.radius &&
             this.pos.x + this.vel.x <= tiles[t].pos.x + tiles[t].radius + this.radius &&
             this.pos.y >= tiles[t].pos.y - tiles[t].radius - this.radius &&
             this.pos.y <= tiles[t].pos.y + tiles[t].radius + this.radius)) {
           //this.speed += ball.speed*ball.dimin;
           //this.dimin *= 0.3;
           tiles[t].decay = true;
           countertile = 0;
           console.log(countertile);
         }

         if (this.pos.x >= tiles[t].pos.x - tiles[t].radius - this.radius &&
           this.pos.x <= tiles[t].pos.x + tiles[t].radius + this.radius &&
           this.pos.y + this.vel.y >= tiles[t].pos.y - tiles[t].radius - this.radius &&
           this.pos.y + this.vel.y <= tiles[t].pos.y + tiles[t].radius + this.radius) {
           this.angle.y = -this.angle.y;
           break;
         }
         if (this.pos.x + this.vel.x >= tiles[t].pos.x - tiles[t].radius - this.radius &&
           this.pos.x + this.vel.x <= tiles[t].pos.x + tiles[t].radius + this.radius &&
           this.pos.y >= tiles[t].pos.y - tiles[t].radius - this.radius &&
           this.pos.y <= tiles[t].pos.y + tiles[t].radius + this.radius) {
           this.angle.x = -this.angle.x;
           break;
         }
       }
     }
   }
 }