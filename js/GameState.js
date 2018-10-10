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
};

gamePlayState.prototype.update = function(){
	//If it's been long enough since the last spawn, spawn stars
	let d = new Date();
	if((d.getTime() - timeSince >= 1000) && spawning){
		let currentLine = lineInfo[lineNumber];
		//parse through the current line from the level info doc, spawning a star if there's a 1
		for(let x = 0; x < currentLine.length; x++){
			if(currentLine.charAt(x) === "1"){
				//console.info("got here");
				let note = this.notes.create((x*225) + 112.5, 0, "quarternote");
				note.height = 128;
				note.width = 128;
				//note.body.gravity.y = 300;
				//star.playable = true;
				//star.inputEnabled = true;
				//star.events.onInputDown.add(listener, star);
				timeSince = d.getTime();
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

playNote = function(note, score) {
	// this gets turned into an anonymous function which already has the correct note passed in etc.
	
}