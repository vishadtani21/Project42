var backImage,backgr;
var player, player_running;
var ground,ground_img;
var gameover, gameoverImage;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score;

var banana,bananaImage;
var obstacle,obstaclesImage;
var FoodGroup,obstacleGroup;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");

  gameoverImage = loadImage("gameOver.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,370,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,380,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameover = createSprite(400,200,50,10);
  gameover.addImage(gameoverImage);
  gameover.visible=false;
  
  FoodGroup=new Group();
  obstaclesGroup= new Group();

  score=0;

}

function draw() { 
  background(0);
  
  drawSprites();

  stroke("white");
  fill("white");
  textSize(20);
  text("Score: "+score,350,50);

 

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  if(FoodGroup.isTouching(player)){
    score=score+2;
    FoodGroup.destroyEach();
    player.scale += 0.1;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    Food();
    obstacles();

    if(obstaclesGroup.isTouching(player)){
      gameState = END;
    }
    }

  else if(gameState===END){
    backgr.velocityX=0;
    player.visible=false;

    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();
     
    gameover.visible=true;

   
  }


}



function Food(){
  if (frameCount % 80 === 0) {
     var banana = createSprite(600,250,10,10);
     banana.y = Math.round(random(120,200));
     banana.addImage(bananaImage);
     banana.scale = 0.1;
     banana.velocityX = -4;
     banana.lifetime = 300;
 
     player.depth = banana.depth+1;
     FoodGroup.add(banana);
   }
 }

 function obstacles(){
  if (frameCount % 300 === 0) {
     var obstacle = createSprite(500,330,10,10);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.3;
     obstacle.velocityX=-4;
     obstacle.lifetime = 300;

     player.depth = obstacle.depth+1;
     obstaclesGroup.add(obstacle);
   }
 }
 
