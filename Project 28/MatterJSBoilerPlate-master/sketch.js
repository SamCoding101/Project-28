
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var boy,boyImage;
var sling;
var stone;
var ground;
var tree,treeImage;
var mango1,mango2,mango3,mango4,mango5,mango6;
var gameState = "OnSling";

function preload(){

boyImage = loadImage("boy.png");
treeImage = loadImage("tree.png");

}

function setup() {
	createCanvas(1000, 700);


	engine = Engine.create();
	world = engine.world;

  boy = createSprite(220,610,130,280);
  boy.addImage(boyImage);
  boy.scale = 0.11;
  stone = new Stone(180,550,50,50);
  sling = new Sling(stone.body,{x:160,y:540});
  ground = new Ground(500,700,1020,40);
  tree = createSprite(680,400,60,60);
  tree.addImage(treeImage);
  tree.scale = 0.45;
  mango1 = new Mango(700,300,60,60);
  mango2 = new Mango(600,280,60,60);
  mango3 = new Mango(720,200,60,60);
  mango4 = new Mango(550,380,60,60);
  mango5 = new Mango(820,280,60,60);
  mango6 = new Mango(820,380,60,60);
  
}


function draw() {

  Engine.update(engine);
  
  rectMode(CENTER);
  background("grey");
     
  drawSprites();

  sling.display();
  stone.display();
  ground.display();
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
 
  detectCollision(stone,mango1);
  detectCollision(stone,mango2);
  detectCollision(stone,mango3);
  detectCollision(stone,mango4);
  detectCollision(stone,mango5);
  detectCollision(stone,mango6);
}

function mouseDragged(){
  if(gameState!="launched"){
      Matter.Body.setPosition(stone.body, {x: mouseX , y: mouseY});
  }
}


function mouseReleased(){
  gameState = "launched"; 
  sling.fly();
}

function keyPressed(){
  if(keyCode === 32){
        gameState = "OnSling";
        sling.attach(stone.body);
  }
}

function detectCollision(a,b){

var mangoBodyPosition =  b.body.position
var stoneBodyPosition =  a.body.position

var distance = dist(stoneBodyPosition.x,stoneBodyPosition.y,mangoBodyPosition.x,mangoBodyPosition.y);
if(distance<=a.w+b.w && distance<=a.h+b.h){
  Matter.Body.setStatic(b.body,false);
}


}

