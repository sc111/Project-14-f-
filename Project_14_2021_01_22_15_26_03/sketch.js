var score =0;
var PLAY =1;
var END = 0;
var gameState = PLAY;
var sword,swordImage;
var enemy, enemyImage, enemyGroup;
var fruitGroup,fruit1Image,fruit2Image,fruit3Image,fruit4Image,gameOverImage


function preload(){
  swordImage = loadImage("sword.png");
  enemyImage = loadAnimation("alien1.png", "alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  
  sound = loadSound("knifeSwooshSound.mp3");
  sound1 = loadSound("gameover.mp3");
}
function setup(){
  createCanvas(600,600);
  sword = createSprite(200,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  
 
}
function draw(){
  background("white");
  if(gameState === PLAY){
    
  
    sword.y = World.mouseY;
  sword.x = World.mouseX;
      
  fruits();
  enemy();
   if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
     
    sound.play();
    score = score +2;
  }else
    if(enemyGroup.isTouching(sword)){
      gameState = END;

      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      enemyGroup.setVelocityXEach(0);
      
      sword.addImage(gameOverImage);
      sound1.play();
      sword.x = 200;
      sword.y = 200;
      
    }
  }
  
drawSprites();
  text("Score :"+ score,300,30);
}
function fruits() {
  if(World.frameCount%80===0){
    fruit = createSprite(400,200,20,20);
    fruit.scale =0.2;
    r=Math.round(random(1,4));
    if(r == 1){
      fruit.addImage(fruit1)
       fruit.x = 400;
    fruit.velocityX=-(7+(score/4));
    }else if(r == 2){
      fruit.x = 0;
    fruit.velocityX=(7+(score/4))
      fruit.addImage(fruit2)
    }else if(r == 3){
      fruit.addImage(fruit3)
    }else if(r == 4){
      fruit.addImage(fruit4)
  }
    
    fruit.y =Math.round(random(50,340));
    
    fruit.velocityX= -7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}
function enemy(){
    if(World.frameCount% 200 === 0){
    var enemy = createSprite(400,200,20,20);
    enemy.addAnimation("moving",enemyImage);
    enemy.y = Math.round(random(100,300));
    enemy.velocityX = -(8+(score/10));
    enemy.setLifetime = 50;
    
    enemyGroup.add(enemy);
   }
} 