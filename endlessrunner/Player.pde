// suitza (https://bit.ly/2p6JjJU)
// https://github.com/suit-za

class Player {

  float w, h, ground, x, y, gravity, velocity;
  boolean isGrounded, hasCollided;
  PVector topRight, bottomLeft;
  NeuralNetwork brain;
  float[] inputs = new float[12];
  float score = 0;
  float fitness = 0;

  Player() {
    w = 50;
    h = 50;
    x = 150;
    ground = height-200;
    y = 300;
    gravity = -2;
    velocity = 0;
    isGrounded = false;
    topRight = new PVector();
    bottomLeft = new PVector();
    hasCollided = false;
    
    brain = new NeuralNetwork(12,7,2);
  }
  
  void mutate(){
    brain.mutate(0.1);
  }
  
  Player(NeuralNetwork b) {
    w = 50;
    h = 50;
    x = 150;
    ground = height-200;
    y = 300;
    gravity = -2;
    velocity = 0;
    isGrounded = false;
    topRight = new PVector();
    bottomLeft = new PVector();
    hasCollided = false;
    
    brain = b.copy();
  }

  void jump() {
    velocity = 0;
    velocity += 30;
  }
  
  void think(){
    float closestDist = Float.POSITIVE_INFINITY;
    Enemy closestEnemy = null;

    for (int i = 0; i < enemies.size(); i++) {
      float d = dist(x, y, enemies.get(i).x, enemies.get(i).y);
      if (d < closestDist && enemies.get(i).x > x) {
        closestDist = d;
        closestEnemy = enemies.get(i);
      }
    }
    
    inputs[0] = y / height;
    inputs[1] = closestEnemy.y / height;
    inputs[2] = closestEnemy.x / width;
    inputs[3] = velocity / 10;
    inputs[4] = closestEnemy.speed / 10;
    inputs[5] = 1 / (topRight.x - closestEnemy.x);
    inputs[6] = 1 / (topRight.y - closestEnemy.y);
    inputs[7] = x / width;
    inputs[8] = w / width;
    inputs[9] = h / height;
    inputs[10] = closestEnemy.h / height;
    inputs[11] = closestEnemy.w / width;
    
    float[] outputs = brain.feedForward(inputs);
    
    if(outputs[0] > 0.8 && isGrounded){
      jump();
    } else {
      if(outputs[1] > 0.8){
      }
    }
  }

  void update() {
    score++;
    
    velocity += gravity;
    y -= velocity;

    if (y + h >= ground) {
      isGrounded = true;
      y = ground-h;
    } else {
      isGrounded = false;
    }

    //update points
    topRight.x = x + w;
    topRight.y = y;
    bottomLeft.x = x;
    bottomLeft.y = y + h;
  }

  boolean collision() {
    float closestDist = Float.POSITIVE_INFINITY;
    Enemy closestEnemy = null;

    for (int i = 0; i < enemies.size(); i++) {
      float d = dist(x, y, enemies.get(i).x, enemies.get(i).y);
      if (d < closestDist && enemies.get(i).topRight.x > x) {
        closestDist = d;
        closestEnemy = enemies.get(i);
      }
    }

    if (closestEnemy != null) {
      if (topRight.y > closestEnemy.bottomLeft.y || bottomLeft.y < closestEnemy.topRight.y) {
        return false;
      }
      if (topRight.x < closestEnemy.bottomLeft.x || bottomLeft.x > closestEnemy.topRight.x) {
        return false;
      }
      return true;
    }

    return false;
  }

  void show() {
    noStroke();
    //if(!hasCollided){
    //  fill(255, 0, 0,100);
    //} else if(hasCollided){
    //  fill(255, 125, 125);
    //}  
    fill(255, 0, 0,100);
    rect(x, y, w, h);
    //stroke(255);
    //strokeWeight(6);
    //point(topRight.x, topRight.y);
    //point(bottomLeft.x, bottomLeft.y);
  }
}
