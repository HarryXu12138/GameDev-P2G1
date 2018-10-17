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
let diffTimeTracker = 0;

gamePlayState.prototype.init = function(levelNum){
	levelNumber = levelNum;
	//levelNumber = 0;
	lineInfo = [];
	d = new Date();
	timeSince = d.getTime();
	lineNumber = 1;
	spawning = true;
	bpm = 0;
	beatline = 0;
	difficultylevel = 1;
	diffTimeTracker = 0;
};

gamePlayState.prototype.create = function(){
	console.info(levelNumber);
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//game.stage.backgroundColor = "#4488AA";


	this.backgroundStuff = game.add.group();

	//let background1 = this.backgroundStuff.create(0,0, "bg1.1");
	//background1.height = 2500;
	//background1.width = 1125;

	//let background2 = this.backgroundStuff.create(0,-2500, "bg1.1");
	//background2.height = 2500;
	//background2.width = 1125;

	let backgroundF = game.add.sprite(0,-2500, "bg1.2");
	backgroundF.height = 2500;
	backgroundF.width = 1125;

	//Pull info file for this level out of the cache and load it into line info, splitting it per line
	if(levelNumber !== 0){
		let infoFile = this.cache.getText("" + levelNumber);
		lineInfo = infoFile.split("\n");
		bpm = parseInt(lineInfo[0]);
	}
	else{
		diffTimeTracker = new Date();
		bpm = 60;
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
	this.obstacles.enableBody = true;
	this.musicManager = new MusicManager(game);

	//Set up player
	this.player = game.add.sprite(562.5 - 175, 2036, "playerN");
	this.player.width = 350;
	this.player.height = 350;
	this.player.enableBody = true;
	game.physics.arcade.enable(this.player);
	//this.player.animations.add("left", [3], 250, false);
	//this.player.animations.add("right", [2], 250, false);


	this.score = 0;
	this.stunTimer = 0; // if it's greater than zero we count down until it's zero and we aren't stunned
	console.info("stun timer is " + this.stunTimer);
	this.planeChannel = 2; // start at the middle channel
	beatline = 500;

	// this is for determining plane swipes:
	game.input.onDown.add((p) => {this.cursorDownListener(p); });
	game.input.onUp.add((p) => {this.cursorUpListener(p); });
	this.pointerDownX = null;
	this.pointerDownY = null; // this is set by the oninput down and used for swipe determination.
	this.initializeUI();
};

gamePlayState.prototype.initializeUI = function() {
	let goBackButtonPosition = [0.1 * game.width, 0.05 * game.height];
    let goBackButtonShape = [200, 200];
    let goBackButtonSprite = 'GoBackButton';
    let goBackButtonSpriteFrames = [1, 0, 2, 2];

    let callback = function() {game.state.start('LevelSelectState');};

    this.goBackButton = game.add.button(goBackButtonPosition[0], goBackButtonPosition[1], goBackButtonSprite, callback, this,
        goBackButtonSpriteFrames[0], goBackButtonSpriteFrames[1], goBackButtonSpriteFrames[2], goBackButtonSpriteFrames[3]);
    this.goBackButton.anchor.setTo(0.5, 0.5);
    this.goBackButton.width = goBackButtonShape[0];
    this.goBackButton.height = goBackButtonShape[1];
};

gamePlayState.prototype.update = function(){
	//Check if the player and an obstacles are colliding
	game.physics.arcade.overlap(this.player, this.obstacles, this.hitObstacle, null, this);

	//tick down stun timer
	if(this.stunTimer > 0)
	{
		this.stunTimer--;
		//console.info(this.stunTimer);
		if(this.stunTimer === 0)
		{
			//console.info("not stunned");
			this.player.alpha = 1.0;
		}
	}


	//If it's been long enough since the last spawn, spawn stars
	let d = new Date();
	if(levelNumber !== 0)
	{
		if((d.getTime() - timeSince >= (60/bpm) * 1000) && spawning){
			let currentLine = lineInfo[lineNumber];
			console.info(currentLine);
			//parse through the current line from the level info doc, spawning a star if there's a 1
			for(let x = 0; x < currentLine.length; x++){
				if(currentLine.charAt(x) === "1"){
					//console.info("got here");
					let note = this.notes.create((x*225) - 20, -256, "" + x);
					note.moving = true;
					note.height = 256;
					note.width = 256;
					note.score = 1001;
					note.inputEnabled = true;
					note.animations.add("clicked", [0,1,2], 6, false);
					note.events.onInputDown.add( (note) => { this.playNote(this.musicManager, 0, x, 0, 100); this.increaseScore(note); }, this);
				}
				else if(currentLine.charAt(x) === "2"){
					let obstacle = this.obstacles.create((x*225) - 20, -256, "Level1");
					obstacle.width = 256;
					obstacle.height = 256;
					obstacle.channel = x;
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
		//Code for randomly generating lines for endles mode\
		if(d.getTime() - timeSince >= (60/bpm) * 1000)
		{

			let notePlace = Math.floor(Math.random() * 5);
			let obstNum = 0;

			//console.info("got here " + notePlace);
			for(let x = 0; x < 5; x++){
				if(x === notePlace)
				{
					let note = this.notes.create((x*225) - 20, -256, "" + x);
					note.moving = true;
					note.height = 256;
					note.width = 256;	
					note.score = 1001;
					note.inputEnabled = true;

					note.events.onInputDown.add( (note) => { this.playNote(this.musicManager, 0, x, 0, 100); this.increaseScore(note); }, this);
				}
				else{
					let spawnProb = Math.random();
					if(spawnProb < (difficultylevel * .75)/5 && obstNum <= difficultylevel){
						let obstacle = this.obstacles.create((x*225) - 20, -256, "Level1");
						obstacle.width = 256;
						obstacle.height = 256;
						obstacle.channel = x;
						obstNum++;
					}
				}
			}
			timeSince = new Date();
		}
		if(d.getTime() - diffTimeTracker >= 1000 *2 * 60 && difficultylevel < 4)
		{
			
			difficultylevel++;
			bpm = bpm + 30;
			diffTimeTracker = new Date();
			//console.info("got here1" + difficultylevel + " " + bpm);
		}
	}

	//move the notes, destroying them if they reach the bottom
	for(let i = 0; i < this.notes.children.length; i++){
		if(this.notes.children[i].moving)
		{
			this.notes.children[i].y = this.notes.children[i].y + bpm/5;
		}
		//console.info(i);
		if(this.notes.children[i].y >= 2436){
			
			//this.notes.children[i].kill();
			//this.notes.remove(this.notes.children[i]);
		}
	}

	for(let i = 0; i < this.obstacles.children.length; i++){

		this.obstacles.children[i].y = this.obstacles.children[i].y + bpm/5;
		//console.info(i);
		if(this.obstacles.children[i].y >= 2436){
			
			//this.notes.children[i].kill();
			//this.obstacles.remove(this.obstacles.children[i]);
		}
	}

	for(let i = 0; i < this.backgroundStuff.children.length; i++)
	{
		this.backgroundStuff.children[i].y = this.backgroundStuff.children[i].y + 8;
		if(this.backgroundStuff.children[i].y >= 2500)
		{
			this.backgroundStuff.children[i].y = -2500;
		}
	}

	this.goBackButton.bringToTop();
};

gamePlayState.prototype.playNote = function(musicManager, instrument, note, duration, score) {
	// this gets turned into an anonymous function which already has the correct note passed in etc.
	// also need to determine how close to the beat you are
	// note is x from left to right
	// duration is 0 = quarter, 1 = half, 2 = whole
	//console.info("got here 2");
	//console.info("music manager " + this.stunTimer);
	if(this.stunTimer === 0)//only play music while not stunned
	{
		musicManager.playNote(0, note, duration);
	}
}

gamePlayState.prototype.increaseScore = function(note) {
	if(this.stunTimer === 0)//only incrase score while not stunned
	{
		this.score += note.score;
		//play the delete animation
		note.animations.play("clicked");
		note.moving = false;
		let disappear = game.add.tween(note);
		disappear.to({alpha: 0}, 500);
		disappear.onComplete.add(this.deleteNote);
		disappear.start();
	}
	//console.log("Score: " + this.score);
}


gamePlayState.prototype.cursorDownListener = function(pointer) {
	// passing in the gamestate because it needs a reference to it
	// console.log("On Down " + pointer.x + " " + pointer.y);
	this.pointerDownX = pointer.x;
	this.pointerDownY = pointer.y;
}

gamePlayState.prototype.cursorUpListener = function(pointer) {
	// console.log("On up "+ pointer.x + " " + pointer.y);

	var dx = pointer.x - this.pointerDownX;
	var dy = pointer.y - this.pointerDownY;
	// console.log("Dx " + dx);

	if (Math.abs(dx) > 100) { // min swipe distance
		// then change the planes channel if possible
		if (dx < 0 && this.planeChannel > 0) {
			this.planeChannel -= 1;
			// also set up the animation
			let planeMove = game.add.tween(this.player);
			planeMove.to({x: ((95 + 225 * this.planeChannel) - 150)}, 250);
			planeMove.onComplete.add(this.resetPlane, this);
			planeMove.start();
			//this.player.animations.play("left");
			this.player.loadTexture("playerL");
		}
		else if (dx > 0 && this.planeChannel < 4) {
			this.planeChannel += 1;
			// also set up the animation
			let planeMove = game.add.tween(this.player);
			planeMove.to({x: ((95 + 225 * this.planeChannel) - 150)}, 250);
			planeMove.onComplete.add(this.resetPlane, this);
			planeMove.start();
			//this.player.animations.play("right");
			this.player.loadTexture("playerR");
		}
		// console.log("Swipe detected. Channel = " + this.planeChannel);
	}
}

gamePlayState.prototype.hitObstacle = function(player, obst){
	
	if(this.stunTimer === 0 && obst.channel === this.planeChannel)//if not stunned, activate stun
	{
		//console.info("stunned");	
		this.player.alpha = 0.80;
		this.stunTimer = 100;
	}
}

gamePlayState.prototype.resetPlane = function(){
	this.player.loadTexture("playerN");
}

gamePlayState.prototype.deleteNote = function(note){
	note.kill();
}