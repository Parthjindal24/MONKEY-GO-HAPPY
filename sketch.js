
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  
}



function setup() {
  createCanvas(600,600)
  monkey=createSprite(80,515,20,20,20);
monkey.addAnimation("monkeyrun",monkey_running);  
   monkey.scale = 0.2;
  
  ground=createSprite(40,580,1200,20);
  ground.velocityX=-9;
  ground.x = ground.width /2;
 
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,400,monkey.height);
  monkey.debug = true;
 
   score=0;
}


function draw() {
background("teal");
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:" + score,500,50);
  
  stroke("black")
  textSize(20);
  fill ("black")
  survivalTime=Math.ceil(frameCount/frameRate());
  text("SURVIVAL TIME:"+survivalTime,100,50)
  monkey.velocityY = monkey.velocityY + 0.8
  
 if(keyDown("space")&& monkey.y >= 400){
  monkey.velocityY=-15
 }  
  
  
  if(FoodGroup.isTouching(monkey)){
    score=score+1;
    FoodGroup.destroyEach();
  }
  
  if(obstacleGroup.isTouching(monkey)){
    
     score=0;
    survivalTime=0;
    
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
  }
  
  spawnbanana();
  spawnobstacles();
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
  monkey.collide(ground);
  
  
  
  drawSprites();
}

function spawnbanana(){
if(frameCount%150===0){
  var banana = createSprite(600,120,40,10);
  
 banana.y = Math.round(random(200,400)) ;
  banana.scale=0.1;
  banana.velocityX=-4
  banana.addImage(bananaImage);

    FoodGroup.add(banana);

}  

}

function spawnobstacles(){
 if(frameCount%160===0){
  
  var  obstacle = createSprite(600,550,20,20);
  obstacle.addImage(obstaceImage);
   obstacle.scale=0.2;
   obstacle.velocityX=-5;
   obstacleGroup.add(obstacle);
 }
}




