function showCover() {
  const coverDiv = document.createElement('div');
  coverDiv.classList.add('cover-div');

  document.body.style.overflowY = 'hidden';
  document.body.append(coverDiv);
};

function hideCover() {
  document.querySelector('.cover-div').remove();
  document.body.style.overflowY = '';
};

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

let blueTile = document.querySelector('.game__tile_blue');

let blueTileAudio = new Audio('sounds/1.mp3');

blueClick = function() {
	blueTile.style.backgroundColor = 'LightSkyBlue';
	setTimeout(() => blueTile.style.backgroundColor = 'DeepSkyBlue', 100);
	blueTileAudio.currentTime = 0;
	blueTileAudio.play();
};

let redTile = document.querySelector('.game__tile_red');

let redTileAudio = new Audio('sounds/2.mp3');

redClick = function() {
	redTile.style.backgroundColor = 'LightSalmon';
	setTimeout(() => redTile.style.backgroundColor = 'Salmon', 100);
	redTileAudio.currentTime = 0;
	redTileAudio.play();
};

let yellowTile = document.querySelector('.game__tile_yellow');

let yellowTileAudio = new Audio('sounds/3.mp3');

yellowClick = function() {
	yellowTile.style.backgroundColor = 'LightYellow';
	setTimeout(() => yellowTile.style.backgroundColor = 'Yellow', 100);
	yellowTileAudio.currentTime = 0;
	yellowTileAudio.play();
};

let greenTile = document.querySelector('.game__tile_green');

let greenTileAudio = new Audio('sounds/4.mp3');

greenClick = function() {
	greenTile.style.backgroundColor = 'PaleGreen';
	setTimeout(() => greenTile.style.backgroundColor = 'GreenYellow', 100);
	greenTileAudio.currentTime = 0;
	greenTileAudio.play();
};

let game = new Vue({
	el: '#game',
	data: {
		round: 0,
		sequence: [],
		index: 0,
		time: 1500
	},
	methods: {
		nextRound: function() {
			this.round += 1;
			this.sequence.push( randomInteger(1, 4) );
			this.playSequence();
			this.index = 0;
			
			setTimeout( () => { 
				this.addCheckListener();
				this.addClickListener();
			}, this.time*this.round);
		},
		findTile: function(value) {
			return Array.prototype.slice.call(document.querySelectorAll('.game__tile')).find(item => item.getAttribute('value') == value)
		},
		playSequence: function() {
			this.sequence.forEach((elem, index) => setTimeout(() => {
				switch (elem) {
					case 1:
						blueClick();
						break;
					case 2:
						redClick();
						break;
					case 3:
						yellowClick();
						break;
					case 4:
						greenClick();
						break;
				}
			}, this.time*index));
		},
		checkBlueClick: function() {
			if (blueTile.getAttribute('value') != game.sequence[this.index]) {
				this.removeCheckListener();
				this.removeClickListener();
				this.round = 0;
				this.sequence = [];
				this.$refs.button.addEventListener('click', game.startGame);
				this.$refs.button.classList.add('hover');
			} else if (this.index+1 < this.round) {
				this.index += 1;
			} else {
				this.removeCheckListener();
				setTimeout(() => this.removeClickListener(), 0);
				setTimeout(() => this.nextRound(), 1000);
			}
		},
		checkRedClick: function() {
			if (redTile.getAttribute('value') != game.sequence[this.index]) {
				this.removeCheckListener();
				this.removeClickListener();
				this.round = 0;
				this.sequence = [];
				this.$refs.button.addEventListener('click', game.startGame);
				this.$refs.button.classList.add('hover');
			} else if (this.index+1 < this.round) {
				this.index += 1;
			} else {
				this.removeCheckListener();
				setTimeout(() => this.removeClickListener(), 0);
				setTimeout(() => this.nextRound(), 1000);
			}
		},
		checkYellowClick: function() {
			if (yellowTile.getAttribute('value') != game.sequence[this.index]) {
				this.removeCheckListener();
				this.removeClickListener();
				this.round = 0;
				this.sequence = [];
				this.$refs.button.addEventListener('click', game.startGame);
				this.$refs.button.classList.add('hover');
			} else if (this.index+1 < this.round) {
				this.index += 1;
			} else {
				this.removeCheckListener();
				setTimeout(() => this.removeClickListener(), 0);
				setTimeout(() => this.nextRound(), 1000);
			}
		},
		checkGreenClick: function() {
			if (greenTile.getAttribute('value') != game.sequence[this.index]) {
				this.removeCheckListener();
				this.removeClickListener();
				this.round = 0;
				this.sequence = [];
				this.$refs.button.addEventListener('click', game.startGame);
				this.$refs.button.classList.add('hover');
			} else if (this.index+1 < this.round) {
				this.index += 1;
			} else {
				this.removeCheckListener();
				setTimeout(() => this.removeClickListener(), 0);
				setTimeout(() => this.nextRound(), 1000);
			}
		},
		addClickListener: function() {
			blueTile.addEventListener('click', blueClick);
			redTile.addEventListener('click', redClick);
			yellowTile.addEventListener('click', yellowClick);
			greenTile.addEventListener('click', greenClick);
			blueTile.classList.add('hover');
			redTile.classList.add('hover');
			yellowTile.classList.add('hover');
			greenTile.classList.add('hover');
		},
		removeClickListener: function() {
			blueTile.removeEventListener('click', blueClick);
			redTile.removeEventListener('click', redClick);
			yellowTile.removeEventListener('click', yellowClick);
			greenTile.removeEventListener('click', greenClick);
			blueTile.classList.remove('hover');
			redTile.classList.remove('hover');
			yellowTile.classList.remove('hover');
			greenTile.classList.remove('hover');
		},
		addCheckListener: function() {
			blueTile.addEventListener('click', this.checkBlueClick);
			redTile.addEventListener('click', this.checkRedClick);
			yellowTile.addEventListener('click', this.checkYellowClick);
			greenTile.addEventListener('click', this.checkGreenClick);
		},
		removeCheckListener: function() {
			blueTile.removeEventListener('click', this.checkBlueClick);
			redTile.removeEventListener('click', this.checkRedClick);
			yellowTile.removeEventListener('click', this.checkYellowClick);
			greenTile.removeEventListener('click', this.checkGreenClick);
		},
		startGame: function() {			
			this.$refs.button.removeEventListener('click', game.startGame);
			this.$refs.button.classList.remove('hover');
			
			this.nextRound();
		}
	}
});

document.querySelector('.page__button').addEventListener('click', game.startGame);
document.querySelector('.page__button').classList.add('hover');