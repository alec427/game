// $(document)
//   .ready(function() {
//     (function() {
//       var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
//       window.requestAnimationFrame = requestAnimationFrame;
//     })();
    // var canvas = document.getElementById("canvas"),
    //   ctx = canvas.getContext("2d"),
    //   width = 500,
    //   height = 200,
    //   player = {
    //     x: width / 2,
    //     y: 80,
    //     width: 5,
    //     height: 5,
    //     speed: 3,
    //     velX: 0,
    //     velY: 0,
    //     jumping: false
    // },
    // keys = [],
    // friction = 0.8,
    // gravity = 0.3;
    //x = 0;
    // canvas.width = width;
    // canvas.height = height;
    
    function update(){ 
        ctx.clearRect(0, 0, width, height);
        drawEverything();
        requestAnimationFrame(update); 
    }
    // function playerMovement() {
    //   if (keys[38] || keys[32]) {
    //     if (!player.jumping) {
    //       player.jumping = true;
    //       player.velY = -player.speed * 2;
    //     }
    //   }
    //   if (keys[39]) {
    //     if (player.velX < player.speed) {
    //       player.velX++;
    //     }
    //   }
    //   if (keys[37]) {
    //     if (player.velX > -player.speed) {
    //       player.velX--;
    //     }
    //   }
    //   player.velX *= friction;
    //   player.velY += gravity;
    //   x--;
    //   if (x < -500) {
    //     x = 0;
    //   }
    //   player.x += player.velX;
    //   player.y += player.velY;
    //   if (player.x >= width - player.width) {
    //     player.x = width - player.width;
    //   }
    //   else if (player.x <= 0) {
    //     player.x = 0;
    //   }
    //   if (player.y >= height - player.height) {
    //     player.y = height - player.height - 29;
    //     player.jumping = false;
    //   }
    // }
    
    // document.body.addEventListener("keydown", function(e) {
    //   keys[e.keyCode] = true;
    // });
    // document.body.addEventListener("keyup", function(e) {
    //   keys[e.keyCode] = false;
    // });
    // var background = new Image;
    // background.src = 'pictures/background2.png'
    // var mario = new Image;
    // mario.src = 'pictures/mario.png';
    // var mario2 = new Image;
    // mario.src = 'pictures/mario2.png';
    update();
   
    function drawEverything() {
      ctx.drawImage(background, x, 0, 500, 200);
      ctx.drawImage(background, x + 500, 0, 500, 200);
      player.draw();
    }
  });
