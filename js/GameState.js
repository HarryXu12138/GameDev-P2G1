let gamePlayState = function(){
	
};

let levelNumber = 0;

let lineInfo = [];
let d = new Date();
let timeSince = d.getTime();
let lineNumber = 0;
let spawning = true;

gamePlayState.prototype.init = function(levelNum){
	levelNumber = levelNum;
};

gamePlayState.prototype.create = function(){
	console.info(levelNumber);

	//Pull info file for this level out of the cache and load it into line info, splitting it per line
	let infoFile = this.cache.getText("" + levelNumber);
	lineInfo = infoFile.split("\n");

	//Set up the group for notes
	this.notes = game.add.group();

	this.musicManager = new MusicManager(game);

	this.score = 0;
	this.stunTimer = 0; // if it's greater than zero we count down until it's zero and we aren't stunned
	this.planeChannel = 2; // start at the middle channel

	// this is for determining plane swipes:
	// this.events.onInputDown.add(this.cursorDownListener);
	// this.events.onInputUp.add(this.cursorUpListener);
	this.pointerDownLoc = null; // this is set by the oninput down and used for swipe determination.
};

gamePlayState.prototype.update = function(){
	//If it's been long enough since the last spawn, spawn stars
	let d = new Date();
	if((d.getTime() - timeSince >= 1000) && spawning){
		// this.musicManager.playNote(0, 0, 0);
		let currentLine = lineInfo[lineNumber];
		//parse through the current line from the level info doc, spawning a star if there's a 1
		for(let x = 0; x < currentLine.length; x++){
			if(currentLine.charAt(x) === "1"){
				//console.info("got here");
				let note = this.notes.create((x*225) + 112.5, 0, "quarternote");
				note.height = 128;
				note.width = 128;
				note.inputEnabled = true;
				//note.body.gravity.y = 300;
				//star.playable = true;
				//star.inputEnabled = true;
				//star.events.onInputDown.add(listener, star);
				timeSince = d.getTime();


				note.score = 1001;

				note.events.onInputDown.add( (note) => { playNote(this.musicManager, 0, x, 0, 100); this.increaseScore(note); }, this);
			}
		}
		lineNumber++;
		if(lineNumber >= lineInfo.length){
			spawning = false;
		}
	}

	//move the notes, destroying them if they reach the bottom
	for(let i = 0; i < this.notes.children.length; i++)
	{
		this.notes.children[i].y = this.notes.children[i].y + 20;
		if(this.notes.children[i].y >= 2100)
		{
			//console.info("destroyed");
			this.notes.children[i].destroy();
		}
	}
};

playNote = function(musicManager, instrument, note, duration, score) {
	// this gets turned into an anonymous function which already has the correct note passed in etc.
	// also need to determine how close to the beat you are
	// note is x from left to right
	// duration is 0 = quarter, 1 = half, 2 = whole
	musicManager.playNote(0, note, duration);
}

gamePlayState.prototype.increaseScore = function(note) {
	this.score += note.score;
	console.log("Score: " + this.score);
}


gamePlayState.prototype.cursorDownListener = function(pointer) {
	this.pointerDownLoc = pointer;
}

gamePlayState.prototype.cursorUpListener = function(pointer) {
	var dx = pointer.x - this.pointerDownLoc.x;
	var dy = pointer.y - this.pointerDownLoc.y;

	if (Math.abs(dx) > this.minSwipeDistance) {
		// then change the planes channel if possible
		if (dx < 0 && this.planeChannel > 0) {
			this.planeChannel -= 1;
			// also set up the animation
		}
		else if (dx > 0 && this.planeChannel < 4) {
			this.planeChannel += 1;
			// also set up the animation
		}
		console.log("Swipe detected. Channel = " + this.planeChannel);
	}
}