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
    
//Estas son las vars
	keys = [],
	gravity = .09;
	canvas.width = width;
	canvas.height = height;
	x = 0
	friction = .9
    hongoArr = []
	var frames = 0
    var hongo;
    var globalId;
    var interval;
    var player;
    keys = [];
    var myScore;

//Checar colision
    function collisionHongo(){
            hongoArr.forEach(function(hongo){
              if(player.crashWith(hongo)){
                stopGame();
              }
            });
          }

    function CheckCollition(){
        this.crashWith = function(hongo){
            return  (this.x < hongo.x + hongo.width) &&
                    (this.x + this.width > hongo.x) &&
                    (this.y < hongo.y + hongo.height) &&
                    (this.y + this.height > hongo.y);
        }
    }
          
//Estas son mis images
	var images = {
		bg: 'pictures/background2.png',
		marioright: 'pictures/mario2.png',
		marioleft: 'pictures/mario.png',
		giphy: 'pictures/giphy.png'
	}
    // Mario Volteando a la derecha
	var mar = new Image()
	mar.src = images.marioright;

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
            if (keys[38] || keys[32]) {
            // up arrow or space
            if(!player.jumping){
            player.jumping = true;
            player.image.src = "pictures/mariojump.png";
            player.velY = -player.speed*2;
            }
            }
            if (keys[39]) {
                // right arrow
                if (player.velX < player.speed) {             
                    player.velX++;     
                    player.right = true;
                    player.left = false; 
                                  
                } 
            }     
            if (keys[37]) {         
                // left arrow         
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
                player.image.src = "pictures/mario.png"
		    }
		    if (player.x >= width - player.width)
		    {
		    	player.x = width - player.width;
		    }
		    else if (player.x <= 0)
		    {
		    	player.x = 0;
            }
        if (player.jumping){
             player.image.src = 'pictures/mariojump.png'}
        else if(player.left){
            player.image.src = 'pictures/mario.png'
             }
             else{
                player.image.src = 'pictures/mario2.png'
             }

    // Esto es para hacer clear canvas, dibujar todo y hacer refresh
        ctx.clearRect(0, 0, width, height);
        background.draw()
        drawMyPlayer();
        drawMyHongo();
        collisionHongo()}

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
    function Player(ctx){
        CheckCollition.call(this)
        this.x = 480,
        this.y = 165,
        this.width = 20,
        this.height = 20,
        this.speed = 1.9,
        this.velX = 0,
        this.velY = 0;
        this.ctx = ctx
        this.image = new Image();
        this.image.src = 'pictures/mario.png'
        this.jumping= false
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

//Este es un enemigo el hongo
	function Hongo(ctx){
        CheckCollition.call(this)
        this.x = 480,
		this.y = 165,
		this.width = 20,
		this.height = 20,
		this.speed = 1,
		this.velX = 0,
		this.velY = 0;
		this.ctx = ctx
		this.image = new Image();
		this.image.src = 'pictures/giphy.png'
	};
	Hongo.prototype.drawHongo = function()
	{
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
		if (frames % 120 === 0) generateHongo();
		hongoArr.forEach(function(hongo)
		{
			hongo.drawHongo()
		})
	}

//Esto es para poder apretar mas de una tecla      
	document.body.addEventListener("keydown", function(e)
	{
        keys[e.keyCode] = true;
        if (keys[27]){
            $('.startScreen').hide();
            startGame();
            }   
	});
	document.body.addEventListener("keyup", function(e)
	{
		keys[e.keyCode] = false;
    });


});