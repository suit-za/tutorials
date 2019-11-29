function Astar() {
	if (openSet.length > 0) {
		let winner = 0;
		for (let i = 0; i < openSet.length; i++) {
			if (openSet[i].f < openSet[winner].f) {
				winner = i;
			}
		}

		let current = openSet[winner];

		if (current === end) {
			//Find path
			path = [];
			let temp = current;
			path.push(temp);
			while (temp.previous) {
				path.push(temp.previous);
				temp = temp.previous;
			}
			pathToTake = path.reverse();
			//console.log('DONE!');
			pathSet = true;
		}

		removeFromArray(openSet, current);
		closedSet.push(current);

		let neighbors = current.neighbors;

		for (let i = 0; i < neighbors.length; i++) {
			let neighbor = neighbors[i];

			if (!closedSet.includes(neighbor) && !neighbor.wall) {
				let tempG = current.g + 1;

				if (openSet.includes(neighbor)) {
					if (tempG < neighbor.g) {
						neighbor.g = tempG;
					}
				} else {
					neighbor.g = tempG;
					openSet.push(neighbor);
				}

				neighbor.h = heuristic(neighbor, end);
				neighbor.f = neighbor.g + neighbor.h;
				neighbor.previous = current;
			}
		}
	} else {
		noSolution = true;
		//console.log('no solution');
		// no solution
	}
}

function removeFromArray(arr, elt) {
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i] == elt) {
			arr.splice(i, 1);
		}
	}
}

function heuristic(a, b) {
	let d = abs(a.i - b.i) + abs(a.j - b.j);
	return d;
}

function moveSnake() {
	let moves = pathToTake.length - 1;
	snake.move(counter, moves);
	if (counter < moves - 1) {
		counter++;
	} else {
		pathSet = false;
	}
}

function setPath() {
	path = [];
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j] = null;
		}
	}
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j] = new Node(i, j);
		}
	}
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].addNeighbors(grid);
		}
	}
	fCount = 0;
	counter = 0;
	start = grid[snake.body[snake.body.length - 1].x / SIZE][snake.body[snake.body.length - 1].y / SIZE];
	end = grid[food.x / SIZE][food.y / SIZE];
	openSet.push(start);
}
