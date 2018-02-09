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
    
    
//Estas son las vars
	keys = [],
	gravity = .1;
	canvas.width = width;
	canvas.height = height;
	x = 0
	friction = .9
    hongoArr = []
    minionArr = []
	var frames = 0
    var hongo = new Hongo;
    var minion = new Minion;
    var globalId;
    var interval;
    var player;
    keys = [];
    var myScore;
    player = new Player

//Checar colision
    function collisionHongo(){
            hongoArr.forEach(function(hongo, index){
              if(player.crashWith(hongo)){
                if (player.y<hongo.y){
                    hongoArr.splice(index, 1);
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

    function collisionBliss(){
        
          if(player.crashWith(bliss)){
                stopGame();
            }
        }
    function checkBlissCollision(){
      this.crashWith = function(bliss){
        return  (this.x < bliss.x + bliss.width) &&
                (this.y < bliss.y + bliss.height) &&
                (this.y + this.height > bliss.y) &&
                (this.x + this.width > bliss.x);
    }}
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
		bg: 'pictures/background2.png',
		marioright: 'pictures/mario2.png',
		marioleft: 'pictures/mario.png',
        giphy: 'pictures/giphy.png',
        test: 'pictures/poulpi.png',
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

    //Foto del hongo
	var hongoimg = new Image()
	hongoimg.src = images.giphy;

    //Fondo de pantalla
	var background1 = new Image()
	background1.src = images.bg

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
        spawnBliss();
        //drawMyHongo();
        drawMyMinion();
        collisionHongo();
        collisionBliss();
        collisionMinion();
        drawMyPlayer();
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


// Este es mi jugador
    player= new Player(ctx)
    diego= new Player(ctx)
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
    };
    //Esto dibuja a player
        Player.prototype.drawPlayer = function()
        {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)}   
        function drawMyPlayer()
	    {
	    	player.drawPlayer()
        }
        
        Player.prototype.drawDiego = function()
        {
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)}   
            function drawMyDiego()
        {
            player.drawDiego()
        }
        wtf = 'pictures/giphy.png'
        console.log(diego.image.src)

//Este es un enemigo el hongo
	function Hongo(ctx){
        CheckCollition.call(this)
        this.x = 480,
		this.y = 165,
		this.width = 20,
		this.height = 20,
		this.speed = 1,
		this.ctx = ctx
		this.image = new Image();
		this.image.src = 'pictures/giphy.png'
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
		if (frames % 200 === 0&&frames<1500) generateHongo();
		hongoArr.forEach(function(hongo)
		{
            hongo.drawHongo()
		})
    }
//Este es el main boss
    //Este es su constructor
        bliss= new Bliss(ctx)
        function Bliss(ctx){
            checkBlissCollision.call(this)
            this.x = 350,
            this.y = 62,
            this.width = 155,
            this.height = 125,
            this.ctx = ctx
            this.image = new Image();
            this.image.src = 'pictures/bowser.png'
        };
    //Aqui aparece
        function spawnBliss(){
            if (frames>150
            ){
                bliss.drawBliss();
                return true
            }
                }
    //Esto lo dibuja
        Bliss.prototype.drawBliss = function(){
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    //Los minions de bliss
    function Minion(ctx){
        checkMinionCollision.call(this)
        this.x = 350,
		this.y = 150,
		this.width = 40,
        this.height = 40,
        this.speed= 1,
		this.ctx = ctx
		this.image = new Image();
		this.image.src = 'pictures/taco.png'
    };
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
        if (spawnBliss() === true&& frames%150===0) generateMinion();
		minionArr.forEach(function(minion)
		{
            minion.drawMinion()
        })}
//Esto es para poder apretar mas de una tecla      
	document.body.addEventListener("keydown", function(e)
	{
        keys[e.keyCode] = true;
        if (keys[27]){
            $('.startScreen').hide();
            }
        if (keys[49]){
            $('.selectCharacter').hide();
            startGame();
            }   
	});
	document.body.addEventListener("keyup", function(e)
	{
		keys[e.keyCode] = false;
    });



});
