var NT = {
	NTMinos: [
		{
			name: "I",
			variants: [
				[2,1,1,1],
				[[2],[1],[1],[1]]
			]
		},
		{
			name: "T",
			variants: [
				[[1,2,1],[0,1,0]],
				[[1,0],[2,1],[1,0]],
				[[0,1,0],[1,2,1]],
				[[0,1],[1,2],[0,1]]
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
		this.defaultWidth = 10;
		this.defaultHeight = 20;
		this.state = [];
		for(i = 0; i < 20 ; i++) {	//ROWS
			var row = [];
			for(j = 0; j < 10 ; j++) {	//COLLUMNS
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
		this.currentRow = 0;
		this.currentCollumn = 4;
		this.currentColor = "#900090";
		this.timeStarted = new Date().getTime();
		this.timeLastCheck = new Date().getTime();

		this.board = new NT.NTBoard();

		this.checkSpace = function () {
			return true;
		}
		this.slideDown = function (forceFaster) {
			var thisMoment = new Date().getTime();
			if(forceFaster) {
				//@TODO - jump to the nearest floor
			} else {
				// if(thisMoment - this.timeStarted) {
					//@TODO - normal time dependent slide
				// }
			}
		}
		this.stickCurrent = function () {

		}
		this.ntLottery = function () {
			function getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
			this.currentNetrimino = NT.NTMinos[getRandomInt(0, NT.NTMinos.length - 1)];
			this.currentRow = 0;
			this.currentCollumn = 4;
		}
		this.unwantedCharge = function () {

		}
		this.clearFull = function (emptyCollumn) {

		}

		this.gameLoop = function () {
			if(this.currentNetrimino === null) {
				this.ntLottery();
			}
			if(this.checkSpace()) {
				this.slideDown();
			} else {
				this.stickCurrent();
				this.clearFull();
				this.ntLottery();
			}
			// this.unwantedCharge(5);
		}
	}
};