class Food {
	constructor(i, j) {
		this.i = i;
		this.j = j;
		this.x = this.i * SIZE;
		this.y = this.j * SIZE;
		this.w = SIZE;
	}

	foodLocation() {
		let r1 = floor(random(0, 40));
		if (r1 == 40) {
			r1 = 39;
		}
		let r2 = floor(random(0, 40));
		if (r1 == 40) {
			r2 = 39;
		}
		this.i = r1;
		this.j = r2;
		this.x = this.i * SIZE;
		this.y = this.j * SIZE;
		for (let i = 0; i < snake.body.length; i++) {
			if (this.x == snake.body[i].x && this.y == snake.body[i].y) {
				r1 = floor(random(0, 40));
				if (r1 == 40) {
					r1 = 39;
				}
				r2 = floor(random(0, 40));
				if (r1 == 40) {
					r2 = 39;
				}
				this.i = r1;
				this.j = r2;
				this.x = this.i * SIZE;
				this.y = this.j * SIZE;
			}
		}
	}

	show() {
		noStroke();
		fill(255, 0, 0);
		rect(this.x, this.y, this.w, this.w);
	}
}
