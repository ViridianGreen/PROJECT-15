var path,boy,cash,diamonds,jewelry,sword;
var pathImg,boyImg,cashImg,diamondsImg,jewelryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jewelryG,swordGroup;
var yarncount = 0;
var jewelscount = 0;
var biscuitcount = 0;


//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("background.jpg");
  boyImg = loadAnimation("blackcat1.png","blackcat2.png");
  cashImg = loadImage("yarn.png");
  diamondsImg = loadImage("biscuit.png");
  jewelryImg = loadImage("jewels.png");
  swordImg = loadImage("poison.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityX = -4;

topBoundary=createSprite(0,80,800,200)
topBoundary.visible = false

GameOver = createSprite(200,200);
GameOver.addImage(endImg);
GameOver.scale = 0.8;
GameOver.visible = false;

//creating boy running
boy = createSprite(50,300,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.6;
  
  
cashG=new Group();
diamondsG=new Group();
jewelryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.y = World.mouseY;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  boy.collide(topBoundary)
  //code to reset the background
  if(path.x < 42 ){
    path.x = width/2;
  }
  
    createCash();
    createDiamonds();
    createjewelry();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
      yarncount += 1;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      biscuitcount += 1;
      
    }else if(jewelryG.isTouching(boy)) {
      jewelryG.destroyEach();
      jewelscount += 1;

      // treasureCollection=+ 150;
      // treasureCollection= 150;
      // treasureCollection= treasureCollection - 150;
       treasureCollection= treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(boy)||
      biscuitcount >= 5 
      && jewelscount >= 7
      && yarncount >= 3) {
        gameState=END;
        
         //boy.addAnimation(endImg);
        // boy.addAnimation("SahilRunning",endImg);
        // boy.addAnimation("SahilRunning");
        // boy.addAnimation(SahilRunning,endImg);

        boy.x=200;
        boy.y=300;
        boy.scale=0.6;

        GameOver.visible = true;
        
         cashG.destroyEach;
         diamondsG.destroyEach;
         jewelryG.destroyEach;
         swordGroup.destroyEach;
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jewelryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    }

  }
  
  drawSprites();

  textSize(13);
  fill(0);
  text("Score: "+ treasureCollection + "\nYarn: " + yarncount + "\nJewels: " + jewelscount + "\nBiscuit: " + biscuitcount,10,30);
  textSize(13);
  fill(0);
  text("Goal:\nYarn: 3\nJewels: 7\nBiscuit: 5",330,30);
  }

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(390,Math.round(random(200, 380)));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityX = -5;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(390,Math.round(random(200, 380)));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.2;
  diamonds.velocityX = -5;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createjewelry() {
  if (World.frameCount % 410 == 0) {
  var jewelry = createSprite(390,Math.round(random(200, 380)));
  jewelry.addImage(jewelryImg);
  jewelry.scale=0.2;
  jewelry.velocityX = -5;
  jewelry.lifetime = 150;
  jewelryG.add(jewelry);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(390,Math.round(random(200, 380)));
  sword.addImage(swordImg);
  sword.scale=0.15;
  sword.velocityX = -5;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}
