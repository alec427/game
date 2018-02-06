// // var background = new Image;
// // background.src="pictures/background2.png"
// // function Board (canvas,height,width){
// //     this.height = height;
// //     this.width = width;
// //     this.ctx = canvas ;
// //     this.image = background
// //     //Con esta funcion auto-ejecutamos drawBoard()
// //     this.image.addEventListener("load",this.drawBoard.bind(this) )
// // }

// // Board.prototype.drawBoard = function (){
// //     this.ctx.drawImage(this.image, 0, 0, 500, 200)
// //     this.ctx.drawImage(this.image, 0+500, 0,500, 200)


// // }
// function Platform(canvas, posX, posY, height, width) {
//     this.ctx = canvas
//     this.posX = posX
//     this.posY = posY
//     this.height = height
//     this.width = width
//   }
//   Platform.prototype.drawPlatform = function() {
//     this.ctx.fillRect(this.posX, this.posY, this.height, this.width)
//   }
//   platform1 = new Platform(canvas, 50, 50, 70, 70);
