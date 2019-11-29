class Snake {
	constructor(i, j) {
		this.i = i;
		this.j = j;
		this.x = i * SIZE;
		this.y = j * SIZE;
		this.w = SIZE;
		this.moveCount = 0;
		this.body = [];
		this.body.push(createVector(this.x, this.y));
	}

	move(u, moves) {
		if (pathToTake.length > 1) {
			let moveI = pathToTake[1].i - pathToTake[0].i;
			let moveJ = pathToTake[1].j - pathToTake[0].j;
			let moveX = moveI * SIZE;
			let moveY = moveJ * SIZE;
			if (this.moveCount == 0 && this.moveCount < moves) {
				let head = this.body[this.body.length - 1].copy();
				this.body.shift();

				if (moveI == -1 && moveJ == -1) {
					if (random(1) > 0.5) {
						head.x += moveX;
					} else {
						head.y += moveY;
					}
				} else if (moveI == 1 && moveJ == -1) {
					if (random(1) > 0.5) {
						head.x += moveX;
					} else {
						head.y += moveY;
					}
				} else if (moveI == -1 && moveJ == 1) {
					if (random(1) > 0.5) {
						head.x += moveX;
					} else {
						head.y += moveY;
					}
				} else if (moveI == 1 && moveJ == 1) {
					if (random(1) > 0.5) {
						head.x += moveX;
					} else {
						head.y += moveY;
					}
				} else {
					head.x += moveX;
					head.y += moveY;
				}
				this.body.push(head);
				this.moveCount++;
			}
		}
	}

	grow() {
		let head = this.body[this.body.length - 1].copy();
		this.body.push(head);
	}

	show() {
		noStroke();
		for (let i = 0; i < this.body.length; i++) {
			if (this.body[this.body.length - 1] == this.body[i]) {
				fill(0, 255, 106);
			} else {
				fill(255, 255, 255);
			}
			rect(this.body[i].x, this.body[i].y, this.w + 1, this.w + 1);
		}
	}
}
