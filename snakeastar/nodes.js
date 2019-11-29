class Node {
	constructor(i, j) {
		this.w = SIZE;
		this.i = i;
		this.j = j;
		this.x = this.i * SIZE;
		this.y = this.j * SIZE;
		this.bottomRight = createVector();
		this.midPoint = createVector();
		this.bottomRight.x = this.x + this.w;
		this.bottomRight.y = this.y + this.w;
		this.midPoint.x = (this.x + this.bottomRight.x) / 2;
		this.midPoint.y = (this.y + this.bottomRight.y) / 2;
		this.f = 0;
		this.g = 0;
		this.h = 0;
		this.neighbors = [];
		this.previous = undefined;

		this.wall = false;
	}

	update() {
		for (let i = 0; i < snake.body.length; i++) {
			if (this.x == snake.body[i].x && this.y == snake.body[i].y) {
				this.wall = true;
			}
		}

		if (!this.wall) {
			if (this.i + 1 >= 1 && this.i + 1 <= cols - 1 && (this.j + 1 >= 1 && this.j + 1 <= rows - 1)) {
				if (grid[this.i + 1][this.j].wall && grid[this.i][this.j + 1].wall) {
					this.wall = true;
				}
			} else if (this.i - 1 >= 0 && this.i - 1 <= cols && (this.j + 1 >= 1 && this.j + 1 <= rows - 1)) {
				if (grid[this.i - 1][this.j].wall && grid[this.i][this.j + 1].wall) {
					this.wall = true;
				}
			} else if (this.i - 1 >= 0 && this.i - 1 <= cols && this.j - 1 >= 0 && this.j - 1 <= rows) {
				if (grid[this.i - 1][this.j].wall && grid[this.i][this.j - 1].wall) {
					this.wall = true;
				}
			} else if (this.j - 1 >= 0 && this.j - 1 <= rows && this.i + 1 >= 1 && this.i + 1 <= cols - 1) {
				if (grid[this.i][this.j - 1].wall && grid[this.i + 1][this.j].wall) {
					this.wall = true;
				}
			}
		}

		for (let i = 0; i < snake.body.length; i++) {
			if (this.x == snake.body[i].x && this.y == snake.body[i].y) {
				this.wall = true;
			}
		}
	}

	show(col) {
		stroke(col);
		strokeWeight(8);
		point(this.midPoint.x, this.midPoint.y);
	}

	addNeighbors(grid) {
		if (this.i < cols - 1) {
			this.neighbors.push(grid[this.i + 1][this.j]);
		}
		if (this.i > 0) {
			this.neighbors.push(grid[this.i - 1][this.j]);
		}
		if (this.j < rows - 1) {
			this.neighbors.push(grid[this.i][this.j + 1]);
		}
		if (this.j > 0) {
			this.neighbors.push(grid[this.i][this.j - 1]);
		}
	}
}
