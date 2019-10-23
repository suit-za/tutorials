// suitza (https://bit.ly/2p6JjJU)
// https://github.com/suit-za

class Enemy{
  
  float w,h,x,y,speed;
  PVector topRight, bottomLeft;
  
  Enemy(){
    w = 50;
    h = random(75,150);
    x = width-w;
    y = height-200-h;
    speed = enemySpeed;
    topRight = new PVector();
    bottomLeft = new PVector();
  }
  
  void update(){
    x -= speed;
    
    //update points
    topRight.x = x + w;
    topRight.y = y;
    bottomLeft.x = x;
    bottomLeft.y = y + h;
  }
  
  void show(){
    noStroke();
    fill(0,255,0);
    rect(x,y,w,h);
    //stroke(255);
    //strokeWeight(6);
    //point(topRight.x,topRight.y);
    //point(bottomLeft.x,bottomLeft.y);
  }
}
