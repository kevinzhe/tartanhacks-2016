
var Up1Pressed = false;
var Down1Pressed = false;
// var Up2Pressed = false;
// var Down2Pressed = false;
//BEGIN LIBRARY CODE
var x = 150;
var y = 150;
var r = 10;
var dx = 4;
var dy = 2;
var WIDTH;
var HEIGHT;
var ctx;

var intervalId;
var player1Score = 0;
var player2Score = 0;
var paddle1y;
var paddle1h;
var paddle1w;

var paddle2y;
var paddle2h;
var paddle2w;

function init_paddle() {
  paddle1y = HEIGHT/2;
  paddle1h = HEIGHT/3;
  paddle1w = 10;
  paddle2y = HEIGHT/2;
  paddle2h = HEIGHT/3;
  paddle2w = 10;
}

function init() {
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  intervalId = setInterval(draw, 15)
  return intervalId;
}

function circle(x,y,r) {
  
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}


//set rightDown or leftDown if the right or left keys are down
function onKeyDown(evt) {
  if (evt.keyCode == 81) Up1Pressed = true; //q
  else if (evt.keyCode == 65) Down1Pressed = true; //a
  // else if (evt.keyCode == 80) Up2Pressed = true; //p
  // else if (evt.keyCode == 76) Down2Pressed = true; //l
}

//and unset them when the right or left key is released
function onKeyUp(evt) {
  if (evt.keyCode == 81) Up1Pressed = false; //q
  else if (evt.keyCode == 65) Down1Pressed = false;
  // else if (evt.keyCode == 80) Up2Pressed = false;
  // else if (evt.keyCode == 76) Down2Pressed = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
       
function draw() {
  clear();

  


  // ctx.fillStyle = "rgba(255, 255, 255,0)";
  ctx.fillStyle = "#00A308";
  rect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = "#FFFFFF";
  ctx.moveTo(WIDTH/2,0);
  ctx.lineTo(WIDTH/2,HEIGHT);
  ctx.stroke();
  // ;
  ctx.fillStyle = "#003333";
  circle(x, y, r);

  ctx.fillStyle = "#00FF33";
  ctx.font = "30px Arial";

  ctx.fillText("Score: "+String(player1Score),50,50);
  ctx.fillText("Score: "+String(player2Score),WIDTH-200,50);
  //move the paddle if left or right is currently pressed
  if (Up1Pressed) paddle1y -= 5;
  else if (Down1Pressed) paddle1y += 5;

  paddle2y += getVal()
  // if (Up2Pressed) paddle2y -= 5;
  // else if (Down2Pressed) paddle2y += 5;

  rect(0, paddle1y, paddle1w, paddle1h);
  rect(WIDTH-paddle2w, paddle2y, WIDTH, paddle2h);

  if (y + dy < 0 || y + dy > HEIGHT)
    dy = -dy;

  if (x + r + dx > WIDTH - paddle2w)
    if (y > paddle2y && y < paddle2y+paddle2h){
        dy = 2 * ((y-(paddle1y+paddle1h/2))/paddle1h);
        dx = -dx;
    }
        
    else{
        setInterval(enddraw, 15);
        clearInterval(intervalId);}
  else if (x - r + dx < paddle1w)
    if (y > paddle1y && y < paddle1y+paddle1h){
        dy = 2 * ((y-(paddle1y+paddle1h/2))/paddle1h);
        dx = -dx;
        }
    else{
        setInterval(enddraw, 15);
        clearInterval(intervalId);}
 
  x += dx;
  y += dy;
}
function enddraw(){
    ctx.fillText("GAMEOVER",WIDTH/2-50,50);
}
init();
init_paddle();