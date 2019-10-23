// suitza (https://bit.ly/2p6JjJU)
// https://github.com/suit-za

ArrayList<Player> players = new ArrayList<Player>();
ArrayList<Player> savedPlayers = new ArrayList<Player>();
final int TOTALPLAYERS = 1000;
ArrayList<Enemy> enemies = new ArrayList<Enemy>();
float enemySpeed = 10;
int gen = 1;
int counter = 0;

void setup() {
  size(1000, 1000);

  for (int i = 0; i < TOTALPLAYERS; i++) {
    players.add(new Player());
  }

  enemies.add(new Enemy());
}

void draw() {
  
    //logic

    //update
    for (int i = 0; i < players.size(); i++) {
      players.get(i).update();
      players.get(i).think();
    }

    for (int i = 0; i < enemies.size(); i++) {
      enemies.get(i).update();
    }

    // push another one
    if (enemies.size() > 0) {
      float w = width / 2;
      if (enemies.get(enemies.size()-1).x < w - 300) {
        enemies.add(new Enemy());
      }
    }

    if (counter % 1000 == 0) {
      enemySpeed *= 1.001;
      counter = 0;
    }

    //collision check
    for (int i = 0; i < players.size(); i++) {
      if (players.get(i).collision()) {
        savedPlayers.add(players.get(i));
        players.remove(i);
        //players.get(i).hasCollided = true;
      } else {
        //players.get(i).hasCollided = false;
      }
    }  

    //////next generation////

    if (players.size() == 0) {
      nextGeneration();
    }

    //////next generation////

    // delete offscreen
    for (int i = 0; i < enemies.size(); i++) {
      if (enemies.get(i).x < 0) {
        enemies.remove(i);
      }
    }
    
    counter++;

    //draw
    frameRate(60);
    background(160, 161, 254);

    //ground//
    noStroke();
    fill(224, 126, 1);
    rect(0, height-200, width, 200);
    //ground//

    for (int i = 0; i < enemies.size(); i++) {
      enemies.get(i).show();
    }

    for (int i = 0; i < players.size(); i++) {
      players.get(i).show();
    }
    
  
}

void keyPressed() {
  // space 32
  // up arrow 38
  // down 40

  //if(keyCode == 32){
  //  if(player.isGrounded){
  //    player.jump();
  //  }   
  //}

  if (keyCode == 38) {
    noLoop();
  } else if (keyCode == 40) {
    loop();
  }
}
