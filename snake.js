let blocksSize = 25;
let rows = 20;
var cols = 20;
let board;
let context;
let snakeX = blocksSize*5;
let snakeY = blocksSize*5;
let foodX;
let foodY;
let velocityX=0;
let velocityY=0;
let snakeBody =[];
let gameOver = false;

window.onload = function(){
  board = document.getElementById("board");
  board.height = rows * blocksSize;
  board.width =cols * blocksSize;
  context = board.getContext("2d");
  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000/10); 

}
 function update(){
  if(gameOver){
    return;
  }
  context.fillStyle="black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle="red";
  context.fillRect(foodX, foodY, blocksSize, blocksSize);

  if(snakeX == foodX && snakeY == foodY){ 
    snakeBody.push([foodX, foodY]);
    placeFood();
  }
 
  context.fillStyle="lime";
  snakeX += velocityX*blocksSize;
  snakeY += velocityY*blocksSize;
  context.fillRect(snakeX,snakeY, blocksSize, blocksSize);
  if (snakeX < 0 || snakeX > cols*blocksSize || snakeY < 0 || snakeY > rows*blocksSize) {
    gameOver = true;
    alert("Game Over");
}

for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
        gameOver = true;
        alert("Game Over");

  for(let i = 0; i< snakeBody.length; i++){
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksSize, blocksSize);
  }
  for( let i=snakeBody.length-1; i>0; i--){
    snakeBody[i] = snakeBody[i-1];
  }
  if(snakeBody.length){
    snakeBody[0]=[snakeX, snakeY];
  }
}
}
 }
      

function placeFood(){
  foodX = Math.floor(Math.random()*cols) *blocksSize;
  foodY = Math.floor(Math.random()*cols) * blocksSize;
}

function changeDirection(e){
  if(e.code == "ArrowUp" &&velocityY!=1){
    velocityX = 0;
    velocityY = -1;
  }
  else if(e.code == "ArrowLeft" && velocityX!=1){
    velocityX = -1;
    velocityY = 0;
  }
  else if(e.code == "ArrowDown" && velocityY!=1){
    velocityX = 0;
    velocityY = 1;
  }
  else if(e.code == "ArrowRight" && velocityX!=-1){
    velocityX = 1;
    velocityY = 0;
  }
}
