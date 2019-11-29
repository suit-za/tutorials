let SIZE = 25 * 1.3;
let GRID_COL = 40;
let GRID_ROW = 40;

let cols = GRID_COL;
let rows = GRID_ROW;
let grid = new Array(cols);

let openSet = [];
let closedSet = [];
let start;
let end;
let path = [];
let pathToTake = [];

let snake;
let counter = 0;
let fCount = 0;
let hasMoved = false;
let pathSet = false;
let noSolution = false;

function setup() {
	createCanvas(SIZE * GRID_COL, SIZE * GRID_ROW);

	snake = new Snake(0, 0);
	food = new Food(cols - 1, 6);

	// making 2d array
	grid = new Array(cols);
	for (let i = 0; i < cols; i++) {
		grid[i] = new Array(rows);
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
	start = grid[snake.body[snake.body.length - 1].x / SIZE][snake.body[snake.body.length - 1].y / SIZE];
	end = grid[food.x / SIZE][food.y / SIZE];
	start.wall = false;
	end.wall = false;
	openSet.push(start);
	///////////
}

function draw() {
	//A* alg//

	if (openSet.length > 0) {
		noSolution = false;
	}

	start.wall = false;
	end.wall = false;

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].update();
		}
	}

	if (!pathSet) {
		path = [];
		pathToTake = [];

		for (let z = 0; z < 2000; z++) {
			Astar();
		}

		if (path.length == 0) {
			console.log('here');
		}
	} else if (pathSet) {
		let moves = pathToTake.length - 1;
		if (fCount % 1 == 0 && fCount > 0) {
			snake.move(counter, moves);
			if (counter < moves - 1) {
				counter++;
			}
		}
		//////////////////////////////
		openSet = [];
		closedSet = [];
		grid = null;
		grid = new Array(cols);
		for (let i = 0; i < cols; i++) {
			grid[i] = new Array(rows);
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
		start = grid[snake.body[snake.body.length - 1].x / SIZE][snake.body[snake.body.length - 1].y / SIZE];
		end = grid[food.x / SIZE][food.y / SIZE];
		start.wall = false;
		end.wall = false;
		openSet.push(start);
		counter = 0;
		snake.moveCount = 0;
		pathSet = false;
	}

	if (snake.body[snake.body.length - 1].x == food.x && snake.body[snake.body.length - 1].y == food.y) {
		food.foodLocation();
		snake.grow();
	}

	fCount++;

	background(0);

	for (let i = 0; i < path.length; i++) {
		path[i].show(color(0, 175, 255));
	}

	food.show();

	snake.show();
}
