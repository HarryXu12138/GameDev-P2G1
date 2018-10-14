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
let difficultylevel = 1;

gamePlayState.prototype.init = function(levelNum){
	levelNumber = levelNum;
};

gamePlayState.prototype.create = function(){
	console.info(levelNumber);

	//game.stage.backgroundColor = "#4488AA";

	this.backgroundStuff = game.add.group();
	
	let background1 = this.backgroundStuff.create(0,0, "Level1");
	background1.height = 2100;
	background1.width = 1125;

	let background2 = this.backgroundStuff.create(0,-2100, "Level1");
	background2.height = 2100;
	background2.width = 1125;

	//Pull info file for this level out of the cache and load it into line info, splitting it per line
	if(levelNumber !== 0)
	{
		let infoFile = this.cache.getText("" + levelNumber);
		lineInfo = infoFile.split("\n");
		bpm = parseInt(lineInfo[0]);
	}
	console.info(bpm);

	//Create the "staff" on the screen
	let line1 = game.add.sprite(95.5 - 56.25, 0, "line");
	let line2 = game.add.sprite(95.5 - 56.25 + 225, 0, "line");
	let line3 = game.add.sprite(95.5 - 56.25 + 225 * 2, 0, "line");
	let line4 = game.add.sprite(95.5 - 56.25 + 225 * 3, 0, "line");
	let line5 = game.add.sprite(95.5 - 56.25 + 225 * 4, 0, "line");	

	//Set up the group for notes
	this.notes = game.add.group();

	//Set up the group for obstacles
	this.obstacles = game.add.group();

	beatline = 500;


};

gamePlayState.prototype.update = function(){
	//If it's been long enough since the last spawn, spawn stars
	let d = new Date();
	if(levelNumber !== 0)
	{
		if((d.getTime() - timeSince >= (bpm/60) * 1000) && spawning){
			let currentLine = lineInfo[lineNumber];
			//parse through the current line from the level info doc, spawning a star if there's a 1
			for(let x = 0; x < currentLine.length; x++){
				if(currentLine.charAt(x) === "1"){
					//console.info("got here");
					let note = this.notes.create((x*225) + 112.5/2, 0, "quarternote");
					note.moving = true;
					note.height = 128;
					note.width = 128;	
				}
				else if(currentLine.charAt(x) === "2"){
					let obstacle = this.obstacles.create((x*225) + 112.5/2, 0, "Level1");
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
	}
	else{
		//Code for randomly generating lines for endles mode
		let notePlace = (Math.random() * 5) % 1;
		for(let x = 0; x < 5; x++){
			if(x === notePlace)
			{
				let note = this.notes.create((x*225) + 112.5/2, 0, "quarternote");
				note.moving = true;
				note.height = 128;
				note.width = 128;	
			}
			else{
				let spawnProb = Math.random();
				if(spawnProb < difficultylevel/5){
					let obstacle = this.obstacles.create((x*225) + 112.5/2, 0, "Level1");
					obstacle.width = 128;
					obstacle.height = 128;
				}
			}
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

	for(let i = 0; i < this.backgroundStuff.children.length; i++)
	{
		this.backgroundStuff.children[i].y = this.backgroundStuff.children[i].y + 20;
		if(this.backgroundStuff.children[i].y >= 2100)
		{
			this.backgroundStuff.children[i].y = -2100;
		}
	}


};