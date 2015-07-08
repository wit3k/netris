var NT = {
	NTMinos: {
		I: {
			variants: [
				[2,1,1,1],
				[[2],[1],[1],[1]]
			]
		},
		T: {
			variants: [
				[[1,2,1],[0,1,0]],
				[[1,0],[2,1],[1,0]],
				[[0,1,0],[1,2,1]],
				[[0,1],[1,2],[0,1]]
			]
		},
		O: {
			variants: [
				[[1,1],[1,1]]
			]
		},
		L: {
			variants: [
				[[1,0],[1,0],[1,1]],
				[[0,0,1],[1,1,1]],
				[[1,1],[0,1],[0,1]],
				[[1,1,1],[1,0,0]]
			]
		},
		J: {
			variants: [
				[[0,1],[0,1],[1,1]],
				[[1,1,1],[0,0,1]],
				[[1,1],[1,0],[1,0]],
				[[1,0,0],[1,1,1]]
			]
		},
		S: {
			variants: [
				[[0,1,1],[1,1,0]],
				[[1,0],[1,1],[0,1]],
			]
		},
		Z: {
			variants: [
				[[1,1,0],[0,1,1]],
				[[0,1],[1,1],[1,0]]
			]
		}
	},
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
		this.currentColor = "#900090";
		this.timeStarted = new Date().getTime();

		this.board = new NT.NTBoard();

		var checkSpace = function () {


		}
		var slideDown = function () {

		}
		var ntLottery = function () {

		}
		var unwantedCharge = function () {

		}
		var clearFull = function (emptyCollumn) {

		}

		this.gameLoop = function () {
			console.log("Game loop");
			if(this.currentNetrimino === null) {
				ntLottery();
			}
			if(checkSpace()) {
				slideDown();
			} else {
				clearFull();
				ntLottery();
			}
			unwantedCharge(5);
		}
	}
};