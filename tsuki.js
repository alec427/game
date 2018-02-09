$(document).ready(function()
{
  
// Este es el canvas
	var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = 500,
    height = 200;
    function startScreen(){
        ctx.fillRect(0,0,500,200)
    }
    function selectCharacter(){
        ctx.fillRect(0,0,500,200)
    }
 
//Estas son las vars y tambien el audio
	keys = [],
	gravity = .1;
	canvas.width = width;
	canvas.height = height;
	x = 0
	friction = .9
    hongoArr = []
    minionArr = []
	var frames = 0
    var hongo = new Hongo();
    var minion = new Minion();
    var globalId;
    var interval;
    var player;
    keys = [];
    var score = 0
    player = new Player()
    var audio = new Audio('audio/Metroid.mp3');
    var fakeWin = new Audio('audio/fakevictory.mp3');
    var finalbattle= new Audio('audio/bossbattle.mp3')
    var win = new Audio('audio/victory.mp3')
    var imageHongo;
    var imageMinion;
    var test = 0
    platforms=[];
    player= new Player(ctx)

//Funciones audio
    function playtamales(){
    if (score===6){
        audio.pause()
        
    }}
   function playboss(){
       if (score===7){
        finalbattle.play();
       }
   }

//Checar colision 
    function collisionHongo(){
            hongoArr.forEach(function(hongo, index){
              if(player.crashWith(hongo)){
                if (player.y<hongo.y){
                    hongoArr.splice(index, 1);
                    score ++
                } else {
                    stopGame();
                }
              }
            });
          }

    function CheckCollition(){
        this.crashWith = function(hongo){
            if(
                (this.x < hongo.x + hongo.width) &&
                (this.y>160)&&
                (this.x + this.width > hongo.x)
            ){
                
                return true}
        }
    }
    function checkMinionCollision(){
      minionArr.forEach(function(minion){
        if(player.crashWith(minion)){
          stopGame();
        }})}
    function collisionMinion(){
            this.crashWith = function(minion){
              return  (this.x < minion.x + minion.width) &&
                      (this.x + this.width > minion.x) &&
                      (this.y < minion.y + minion.height) &&
                      (this.y + this.height > minion.y);
            }
          }

    function killHongo(){
            hongoArr.splice()
        }
          
//Estas son mis images
	var images = {
		bg: 'pictures/background.png',
		marioright: 'pictures/mario2.png',
		marioleft: 'pictures/mario.png',
        giphy: 'pictures/giphy.png',
        test: 'pictures/poulpi.png',
        platform: 'pictures/platform.png'
	}
    // Mario Volteando a la derecha
	var mar = new Image()
    mar.src = images.marioright;
    
    // Mario Volteando a la derecha
	var mar2 = new Image()
    mar2.src = images.marioleft;

    // Mario Volteando a la derecha
	var mar3 = new Image()
    mar3.src = "pictures/mariojump.png"

    //Foto de plataforma
        var plat = new Image()
        plat.src= images.platform;

    //Foto del hongo
	var hongoimg = new Image()
	hongoimg.src = images.giphy;

    //Fondo de pantalla
	var background1 = new Image()
    background1.src = images.bg
    //Agarrar imagen random para el enemigo
    var minionsImagesArray = ['pictures/ghost.png','pictures/box.png','pictures/giphy.png','pictures/ojo.png','pictures/poulpi.png'];
    function chooseImage(){
    var num = Math.floor(Math.random() * 5);
    imageHongo= minionsImagesArray[num];

    }
    var minionsBlissImagesArray = ['pictures/Quesadilla.png','pictures/burrito.png','pictures/taco.png','pictures/Chile.png','pictures/Totopo.png'];
    function chooseBlissImage(){
    var num1 = Math.floor(Math.random() * 5);
    imageMinion= minionsBlissImagesArray[num1];

    }

// Esta funcion para empezar el juego
    function startGame(){
        frames= 0;
        interval = setInterval(update,1000/60)
    }
// Esta funcion para parar el juego
    function stopGame(){
        ctx.fillStyle = "black";
        ctx.font = "40px Arial"
        ctx.fillText("GAME OVER", 150,100);
        clearInterval(interval)
    }


// Esta funcion refreshea todo y le da movimiento al jugador
	function update(){
    // Aqui esta todo lo de el movimiento del jugador
        //Aqui es el listener para los keys
            if (keys[87]) {
            // up
            if(!player.jumping){
            player.jumping = true;
            player.image=mar3
            player.velY = -player.speed*2;
            }
            }
            if (keys[68]) {
                // right
                if (player.velX < player.speed) {             
                    player.velX++;     
                    player.right = true;
                    player.left = false; 
                                  
                } 
            }     
            if (keys[65]) {         
                // left  
                if (player.velX > -player.speed) {
                    player.velX--;
                    player.left = true;
                    player.right = false;
                }
                
            }
        //Aqui es todo lo de su fisica y para que no se salga    
            player.velX *= friction;
		    player.velY += gravity;
		    player.x += player.velX;
		    player.y += player.velY;
		    frames++;
		    if (player.y >= height - player.height - 15)
		    {
		    	player.y = height - player.height - 15;
                player.jumping = false;
		    }
		    if (player.x >= width - player.width)
		    {
		    	player.x = width - player.width;
		    }
		    else if (player.x <= 0)
		    {
		    	player.x = 0;
            }
           //Esto cambia sus fotos
            if (player.jumping){
                 player.image=mar3;
            }else if(player.left){
                player.image = mar2;
            } else if (player.right){
                    player.image = mar;
            }       

    // Esto es para hacer clear canvas, dibujar todo y hacer refresh
        ctx.clearRect(0, 0, width, height);
        background.draw()
        drawMyHongo();
        drawMyMinion();
        collisionHongo();
        collisionMinion();
        player.drawPlayer();
        drawScore();
        chooseImage();
        spawnBliss();
        chooseBlissImage();
        checkIfMinionCrash();
        playtamales();
        playboss();

        if (frames%200===0){
            platforms.push (new Platform(ctx, 500, 120));
        }
        for (var p=0; p<platforms.length; p++){
            platforms[p].x--;
            platforms[p].drawPlatform(); 
            if (platforms[p].crashWith(player)){
            player.jumping = false;
            player.y = (plat.y+100)
            player.velY= 0;
            }
            
        }
    }
// Este es el score
    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("Score: "+score, 8, 20);
    }         
// Este es mi background
	background = {
		posX: 0,
		posY: 0,
		width: 500,
		height: 200,
		draw: function()
		{
			ctx.drawImage(background1, x--, 0, 500, 200);
			ctx.drawImage(background1, x + 500, 0, 500, 200);
			if (x < -500) x = 0;
		}
	}

// Estas son las plataformas
    
    function Platform (ctx, x, y){
        this.x=x;
        this.y=y;
        this.width = 50;
        this.height = 20;
        this.image = new Image();
        this.image.src = 'pictures/platform.png';
        this.ctx = ctx;
        this.drawPlatform = function(){
            this.ctx.drawImage(this.image,this.x, this.y, this.width, this.height)};
        this.crashWith = function(player){
                return  (this.x < player.x + player.width) &&
                        (this.x + this.width > player.x) &&
                        (this.y < player.y + player.height) &&
                        (this.y + this.height > player.y);
            }
    }
    
     

// Este es mi jugador
    function Player(ctx){
        CheckCollition.call(this)
        this.x = 20,
        this.y = 165,
        this.width = 20,
        this.height = 20,
        this.speed = 1.9,
        this.velX = 0,
        this.velY = 0;
        this.ctx = ctx
        this.image = new Image();
        this.image.src; 
        this.jumping= false;
        this.left = true;
        this.right = false;
    
    //Esto dibuja a player
        Player.prototype.drawPlayer = function()
        {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)}   
    }

//Este es un enemigo el hongo
	function Hongo(ctx){
        CheckCollition.call(this)
        this.x = 480,
		this.y = 165,
		this.width = 20,
		this.height = 20,
		this.speed = 2,
		this.ctx = ctx
		this.image = new Image();
		this.image.src = imageHongo;
	};
	Hongo.prototype.drawHongo = function(){
	
		this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
		this.x -= this.speed
    }
    //Esto los va generando en el array vacio
	function generateHongo()
	{
		hongoArr.push(new Hongo(ctx))
	}
    // Esto los dibuja
	function drawMyHongo()
	{
		if (frames % 100 === 0 && spawnBliss()===false) generateHongo();
		hongoArr.forEach(function(hongo)
		{
            hongo.drawHongo()
		})
    }
//Este es el main boss
    //Este es su constructor
        bliss= new Bliss(ctx)
        function Bliss(ctx){
            this.x = 350,
            this.y = 62,
            this.width = 155,
            this.height = 125,
            this.ctx = ctx
            this.image = new Image();
            this.image.src = 'pictures/bliss.png'
        };
    //Aqui aparece
        function spawnBliss(){
            if (score===7
            ){
                bliss.drawBliss();
                return true
            }
            else {
                return false
            }
                }
    //Esto lo dibuja
        Bliss.prototype.drawBliss = function(){
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    //Los minions de bliss
    function Minion(ctx){
        //checkMinionCollision.call(this)
        this.x = 350,
		this.y = 150,
		this.width = 40,
        this.height = 40,
        this.speed= 3.5,
		this.ctx = ctx
		this.image = new Image();
        this.image.src = imageMinion;
        this.crashWith = function(player){
            return  (this.x < player.x + player.width) &&
                    (this.x + this.width > player.x) &&
                    (this.y < player.y + player.height) &&
                    (this.y + this.height > player.y);
        }
    };
    function checkIfMinionCrash(){
        minionArr.forEach(m=>{
            if(m.crashWith(player)){
                stopGame();
            };
        })
    }
    Minion.prototype.drawMinion = function(){
	
		this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
		this.x -= this.speed
    }
    function generateMinion()
	{
		minionArr.push(new Minion(ctx))
	}
    function drawMyMinion()
	{
        if (frames%400===0&&frames>1&&spawnBliss()===true) generateMinion();
		minionArr.forEach(function(minion)
		{
            minion.drawMinion()
        })}
//Esto es para poder apretar mas de una tecla      
	document.body.addEventListener("keydown", function(e)
	{
        keys[e.keyCode] = true;
        if (keys[32]){
            $('.welcome').hide();
            audio.play()
            }
        if (keys[72]){
            $('.startScreen').hide();
            startGame();
            
        }
        
	});
	document.body.addEventListener("keyup", function(e)
	{
		keys[e.keyCode] = false;
    });



});
