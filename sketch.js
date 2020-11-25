var player,player_img,screen,screen_img,button,img,imgimg,score;
//var start,play;
var welcome_screen,welcome_img;
var button_img,vic,roy;
var gameState;
var obImg,me,me_img;
var bulletgrp;
var lose,win,lose_img,win_img,retry,retry_img,reddy;
var house,house_img;
var loseM,loseM_img;
var edges;

function setup() {
  createCanvas(displayWidth,displayHeight-110);
  edges=createEdgeSprites();
  score=0;
  gameState="start";
  welcome_screen=createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight)
  welcome_screen.addImage(welcome_img);
  welcome_screen.scale=2.5;

  button=createSprite(displayWidth/2,500,200,200);
  button.addImage(button_img);
  button.scale=0.15;

  imgimg=createSprite(650,200,50,50)
  imgimg.addImage(img)
  imgimg.scale=1;
  

  screen=createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight)
  screen.addImage(screen_img);
  screen.visible=false;
  screen.scale=3.0;

    
  player=createSprite(200,500,50,50)
  player.addImage(player_img)
  player.visible=false;
  player.scale=0.5;
  player.debug=false;
  player.setCollider("circle",0,0,75)

  bulletgrp=new Group();

  
  
   lose=createSprite(displayWidth/2,displayHeight/2-250,50,50);
   lose.addImage(lose_img)
   lose.scale=0.5;
   lose.visible=false;

   house =createSprite(displayWidth,displayHeight/2+90,50,50)
    house.addImage(house_img);
    house.scale=0.5;
    house.visible=false;

    win=createSprite(displayWidth/2-30,displayHeight/2-80,50,50);
    win.addImage(win_img)
    win.scale=2.28;
    win.visible=false;

    retry=createSprite(displayWidth/2,510);
    retry.addImage(retry_img);
    retry.scale=0.2;
    retry.visible=false;
    

}
 function preload(){
 welcome_img=loadImage("welc_screen.jpg");
  screen_img=loadImage("back.jpg")
  button_img=loadImage("buttons_PNG34.png");
  img=loadImage("superhero-marvel-super-heroes-batman-comic-book-class-of-2018-removebg-preview (1).png")
  player_img=loadImage("sup-removebg-preview.png")
  obImg=loadImage("spaceship-removebg-preview.png")
  lose_img=loadImage("you lose.png.png")
  retry_img=loadImage("not.png")
  reddy=loadImage("red.jpg")
  win_img=loadImage("you win.jpg")
  house_img=loadImage("fire.png")
  roy=loadImage("vic roy.gif")
  loseM_img=loadSound("loss.wav")
  loseM=loadSound("ta-da.wav")
 }
 
function draw() {
  background("black");  
  player.collide(edges[2])
  


   if(mousePressedOver(button)){
   gameState="play";
  }
  
  if(gameState==="play"){
    player.visible=true;
    screen.visible=true;
    imgimg.visible=false;
    
    if(player.isTouching(edges[3])){
    gameState="end";
    loseM_img.play();
    }

    screen.velocityX=-3;
    score = score + Math.round(frameRate()/60);
    if(screen.x<0){
      screen.x=displayWidth/2;
    }

    if(keyDown("space")){
      player.velocityY=-10;
    }
    player.velocityY=player.velocityY+0.9;

    if(score===550){
      gameState="win";
      loseM.play();
    }
    if(score===500){
    house.visible=true;
    house.velocityX=-8;
    
    }
   
    spawnObstacles();
}



drawSprites();
if(gameState==="start"){
  textSize(70)
  fill("red")
  stroke("yellow")
  text("PLAY",displayWidth/2-80,520)
  text("Made by Devyansh Singh",displayWidth/2-400,635)
  }
  if(bulletgrp.isTouching(player)){
    gameState="end";
    loseM_img.play();
    
  
  }
  if(gameState==="end"){
    console.log("end")
    screen.velocityX=0;
    player.velocityY=0;
    bulletgrp.destroyEach();
    bulletgrp.setVelocityXEach(0);
    lose.visible=true; 
    retry.visible=true;
    
    
    textSize(50)
    fill("red")
    stroke("yellow")
    //text("You were not able to save the citizens!",displayWidth/2-400,325);
    //text("           Press retry for another go.",displayWidth/2-400,375);
    screen.addImage(reddy)
  }

  if(mousePressedOver(retry)){
    gameState="play";
    player.y=displayHeight/2;
    score=0;
    lose.visible=false;
    win.visible=false;
    retry.visible=false;
    screen.addImage(screen_img);
    bulletgrp.destroyEach();
  }
  
  if(gameState==="win"){
    screen.velocityX=0;
    player.velocityY=0;
    bulletgrp.setVelocityXEach(0);
    
    win.visible=true;

    textSize(50)
    fill("blue")
    stroke("aqua")
    text("  You saved the citizens!",displayWidth/2-650,550);
    text("Press replay to play again.",displayWidth/2-650,600);

   retry.x=displayWidth/2+450;
   retry.y=530;
  retry.visible=true;
   
   

   
  }
  if((gameState==="play") || (gameState==="end")){
textSize(50)
fill("red")
stroke("yellow")
text("Distance covered:"+score,20,40)
  }
}

function spawnObstacles(){
  if(frameCount % 40===0){
   bullet=createSprite(displayWidth,random(20,displayHeight-50),40,40)
   bullet.addImage(obImg);
   bullet.scale=0.2;
   bullet.velocityX=-25;
   bulletgrp.add(bullet);
   bullet.velocityX =-(40 + score/30);
   console.log(bullet.velocityX)
  }
}
//setTimeout(home,30000);
//var h1; setTimeout(home,30000); function draw() { background("white"); drawSprites(); } function home(){ h1=createSprite(200,200,50,50); h1.setAnimation("book"); }