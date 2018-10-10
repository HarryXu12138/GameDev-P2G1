let gamePlayState = function(){
	
};

let levelNumber = 0;

let lineInfo = [];
let d = new Date();
let timeSince = d.getTime();
let lineNumber = 1;
let spawning = true;
let bpm = 0;
let beatline = 0;

gamePlayState.prototype.init = function(levelNum){
	levelNumber = levelNum;
};

gamePlayState.prototype.create = function(){
	console.info(levelNumber);

	game.stage.backgroundColor = "#4488AA";

	//Pull info file for this level out of the cache and load it into line info, splitting it per line
	let infoFile = this.cache.getText("" + levelNumber);
	lineInfo = infoFile.split("\n");
	bpm = parseInt(lineInfo[0]);

	console.info(bpm);

	//Set up the group for notes
	this.notes = game.add.group();

	//Set up the group for obstacles
	this.obstacles = game.add.group();

	beatline = 500;

	let line1 = new Phaser.Line(112.5, 0 , 112.5, 2100);
		
};

gamePlayState.prototype.update = function(){
	//If it's been long enough since the last spawn, spawn stars
	let d = new Date();
	if((d.getTime() - timeSince >= (bpm/60) * 1000) && spawning){
		let currentLine = lineInfo[lineNumber];
		//parse through the current line from the level info doc, spawning a star if there's a 1
		for(let x = 0; x < currentLine.length; x++){
			if(currentLine.charAt(x) === "1"){
				//console.info("got here");
				let note = this.notes.create((x*225) + 112.5, 0, "quarternote");
				note.moving = true;
				note.height = 128;
				note.width = 128;	
			}
			else if(currentLine.charAt(x) === "2"){
				let obstacle = this.obstacles.create((x*225) + 112.5, 0, "Level1");
				obstacle.width = 128;
				obstacle.height = 128;
			}
		}
		timeSince = d.getTime();
		lineNumber++;
		if(lineNumber >= lineInfo.length){
			spawning = false;
		}

	}

	//move the notes, destroying them if they reach the bottom
	for(let i = 0; i < this.notes.children.length; i++){
		if(this.notes.children[i].moving)
		{
			this.notes.children[i].y = this.notes.children[i].y + 500 * (2/bpm);
		}
		//console.info(i);
		if(this.notes.children[i].y >= 2100){
			
			//this.notes.children[i].kill();
			//this.notes.remove(this.notes.children[i]);
		}
	}

	for(let i = 0; i < this.obstacles.children.length; i++){

		this.obstacles.children[i].y = this.obstacles.children[i].y + 500 * (2/bpm);
		//console.info(i);
		if(this.obstacles.children[i].y >= 2100){
			
			//this.notes.children[i].kill();
			//this.obstacles.remove(this.obstacles.children[i]);
		}
	}


};