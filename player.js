addEventListener("keydown", function(e){
    if (keys[38] || keys[32]) {
        // up arrow or space
      if(!player.jumping){
       player.jumping = true;
       player.velY = -player.speed*2;
      }
    }
    if (keys[39]) {
        // right arrow
        if (player.velX < player.speed) {             
            player.velX++;         
         }     
    }     
    if (keys[37]) {         
        // left arrow         
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }
 
    player.velX *= friction;
 
    player.velY += gravity;
 
    player.x += player.velX;
    player.y += player.velY;
 
    if (player.x >= width-player.width) {
        player.x = width-player.width;
    } else if (player.x <= 0) {         
        player.x = 0;     
    }    
  
    if(player.y >= height-player.height){
        player.y = height - player.height;
        player.jumping = false;
    }


    },

    player.up = function(){
        if(!player.jumping){
            player.jumping = true;
            player.velY = -player.speed*2;
      }
      
      player.left = function(){
        if (player.velX > -player.speed) {
            player.velX--;
        };
      }
      
      player.right = function(){
        if (player.velX < player.speed) {             
            player.velX++;         
         }   
      }

      function(e){
        switch(e.keyCode){
          case 38:
            player.up();
            break;
          case 40:
          player.down();
            break;
          case 37:
          player.left();
            break;
          case 39:
          player.right();
            break;