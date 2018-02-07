$(document).ready(function()
{
    var interval;

// Este es el canvas
	var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"),
		width = 500,
		height = 200;

//Estas son las vars
	keys = [],
	gravity = .3;
	canvas.width = width;
	canvas.height = height;
	x = 0
	friction = .9
	hongoArr = []
	var frames = 0
    var hongo;
    var globalId;

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


// Esta funcion refreshea todo y le da movimiento al jugadoe
	function update(){
    // Aqui esta todo lo de el movimiento del jugador
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
    // Esto es para hacer clear canvas, dibujar todo y hacer refresh
    ctx.clearRect(0, 0, width, height);
    background.draw();
    player.draw();
    drawMyHongo();
    
    		
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
	player = {
		x: width / 2,
		y: 80,
		width: 20,
		height: 20,
		speed: 3,
		velX: 0,
		velY: 0,
		jumping: false,
		draw: function()
		{
			ctx.drawImage(mar, this.x, this.y, 20, 20);
		}
	};
//Este es un enemigo el hongo
	function Hongo(ctx)
	{
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
		if (frames % 100 === 0) generateHongo();
		hongoArr.forEach(function(hongo)
		{
			hongo.drawHongo()
		})
	}

// Estas son las funciones y propiedades para el movimiento
    player.moveLeft = function()
	{
		console.log('left')
		player.velX -= 2;
	}
	player.moveUp = function()
	{
		console.log('up')
		if (!player.jumping)
		{
			player.jumping = true;
			player.velY = -player.speed * 2;
		};
	}
	player.moveRight = function()
	{
		console.log('right')
		player.velX += 2;

	}
//Este es el movimiento de el jugador
	document.addEventListener("keydown",
		function(e)
		{
			switch (e.keyCode)
			{
				case 37:
					player.moveLeft();
					break;
				case 38:
					player.moveUp();
					break;
				case 39:
					player.moveRight();
                    break;
                case 27:
                console.log('para ya!!!')
                stopGame(update)
			}
		});

//Esto es para poder apretar mas de una tecla      
	document.body.addEventListener("keydown", function(e)
	{
		keys[e.keyCode] = true;
	});
	document.body.addEventListener("keyup", function(e)
	{
		keys[e.keyCode] = false;
	});
    startGame()
});