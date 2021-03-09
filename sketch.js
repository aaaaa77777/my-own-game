var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_running;
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;



function preload(){
  boy_running =loadAnimation("boy1-removebg-preview.png","boy2-removebg-preview.png","boy3-removebg-preview.png","boy5-removebg-preview.png","boy6__2_-removebg-preview.png","boy7-removebg-preview.png","boy8-removebg-preview.png","boy9-removebg-preview.png","boy10-removebg-preview.png");
  
  
  groundImage = loadImage("background temple.png");
  
 
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("image-removebg-preview.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1200, 600);
  

  
  ground = createSprite(200,580,1200,600);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  ground.scale = 2.4;

  boy = createSprite(25,180,20,50);
  
  boy.addAnimation("running", boy_running);

  boy.scale = 0.6;


  gameOver = createSprite(500,200);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(500,310);
  restart.addImage(restartImg);
  
  gameOver.scale = 1.4;
  restart.scale = 1.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,590,400,10);
  invisibleGround.visible = false;
  

  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
 
  background(255);

  console.log(boy.y);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && boy.y >= 520) {
      boy.velocityY = -17;
    }
  
    boy.velocityY = boy.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    boy.collide(invisibleGround);
   
    spawnObstacles();
    if(obstaclesGroup.isTouching(boy)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    boy.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
   
    //change the boy animation
   
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
  fill("yellow");
  textSize(40);
    text("Score: "+ score, 500,100);
}



function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(1000,565,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.9;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();

  
  boy.changeAnimation("running",boy_running);
 
  
  score = 0;
  
}