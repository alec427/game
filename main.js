
$(document).ready(function(){
    (function() {
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;
    })();    
    var canvas = document.getElementById("canvas").getContext('2d');
    var myGame = new Game (canvas);
    setTimeout(function(){
        myGame.person= new Person(canvas, 100,100,0,0, 5,5,'red',3)
    },200) 

    function update(){
        // check keys
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
          requestAnimationFrame(update);

          update()
}});
