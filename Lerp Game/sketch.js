// enemies
let e_a = [], e_b = [], e_p = [], e_f = [], e_m = [];
let num_enemies = 5;

// player
let a, b, pos;
let f = 0;
let clicks = 0;
let isCollided = false;
// Win 
let winLine;

function setup() 
{
  createCanvas(640, 480);
  InitEnemy();
  InitPlayer();
  winLine = createVector(630, 250);
}


function draw() 
{
  background(0);
  
  if(!isCollided)
  {
    // Move and Paint the Enemies:
    Paint("#FF0000");
    MoveEnemy();
  
    // Move and Paint the Player;
    Paint("#00FF00");
    MovePlayer();    
  }
  // Show and Paint Win line
  Paint("#AAAB0C");
  
  ellipse(winLine.x, winLine.y, 75, 75);
  CheckCollision();
  
  // Show and Paint click counts
  Paint("#FFFFFF");
  ShowClickCounts();
  
 
  // saveFrame("line-######.png");
}
function CheckCollision()
{
  
  if(IsCollidedWithEnemy())
  {
    isCollided = IsCollidedWithEnemy();
    text("You are dead", 300, 480/2);
  }
  if(IsCollidedWithWinLine())
  {
     isCollided = IsCollidedWithWinLine();
    text("You won", 300, 480/2);
  }
}
function IsCollidedWithWinLine()
{
     let substraction = p5.Vector.sub(winLine, position);
    if(abs(substraction.x) <= 25 && abs(substraction.y) <= 25)
       {
           return true;
       }
}
function IsCollidedWithEnemy()
{
     for (let i = 0; i < num_enemies; i++) 
     { 
       let substraction = p5.Vector.sub(e_p[i], position);
       if(abs(substraction.x) <= 25 && abs(substraction.y) <= 25)
       {
           return true;
       }
     }
  return false;
}

function MovePlayer()
{
  position = p5.Vector.add(p5.Vector.mult(a, 1 - ease(f)), p5.Vector.mult(b, ease(f)));
  ellipse(position.x, position.y, 10, 10);
  if (f < 1) {
    f = f + 0.01;
  }
}
function Paint(color)
{
  stroke(color);
  fill(color);
}
function MoveEnemy()
{
  
   for (let i = 0; i < num_enemies; i++) {
    e_p[i] = p5.Vector.add(p5.Vector.mult(e_a[i], 1 - ease(e_f[i])), p5.Vector.mult(e_b[i], ease(e_f[i])));
    ellipse(e_p[i].x, e_p[i].y, 25, 25);
    // move per frame:
    e_f[i] = e_f[i] + e_m[i];
    // turn around after reaching end point:
    if (e_f[i] >= 1 || e_f[i] <= 0)
      e_m[i] = -e_m[i];
  }
  
}
function InitPlayer(){
  a = createVector(10, 10);
  b = createVector(10, 10);
 
}
function mouseReleased() 
{
  if(!isCollided)
  {
    a = createVector(position.x, position.y);
    b = createVector(mouseX, mouseY);
    f = 0;
    clicks++;
  }
}
function InitEnemy(){
   for (let i = 0; i < num_enemies; i++) 
   { // for each enemy
    // random route:
    e_a[i] = createVector(random(20, 620), random(20, 460));
    e_b[i] = createVector(random(20, 620), random(20, 460));
    // random start and movement speed:
    e_f[i] = random(0, 1);
    e_m[i] = random(0.005, 0.025);
    
  }
}

function ShowClickCounts()
{
  text(clicks, 610,20);
}
function ease(f) {
  // return f*f; // smooth start
  // return 1-(1-f)*(1-f); // smooth stop
  return (1 - f) * (f * f * f) + (f) * (1 - (1 - f) * (1 - f) * (1 - f)); // blend both ...
}