var ghostImage, ghost
var tower, towerImage;
var door, doorImage, climber, climberImage, invisibleBlock;
var doorGroup, climberGroup, invisibleBlockGroup;
var spookySound;
var edge;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload() {
  ghostImage = loadImage("ghost-standing.png");
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  spookySound = loadSound("spooky.wav");
  climberImage = loadImage("climber.png");

}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300, 600, 600);
  tower.addImage("tower", towerImage);
  tower.velocityY = 2;

  ghost = createSprite(300, 0, 10, 10);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.4;
  ghost.velocityY=10;

  //edge = createEdgeSprites();

  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();

  // spookySound.play();

}

function draw() {

  if (gameState === PLAY) {
    //climberGroup.debug=true
    // ghost.debug=true;
    ghost.setCollider("rectangle",0,10,150,290)
    background(255);

    ghost.velocityY = ghost.velocityY+0.8;


    if (tower.y > 600) {
      tower.y = 300;
    }

    if (keyDown("space") || touches.length > 0) {
      ghost.velocityY = -5;
      touches = [];
    }

    if (keyDown("left")) {
      ghost.x = ghost.x - 2;
    }

    if (keyDown("right")) {
      ghost.x = ghost.x + 2;
    }
    
    drawSprites();

    spawnDoor();
    
    if(ghost.isTouching(climberGroup)){
      //ghost.velocityY=0;
      ghost.collide(climberGroup)
    }



    if (ghost.y > 600 || invisibleBlockGroup.isTouching(ghost)) {

      gameState = END;
      
      // tower.velocityY=0;
      ghost.destroy();
      climberGroup.destroyEach();
      doorGroup.destroyEach();
      invisibleBlockGroup.destroyEach();
    }

  }
  if (gameState === END) {
    background("black");
    textSize(25);
    fill("yellow");
    text("Game Over", 250, 300);

    if (keyDown("space") || touches.length > 0) {
      gameState = PLAY;
      
      tower.addImage("tower", towerImage);
      tower.velocityY = 2;
      
      ghost = createSprite(300, 0, 10, 10);
      ghost.addImage("ghost", ghostImage);
      ghost.scale = 0.4;
    }
  }
}

function spawnDoor() {

  if (frameCount % 100 === 0) {
    door = createSprite(0, -50, 10, 10);
    door.addImage("door", doorImage);
    door.x = Math.round(random(30, 580));
    door.velocityY = 2;

    climber = createSprite(0, 10, 10, 10);
    climber.addImage("climber", climberImage);
    climber.x = door.x;
    climber.velocityY = door.velocityY

    invisibleBlock = createSprite(0, 15, 10, 2);
    invisibleBlock.visible=false;
    invisibleBlock.x = door.x;
    invisibleBlock.width = door.width+20;
    invisibleBlock.velocityY = door.velocityY;

    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    door.lifetime = 300;
    climber.lifetime = 500;
    invisibleBlock.lifetime = 600;
    
    climber.debug=true;
    climber.setCollider("rectangle",0,0,100,10);
    
    ghost.depth=door.depth+1;
  }
}