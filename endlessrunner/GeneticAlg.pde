void nextGeneration() {

  calcFit();
  for (int i = 0; i < TOTALPLAYERS; i++) {
    Player parentA = selectCandidate();
    Player parentB = selectCandidate();
    Player newP = crossOver(parentA, parentB);
    if (players.size() < TOTALPLAYERS) {
      players.add(new Player(newP.brain));
    } 
    if (players.size() >= TOTALPLAYERS) {
    }
  }

  enemies.clear();
  enemies.add(new Enemy());
  enemySpeed = 10;
  counter = 0;

  savedPlayers.clear();
  gen++;
}

Player crossOver(Player parentA, Player parentB) {
  // suitza (https://bit.ly/2p6JjJU)
  // https://github.com/suit-za
  Player child = new Player();
  int pickChance = 0;
  if (parentA.score > parentB.score) {
    pickChance = 75;
  } else if (parentA.score < parentB.score) {
    pickChance = 25;
  } else {
    pickChance = 50;
  }
  for (int i = 0; i < parentA.brain.IHWeights.rows; i++) {
    for (int j = 0; j < parentA.brain.IHWeights.cols; j++) {
      float val = parentB.brain.IHWeights.values[i][j];
      float val2 = parentA.brain.IHWeights.values[i][j];
      if (floor(random(0, 100)) > pickChance) {
        child.brain.IHWeights.values[i][j] = val;
      } else {
        child.brain.IHWeights.values[i][j] = val2;
      }
    }
  }
  for (int i = 0; i < parentA.brain.HOWeights.rows; i++) {
    for (int j = 0; j < parentA.brain.HOWeights.cols; j++) {
      float val = parentB.brain.HOWeights.values[i][j];
      float val2 = parentA.brain.HOWeights.values[i][j];
      if (floor(random(0, 100)) > pickChance) {
        child.brain.HOWeights.values[i][j] = val;
      } else {
        child.brain.HOWeights.values[i][j] = val2;
      }
    }
  }
  for (int i = 0; i < parentA.brain.Hbias.rows; i++) {
    for (int j = 0; j < parentA.brain.Hbias.cols; j++) {
      float val = parentB.brain.Hbias.values[i][j];
      float val2 = parentA.brain.Hbias.values[i][j];
      if (floor(random(0, 100)) > pickChance) {
        child.brain.Hbias.values[i][j] = val;
      } else {
        child.brain.Hbias.values[i][j] = val2;
      }
    }
  }
  for (int i = 0; i < parentA.brain.Obias.rows; i++) {
    for (int j = 0; j < parentA.brain.Obias.cols; j++) {
      float val = parentB.brain.Obias.values[i][j];
      float val2 = parentA.brain.Obias.values[i][j];
      if (floor(random(0, 100)) > pickChance) {
        child.brain.Obias.values[i][j] = val;
      } else {
        child.brain.Obias.values[i][j] = val2;
      }
    }
  }
  child.mutate();
  return child;
}

void calcFit() {
  float sum = 0;

  for (int i = 0; i < savedPlayers.size(); i++) {
    savedPlayers.get(i).score = (float)(Math.pow(savedPlayers.get(i).score, 2));
  }

  for (int i = 0; i < savedPlayers.size(); i++) {
    sum += savedPlayers.get(i).score;
  }

  for (int i = 0; i < savedPlayers.size(); i++) {
    savedPlayers.get(i).fitness = savedPlayers.get(i).score/sum;
  }
}

Player selectCandidate() {
  int index = 0;
  float r = random(1);
  while (r > 0) {
    r = r - savedPlayers.get(index).fitness;
    index++;
  }
  index--;
  Player player = savedPlayers.get(index);
  Player child = new Player(player.brain);
  //child.mutate();
  return child;
}
