var NTTools = {
	getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
var NTConfig = {
	boardWidth: 10,
	boardHeight: 20
};

var NT = {
	NTMinos: [
		{
			name: "I",
			variants: [
				[[1,1,1,1]],
				[[1],[1],[1],[1]]
			]
		},
		{
			name: "T",
			variants: [
				[[1,1,1],[0,1,0]],
				[[1,0],[1,1],[1,0]],
				[[0,1,0],[1,1,1]],
				[[0,1],[1,1],[0,1]]
			]
		},
		{
			name: "O",
			variants: [
				[[1,1],[1,1]]
			]
		},
		{
			name: "L",
			variants: [
				[[1,0],[1,0],[1,1]],
				[[0,0,1],[1,1,1]],
				[[1,1],[0,1],[0,1]],
				[[1,1,1],[1,0,0]]
			]
		},
		{
			name: "J",
			variants: [
				[[0,1],[0,1],[1,1]],
				[[1,1,1],[0,0,1]],
				[[1,1],[1,0],[1,0]],
				[[1,0,0],[1,1,1]]
			]
		},
		{
			name: "S",
			variants: [
				[[0,1,1],[1,1,0]],
				[[1,0],[1,1],[0,1]],
			]
		},
		{
			name: "Z",
			variants: [
				[[1,1,0],[0,1,1]],
				[[0,1],[1,1],[1,0]]
			]
		}
	],
	NTCell: function () {
		this.isFilled = false;
		this.color = null;
		this.multiplier = 1;
		this.isTemporary = true;
	},
	NTBoard: function () {
		this.state = [];
		for (i = 0; i < NTConfig.boardHeight; i++) {	//ROWS
			var row = [];
			for (j = 0; j < NTConfig.boardWidth; j++) {	//COLLUMNS
				row.push(new NT.NTCell());
			}
			this.state.push(row);
		}
	},
	NTGameState: function () {
		this.playerId = null;
		this.points = 0;
		this.timeMultiplier = 1.0;
		this.gameOver = false;

		this.currentNetrimino = null;
		this.currentNetriminoVariantIndex = 0;
		this.currentRow = 0;
		this.currentCollumn = 4;
		this.currentColor = "#900090";
		this.timeStarted = new Date().getTime();
		this.timeLastJump = new Date().getTime();
		this.timeKeyboardAction = new Date().getTime();

		this.board = new NT.NTBoard();

		this.canKeyAct = function () {
			var timeDiff = new Date().getTime() - this.timeKeyboardAction;
			this.timeKeyboardAction = new Date().getTime();
			return (timeDiff > 50);
		}
		this.toggleNTVariant = function () {
			if (this.canKeyAct()) {
				this.currentNetriminoVariantIndex =
					(this.currentNetrimino.variants.length - 1 == this.currentNetriminoVariantIndex )
					? 0
					: this.currentNetriminoVariantIndex + 1;
					this.placeCurrentOnBoard();
			}
		}
		this.jumpLeft = function () {
			if (this.canKeyAct()) {
				for (var i = 0; i < NTConfig.boardHeight; i ++) {
					for (var j = 0; j < NTConfig.boardWidth; j++) {
						if (this.board.state[i][j].isTemporary && this.board.state[i][j].isFilled) {
								if (this.board.state[i][(j * 1) - 1] == undefined || this.board.state[i][(j * 1) - 1].isFilled && !this.board.state[i][(j * 1) - 1].isTemporary) {
									return false;
								}
						}
					}
				}
				this.currentCollumn--;
				this.placeCurrentOnBoard();
				return true;
			}
		}
		this.jumpRight = function () {
			if (this.canKeyAct()) {
				for (var i = 0; i < NTConfig.boardHeight; i ++) {
					for (var j = 0; j < NTConfig.boardWidth; j++) {
						if (this.board.state[i][j].isTemporary && this.board.state[i][j].isFilled) {
								if (this.board.state[i][(j * 1) + 1] == undefined || this.board.state[i][(j * 1) + 1].isFilled && !this.board.state[i][(j * 1) + 1].isTemporary) {
									return false;
								}
						}
					}
				}
				this.currentCollumn++;
				this.placeCurrentOnBoard();
				return true;
			}
		}
		this.jumpDown = function () {
				this.gameLoop(true);
		}

		this.setGameOver = function (state) {
			this.gameOver = state;
		}
		this.debugBoard = function () {
			var str = "";
			for (var i = 0; i < NTConfig.boardHeight; i ++) {
				for (var j = 0; j < NTConfig.boardWidth; j++) {
					if (this.board.state[i][j].isFilled) {
						str = str + "+";
					} else {
						str = str + ".";
					}
				}
				str = str + "\n";
			}
			return str;
		}
		this.clearTempNTMino = function () {
			for (var i = 0; i < NTConfig.boardHeight; i ++) {
				for (var j = 0; j < NTConfig.boardWidth; j++) {
					if (this.board.state[i][j].isTemporary) {
						this.board.state[i][j] = new NT.NTCell();
					}
				}
			}
		}
		this.placeCurrentOnBoard = function () {
			this.clearTempNTMino();
			var tmpMino = this.currentNetrimino.variants[this.currentNetriminoVariantIndex];
			for (var i in tmpMino) {
				for (var j in tmpMino[i]) {
					if (tmpMino[i][j] > 0) {
						var tmpCell = new NT.NTCell();
						tmpCell.isFilled = true;
						tmpCell.color = this.currentColor;
						var row = (i * 1) + this.currentRow;
						var collumn = (j * 1) + this.currentCollumn;
						this.board.state[row][collumn] = tmpCell;
					}
				}
			}
		}
		this.checkEmptySpace = function () {
			for (var i = 0; i < NTConfig.boardHeight; i ++) {
				for (var j = 0; j < NTConfig.boardWidth; j++) {
					if (this.board.state[i][j].isTemporary && this.board.state[i][j].isFilled) {
						if ((i * 1) + 1 > (NTConfig.boardHeight - 1)) {
							return false;
						} else {
							if (this.board.state[(i * 1) + 1][j].isFilled && !this.board.state[(i * 1) + 1][j].isTemporary) {
								return false;
							}
						}
					}
				}
			}
			return true;
		}
		this.slideDown = function (forceFaster) {
			this.currentRow++;
			this.placeCurrentOnBoard();
		}
		this.freezeCurrent = function () {
			for (var i = 0; i < NTConfig.boardHeight; i ++) {
				for (var j = 0; j < NTConfig.boardWidth; j++) {
					if (this.board.state[i][j].isTemporary && this.board.state[i][j].isFilled) {
						this.board.state[i][j].isTemporary = false;
					}
				}
			}
		}
		this.ntLottery = function () {
			this.currentNetrimino = NT.NTMinos[NTTools.getRandomInt(0, NT.NTMinos.length - 1)];
			this.currentNetriminoVariantIndex = NTTools.getRandomInt(0, this.currentNetrimino.variants.length - 1);
			this.currentRow = 0;
			this.currentCollumn = Math.floor(NTConfig.boardWidth / 2);
			this.placeCurrentOnBoard();
			if (!this.checkEmptySpace()) {
				this.setGameOver(true);
			}
		}
		this.unwantedCharge = function () {

		}
		this.clearFull = function (emptyCollumn) {
			var lineClear = true;
			var points = 0;
			for (var i = 0; i < NTConfig.boardHeight; i++) {
				lineClear = true;
				points = 0;
				for (var j = 0; j < NTConfig.boardWidth; j++) {
					if (!this.board.state[i][j].isFilled) {
						lineClear = false;
					} else {
						points += this.board.state[i][j].multiplier;
					}
				}
				if (lineClear) {
					this.points += points;
					this.board.state.splice(i, 1);
					var row = [];
					for (var k = 0; k < NTConfig.boardWidth; k++) {
						row.push(new NT.NTCell());
					}
					this.board.state.unshift(row);
				}
			}
		}
		this.NTLogic = function () {
			console.log(this.debugBoard());
			if (this.checkEmptySpace()) {
				this.slideDown();
			} else {
				this.freezeCurrent();
				this.clearFull();
				this.ntLottery();
			}
		}

		this.gameLoop = function (forceFaster) {
			if (!this.gameOver) {
				var thisMoment = new Date().getTime();
				if (this.currentNetrimino === null) {
					this.ntLottery();
				}
				if (forceFaster) {
					this.NTLogic();
				} else {
					if ((thisMoment - this.timeLastJump) > 1000 / this.timeMultiplier) {
						this.timeLastJump = new Date().getTime();
						this.NTLogic();
					}
				}
			} else {
				// console.log("GAME OVER");
			}
		}
	}
};
