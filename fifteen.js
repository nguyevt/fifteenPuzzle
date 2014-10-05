/* 
	Vincent Nguyen
	CSE154 HW8
	This file contains javascript code to manage an instance of the "fifteen puzzle".
	It contains code to shuffle the game-board and keep track of each movement.
*/

"use strict";

(function() {

	// Modulated global variables
	var TILE_SIZE = 100;	// Size of each individual tile (pixels)
	var PUZZLE_SIZE = 4;	// Size of the puzzle (rows or columns)
	var xEmpty = 3;			// Variable to keep track of the empty tile (x-coordinate)
	var yEmpty = 3;			// Variable to keep track of the empty tile (y-coordinate)

	// Function called when the window loads, and initializes all the buttons/events
	window.onload = function() {

		// Initialization of the shuffle button
		var shuffleButton = document.getElementById("shufflebutton");
		shuffleButton.onclick = shuffle;

		// Creating the game board, including setting the picture for each tile, 
		// initializing each tile and its event handling properties
		for (var i = 0; i < 15; i++) {
			var tile = document.createElement("div");

			// Sets the background picture in each of the tiles
			tile.innerHTML = i + 1;
			var xBackground = (i % PUZZLE_SIZE) * -TILE_SIZE;
			var yBackground = Math.floor(i / PUZZLE_SIZE) * -TILE_SIZE;
			tile.style.backgroundPosition = xBackground + "px " + yBackground + "px";

			// Sets the default positioning of each tile on the game-board
			var xPos = (i % PUZZLE_SIZE);
			var yPos = Math.floor(i / PUZZLE_SIZE);
			tile.style.left = xPos * TILE_SIZE + "px";
			tile.style.top = yPos * TILE_SIZE + "px";

			// Gives each tile an id
			tile.setAttribute('id', "tile_" + xPos + "_" + yPos);
			document.getElementById("puzzlearea").appendChild(tile);

			// Initialize event handlers for each tile
			tile.onmouseover = mouseOver;
			tile.onmouseout = mouseOut;
			tile.onclick = selectTile;
		}
	};

	// Function called when the shufflebutton is clicked
	// Shuffles the game board
	function shuffle() {
		for (var i = 0; i < 1000; i++) {

			// Choose a random integer 0 - 3 (inclusive)
			var move = parseInt(Math.random() * 4);
			var xTile = xEmpty;
			var yTile = yEmpty;
			if (move == 0) {			// above
				yTile = (yEmpty - 1);
			} else if (move == 1) {		// left
				xTile = (xEmpty - 1);
			} else if (move == 2) {		// below
				yTile = (yEmpty + 1);
			} else {					// right
				xTile = (xEmpty + 1);
			}

			// If computed tile neighbors the missing tile, switch the tiles
			if (isNeighbor(xTile, yTile)) {
				var tile = document.getElementById("tile_" + xTile + "_" + yTile);
				switchTiles(tile);
			} else {
				i--;	// Ensures that we move the pieces 1000 times
			}
		}
	}

	// Function called when a tile is clicked
	// Switches the position of the tile if it neighbors the missing tile
	function selectTile() {
		var xTile = parseInt(this.style.left) / TILE_SIZE;
		var yTile = parseInt(this.style.top) / TILE_SIZE;
		if (isNeighbor(xTile, yTile)) {
			switchTiles(this);
		}
	}

	// Function called when a tile is hovered over
	// Highlights the border and text in red if it neighbors the missing tile
	function mouseOver() {
		var xTile = parseInt(this.style.left) / TILE_SIZE;
		var yTile = parseInt(this.style.top) / TILE_SIZE;
		if (isNeighbor(xTile, yTile)) {
			this.classList.add("mouseover");
		}
	}

	// Function called when the mouse exits a given tile
	// Changes the styling of the tile to the default
	function mouseOut() {
		this.classList.remove("mouseover");
	}

	// Helper function that moves a given tile into the missine tile's position
	// Caller passes in a tile object
	function switchTiles(tile) {
		var xTemp = parseInt(tile.style.left) / TILE_SIZE;
		var yTemp = parseInt(tile.style.top) / TILE_SIZE;
		tile.setAttribute('id', "tile_" + xEmpty + "_" + yEmpty);
		tile.style.left = xEmpty * TILE_SIZE + "px";
		tile.style.top = yEmpty * TILE_SIZE + "px";
		xEmpty = xTemp;
		yEmpty = yTemp;
	}

	// Helper function that returns true if the coordinates passed neighbor the missing tile
	// xTile & yTile need to be single digit coordinates
	function isNeighbor(xTile, yTile) {
		var tile = document.getElementById("tile_" + xTile + "_" + yTile);
		return (tile !== null && (((xTile + 1) == xEmpty && yTile == yEmpty) || 
								  ((xTile - 1) == xEmpty && yTile == yEmpty) || 
								  (xTile == xEmpty && (yTile - 1) == yEmpty) || 
								  (xTile == xEmpty && (yTile + 1) == yEmpty)));	
	}
})();