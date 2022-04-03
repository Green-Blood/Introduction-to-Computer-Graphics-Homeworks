let v1, v2, center, n, offset;

function setup() 
{
  createCanvas(640, 480);
  stroke(0, 255, 255);
 
  v1 = createVector(120, 60);
  v2 = createVector(40, 200);
  center = createVector(350, 250);
  offset = 70;
  n = createVector(2, 1).normalize();
}

function draw() 
{
  background(0);
  
  v1 = createVector(center.x - mouseX, center.y - mouseY);
  v2 = p5.Vector.add(v1, p5.Vector.mult(n, -2 * p5.Vector.dot(n, v1)));
  
  line(center.x - offset, center.y + offset, center.x + offset, center.y - offset); 
  drawVector(center.x - v1.x, center.y - v1.y, v1);
  drawVector(center.x, center.y, v2);
}

function drawVector(x, y, v) 
{
  line(x, y, v.x + x, v.y + y);
  ellipse(v.x + x, v.y + y, 5, 5);
}
