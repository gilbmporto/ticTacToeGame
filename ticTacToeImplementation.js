// State Variables

function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

let squareOne = document.getElementById("js-cell-1")
let squareTwo = document.getElementById("js-cell-2")
let squareThree = document.getElementById("js-cell-3")
let squareFour = document.getElementById("js-cell-4")
let squareFive = document.getElementById("js-cell-5")
let squareSix = document.getElementById("js-cell-6")
let squareSeven = document.getElementById("js-cell-7")
let squareEight = document.getElementById("js-cell-8")
let squareNine = document.getElementById("js-cell-9")
let resultSection = document.getElementById("result")

function getUserInput(nextPlayerSymbol) {
	let position = prompt(`${nextPlayerSymbol}, What is your move?`)

	if (
		isNaN(parseInt(position)) ||
		parseInt(position) < 1 ||
		parseInt(position) > 9
	) {
		alert("Please enter a number between or equal to 1 and 9.")
	}

	return position - 1
}

function isMoveValid(coordinates, gameBoard) {
	let validMove = false

	let position = gameBoard[coordinates]

	if (position === "#") {
		validMove = true
		return validMove
	}

	if (position === "X" || position === "O") {
		validMove = false
		alert("This position is already occupied")
		return validMove
	}

	if (position < 0 || position > 8) {
		validMove = false
		alert("This position is not valid")
		return validMove
	}
}

function makeAMove(gameBoard, nextPlayerSymbol) {
	// clone the game board before placing moves in it
	let newGameBoard = JSON.parse(JSON.stringify(gameBoard))
	let coordinates
	let moveIsValid = false

	// if (isMoveValid(coordinates, newGameBoard)) {
	// 	newGameBoard[coordinates] = nextPlayerSymbol
	// 	return newGameBoard
	// } else {
	//   alert("This position is already occupied")
	//   return newGameBoard
	// }

	do {
		coordinates = getUserInput(nextPlayerSymbol)
		if (isMoveValid(coordinates, newGameBoard)) {
			newGameBoard[coordinates] = nextPlayerSymbol
			moveIsValid = true
		}
	} while (!moveIsValid)

	return newGameBoard
}

function hasLastMoverWon(lastMove, gameBoard) {
	let winnerCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]

	for (let [i1, i2, i3] of winnerCombos) {
		if (
			gameBoard[i1] === lastMove &&
			gameBoard[i1] === gameBoard[i2] &&
			gameBoard[i1] === gameBoard[i3] &&
			gameBoard[i1] !== "#"
		) {
			return true
		}
	}
	return false
}

function isGameOver(gameBoard, currentPlayerSymbol) {
	// 1. check if there is a winner
	let playerOne = "X"
	let playerTwo = "O"
	let lastMove = null

	if (currentPlayerSymbol === playerOne) {
		lastMove = playerOne
	} else {
		lastMove = playerTwo
	}

	if (hasLastMoverWon(lastMove, gameBoard)) {
		// Write a message that last mover has won the game
		alert(`Congratulations, ${currentPlayerSymbol} has won the game`)
		resultSection.innerHTML = `Congratulations, ${currentPlayerSymbol} has won the game!`
		return true

		// 2. check if the board is full
	} else if (gameBoard.find((position) => position === "#") === undefined) {
		alert("The game was a draw")
		resultSection.innerHTML = `The game was a draw!`
		return true

		// Return: winner/draw OR game is still in progress
	} else {
		return false
	}
}

async function ticTacToe() {
	try {
		// State space
		let gameBoard = new Array(9).fill("#")
		let players = ["O", "X"]
		let nextPlayerIndex = 0
		let currentPlayerSymbol

		await wait(2000)

		let beginTheGame = prompt(
			"Welcome to Tic Tac Toe!\n Shall we begin?\n (Type yes or no)"
		)
		if (beginTheGame.toLowerCase() === "yes") {
			// Computations
			do {
				nextPlayerIndex = (nextPlayerIndex + 1) % 2
				currentPlayerSymbol = players[nextPlayerIndex]
				gameBoard = makeAMove(gameBoard, currentPlayerSymbol)

				squareOne.innerHTML = gameBoard[0]
				squareTwo.innerHTML = gameBoard[1]
				squareThree.innerHTML = gameBoard[2]
				squareFour.innerHTML = gameBoard[3]
				squareFive.innerHTML = gameBoard[4]
				squareSix.innerHTML = gameBoard[5]
				squareSeven.innerHTML = gameBoard[6]
				squareEight.innerHTML = gameBoard[7]
				squareNine.innerHTML = gameBoard[8]

				await wait(1000)
			} while (!isGameOver(gameBoard, currentPlayerSymbol))
		} else if (beginTheGame.toLowerCase() === "no") {
			alert("Ok, see ya!")
		} else {
			alert("Please enter yes or no!\nWait 2 seconds and try again!")
			ticTacToe()
		}

		console.log(gameBoard)

		// Return value
		// return undefined;
	} catch (err) {
		console.log(err)
	}
}

ticTacToe()
