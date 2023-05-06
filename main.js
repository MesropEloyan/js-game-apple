const SCALE = 0.185;
const WIDTH = 400;
const HEIGHT = 600;
const SCALED_WIDTH = SCALE * WIDTH;
const SCALED_HEIGHT = SCALE * HEIGHT;
const CYCLE_LOOP = [0, 1, 2, 3];
const FACING_DOWN = 0;
const FACING_UP = 1;
const FACING_LEFT = 2;
const FACING_RIGHT = 3;
const FRAME_LIMIT = 8;
const MOVEMENT_SPEED = 4;


let score = 0;
let pulse = document.getElementsByClassName('board');
let canvas = document.querySelector('canvas');
canvas.height = innerHeight;
canvas.width = innerWidth;
let ctx = canvas.getContext('2d');
let keyPresses = {};
let currentDirection = FACING_DOWN;
let currentLoopIndex = 0;
let frameCount = 0;
let positionX = 67;
let positionY = 131;
let character = new Image();
let apple = {
  x: 200,
  y: 200,
  x1: 600,
  y1: 600,
  x2: 400,
  y2: 400
};

greenQuan = 100;
let green_coords = [];
let imapple = new Image();
imapple.src = 'https://www.minecraftserverslist.net/servericon/13207/ts.paratonelcraft.net.png'


let health = 1000;
let healthBarWidth = canvas.width-6;
let healthBarHeight = 55;
let x = canvas.width / 2 - healthBarWidth / 2;
let y = 2;

let healthBar = new HealthBar(x, y, healthBarWidth, healthBarHeight, health, "red");


let green = new Image();
green.src = 'https://im.wampi.ru/2023/04/09/green.png'

let click = {
  x: 100,
  y: 200
}


forEach = Array.prototype.forEach;

forEach.call(pulse, function (b) {
    b.addEventListener('click', addElement);
});

function addElement(e) {
    var addDiv  = document.createElement('div'),
        mValue  = Math.max(this.clientWidth, this.clientHeight),
        rect    = this.getBoundingClientRect();
        sDiv    = addDiv.style,
        px      = 'px';

    sDiv.width  = sDiv.height = mValue + px;
    sDiv.left  = e.clientX - rect.left - (mValue / 2) + px;
    sDiv.top   = e.clientY - rect.top - (mValue / 2) + px;
    $("div.pulse").remove();
    addDiv.classList.add('pulse');
    this.appendChild(addDiv);
}


function loadImage() {
  character.src = 'https://im.wampi.ru/2023/03/26/5c8a63f099315e66d.png';
  character.onload = function() {
    window.requestAnimationFrame(gameLoop);
  };
}


function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(character,
                frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
                canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
}


for (var i = 0; green_coords.length < greenQuan; i++) {
  x = getRandomInt(0, canvas.width) 
  y = getRandomInt(0, canvas.height)
    green_coords.push(x);
    green_coords.push(y);
}  



loadImage();
let timerId = setInterval(() => health--, 25);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  healthBar.show(ctx);
  healthBar.updateHealth(health)
  ctx.drawImage(imapple, apple.x, apple.y);
  ctx.drawImage(imapple, apple.x1, apple.y1);
  ctx.drawImage(imapple, apple.x2, apple.y2);
  for (var i = 0; i < greenQuan*0.5; i++) {
    if( green_coords[i+1]>100){
      ctx.drawImage(green, green_coords[i], green_coords[i+1], 86, 86);
    }
  }

  let hasMoved = false;
  if (Math.floor((click.y / 10) - 7) < Math.floor(positionY / 10)) {
    moveCharacter(0, -MOVEMENT_SPEED, FACING_UP);
    hasMoved = true;
  } else if (Math.floor((click.y / 10) - 7) > Math.floor(positionY / 10)) {
    moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN);
    hasMoved = true;
  }

  if (Math.floor((click.x / 10) - 4) < Math.floor(positionX / 10)) {
    moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
    hasMoved = true;
  } else if (Math.floor((click.x / 10) - 4) > Math.floor(positionX / 10)) {
    moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
    hasMoved = true;
  }

  if ((positionX + 50 >= apple.x) && (positionX <= apple.x + (imapple.width-20))
   && (positionY + 80 >= apple.y) && (positionY <= apple.y + imapple.height -25)){
    score ++
    health += 75
    healthBar.updateHealth(health)
    apple.x = getRandomInt(50, canvas.width-50);
    apple.y = getRandomInt(50, canvas.height-50);  
    scoreSound()
  }

  if ((positionX + 50 >= apple.x1) && (positionX <= apple.x1 + (imapple.width-20))
  && (positionY + 80 >= apple.y1) && (positionY <= apple.y1 + imapple.height -25)){
   score ++
   health += 75
   healthBar.updateHealth(health)
   apple.x1 = getRandomInt(50, canvas.width-50);
   apple.y1 = getRandomInt(50, canvas.height-50);  
   scoreSound() 
 }

 if ((positionX + 50 >= apple.x2) && (positionX <= apple.x2 + (imapple.width-20))
 && (positionY + 80 >= apple.y2) && (positionY <= apple.y2 + imapple.height -25)){
  score ++
  health += 75
  healthBar.updateHealth(health)
  apple.x2 = getRandomInt(50, canvas.width-50);
  apple.y2 = getRandomInt(50, canvas.height-50);  
  scoreSound()
}



  if (hasMoved) {
    frameCount++;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= CYCLE_LOOP.length) {
        currentLoopIndex = 0;
      }
    }
  }

  if (!hasMoved) {
    currentLoopIndex = 0;
  }


  drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection, positionX, positionY);
  window.requestAnimationFrame(gameLoop);



  if (health <=0){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameOver();
    positionX = 67;
    positionY = 131;
    if ((click.x >= canvas.width / 2 - 100) && (click.x <= canvas.width/2+100)&&
    (click.y >= canvas.height/2 + 135) && (click.y <= canvas.height/2 + 210)){
      drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection, positionX, positionY);
      click.x = 100;
      click.y = 200;
      health = 1000;
      score = 0;
      document.querySelector('.score').innerHTML = score;
      healthBar.updateHealth(health);
      return;
    }
  }
}

function moveCharacter(deltaX, deltaY, direction) {
  if (positionX + deltaX > 0 && positionX + SCALED_WIDTH + deltaX < canvas.width) {
    positionX += deltaX;
  }
  if (positionY + deltaY > 0 && positionY + SCALED_HEIGHT + deltaY < canvas.height) {
    positionY += deltaY;
  }
  currentDirection = direction;
}


// Координаты нажатия
$(document).ready(function(){
  $('canvas').click(function(e){
    // положение элемента
    var pos = $(this).offset();
    var elem_left = pos.left;
    var elem_top = pos.top;
    // положение курсора внутри элемента
    click.x = e.pageX - elem_left;
    click.y = e.pageY - elem_top;

    if (click.x > canvas.width-30){
      click.x = canvas.width-31
    }
    if (click.x < 39){
      click.x = 40
    }

    if (click.y > canvas.height-50){
      click.y = canvas.height-51
    }
    if (click.y < 70){
      click.y = 70
    }
    console.log(click.x, click.y);
  });
});





function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


function gameOver() {
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.font = "bold 500% Poppins, sans-serif";
  ctx.fillText("СМЕРТЬ", canvas.width / 2, canvas.height / 2);
  ctx.font = "bold 300% Poppins, sans-serif";
  ctx.fillText(`Очков   ${score}`, canvas.width / 2, canvas.height / 2 + 90);

  ctx.fillStyle = 'black';
  ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 + 135, 200, 75);
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.font = '30px arial';
  ctx.fillText('Воскреснуть', canvas.width / 2, canvas.height / 2 + 180, 200);
}


function scoreSound() {
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = 'score.mp3'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}
