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

	this.planeSpeed = 0; // this is for animating the flight off screen nicer with a curve.
	this.won = false; // this becomes true when the person wins duh. This can't happen in infinite mode.
	this.lost = false; // this become true when the person looses.
};

gamePlayState.prototype.create = function(){
	this.addCheatKeys();
	console.info(levelNumber);
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//game.stage.backgroundColor = "#4488AA";


	this.backgroundStuff = game.add.group();

	let background1 = this.backgroundStuff.create(0,0, "bg" + levelNumber);
	//background1.height = 2500;
	//background1.width = 1125;

	let background2 = this.backgroundStuff.create(0,-2500, "bg" + levelNumber);
	background2.y = -1 * background2.height;
	//background2.height = 2500;
	//background2.width = 1125;

	//let backgroundF = game.add.sprite(0,-2500, "bg1.2");
	//backgroundF.height = 2500;
	//backgroundF.width = 1125;

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
	line1.height = 2500;
	line1.alpha = .4;
	let line2 = game.add.sprite(95.5 - 56.25 + 225, 0, "line");
	line2.height = 2500;
	line2.alpha = .4;
	let line3 = game.add.sprite(95.5 - 56.25 + 225 * 2, 0, "line");
	line3.height = 2500;
	line3.alpha = .4;
	let line4 = game.add.sprite(95.5 - 56.25 + 225 * 3, 0, "line");
	line4.height = 2500;
	line4.alpha = .4;
	let line5 = game.add.sprite(95.5 - 56.25 + 225 * 4, 0, "line");
	line5.height = 2500;
	line5.alpha = .4;

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
	this.displayScore = 0;
	this.notesOnScreen = 0;
	this.notesHit = 0;
	this.notesMissed = 0;
	this.stunTimer = 0; // if it's greater than zero we count down until it's zero and we aren't stunned
	console.info("stun timer is " + this.stunTimer);
	this.planeChannel = 2; // start at the middle channel
	beatline = 500;



	this.won = false;
	this.lost = false;
	this.playing = true;
	spawning = true;
	this.hasShownScoreUI = false;

	// this is for accuray counting
	this.accuracyBuffer = [];
	this.accuracyBufferLength = 10;
	this.accuracyIndex = 0; // the current index to keep track of
	this.accuracyCorrect = 0;
	this.accuracyIncorrect = 0;
	for(let i = 0; i < this.accuracyBufferLength; i++){
		if (i % 2 === 0) { // i < (this.accuracyBufferLength + 1)/2 
			this.accuracyBuffer.push(true);
			this.accuracyCorrect++;
		} else {
			this.accuracyBuffer.push(false);
			this.accuracyIncorrect++;
		}
	}
	this.accuracy = this.accuracyCorrect / (this.accuracyBufferLength);
	this.displayedAccuracy = this.accuracy;

	this.accuracyBar = game.add.sprite(1125/8, 140, "accuracyBar");
	this.accuracyBar.width = 1125/4*3;
	this.accuracyBar.height = 200;
	// this.accuracyBar.width 
	this.accuracyBar.alpha = 1;

	// this is for determining plane swipes:
	game.input.onDown.add((p) => {this.cursorDownListener(p); });
	game.input.onUp.add((p) => {this.cursorUpListener(p); });
	this.pointerDownX = null;
	this.pointerDownY = null; // this is set by the onInputDownnput down and used for swipe determination.
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

    this.displayScoreStyle = { font: "65px Courier New", fill: "#ffffff", align: "center" };
    this.scoreText = game.add.text(game.world.centerX, 0.15 * game.height, "0", this.displayScoreStyle);
    this.scoreText.align = 'center';
    this.scoreText.anchor.setTo(0.5, 0.5);
};

gamePlayState.prototype.update = function(){
	//Check if the player and an obstacles are colliding
	if (this.playing) {
		game.physics.arcade.overlap(this.player, this.obstacles, this.hitObstacle, null, this);
	}
	if (this.won) {
		// then move the player sprite vertically upwards, and if they are off screen go to the win screen!
		this.planeSpeed += .5; // accelerate each frame
		this.player.y -= this.planeSpeed;
		if (this.player.y < -450) {
			// then move to the win screen, or for now, the level select screen
			if (!this.hasShownScoreUI) {
				this.hasShownScoreUI = true;
				this.showScoreUI();
				menuPlaneY = game.height; // so that it starts off screen and everything looks nice in the menu
			}
		}
	} else if (this.lost) {
		this.planeSpeed -= .5;
		this.player.y -= this.planeSpeed;
		if (this.player.y > 2500) {
			if (!this.hasShownScoreUI) {
				this.hasShownScoreUI = true;
				this.showScoreUI();
				menuPlaneY = game.height; // so that it starts off screen and everything looks nice in the menu
			}
		}
	}

	if (this.playing) {
		//tick down stun timer
		if(this.stunTimer > 0)
		{
			this.stunTimer--;
			//console.info(this.stunTimer);
			if (this.stunTimer % 10 < 5) {
				this.player.tint = 0xFF0000; // tint it red to flash a warning
			} else {
				this.player.tint = 0xFFFFFF;
			}
			if(this.stunTimer === 0)
			{
				//console.info("not stunned");
				this.player.alpha = 1.0;
				this.player.tint = 0xFFFFFF;
			}
		}
	}

	//If it's been long enough since the last spawn, spawn stars
	let d = new Date();
	if(levelNumber !== 0)
	{
		if((d.getTime() - timeSince >= (60/bpm) * 1000) && spawning){
			let currentLine = lineInfo[lineNumber];
			//parse through the current line from the level info doc, spawning a star if there's a 1
			for(let x = 0; x < currentLine.length; x++){
				if(currentLine.charAt(x) === "1"){
					//console.info("got here");
					let note = this.notes.create((x*225) - 20, -256, "" + x);
					note.moving = true;
					note.height = 256;
					note.width = 256;
					note.score = 100;
					note.inputEnabled = true;
					note.animations.add("clicked", [0,1,2], 6, false);
					this.notesOnScreen++;
					// let note = this.notes.create((x*225) + 112.5/2, -128, "quarternote");
					// note.moving = true;
					note.hasBeenTapped = false; // if it's been tapped and it falls off screen it doesn't loose you points duh.
					// note.height = 128;
					// note.width = 128;
					// note.score = 1001;
					// note.inputEnabled = true;
					note.events.onInputDown.add( (note) => { this.playNote(note, this.musicManager, 0, x, 0, 100); this.increaseScore(note); }, this);
				}
				else if(currentLine.charAt(x) === "2"){
					let obstacle = this.obstacles.create((x*225) - 5, -256, "obst" + (Math.floor(Math.random() * 2) + 1));
					obstacle.width = 256;
					obstacle.height = 256;
					obstacle.channel = x;
					obstacle.animations.add("flap", [0,1,2], 6, true);
					obstacle.animations.play("flap");
				}
			}
			timeSince = d.getTime();
			lineNumber++;
			if(lineNumber >= lineInfo.length){
				spawning = false;
			}
		}
	}
	else {
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
					// note.events.onInputDown.add( (note) => { this.playNote(this.musicManager, 0, x, 0, 100); this.increaseScore(note); }, this);
					note.collumn = x;
					note.events.onInputDown.add( () => { this.playNote(note, this.musicManager, 0, x, 0, 100); this.increaseScore(note); }, this);
				}
				else {
					let spawnProb = Math.random();
					if(spawnProb < (difficultylevel * .75)/5 && obstNum <= difficultylevel){
						let obstacle = this.obstacles.create((x*225) - 5, -256, "obst" + (Math.floor(Math.random() * 2) + 1));
						obstacle.width = 256;
						obstacle.height = 256;
						obstacle.channel = x;
						obstacle.animations.add("flap", [0,1,2], 6, true);
						obstacle.animations.play("flap");
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
			if (!this.notes.children[i].hasBeenTapped) {
				this.noteFellOffScreen(this.notes.children[i]);
			}
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
		if(this.backgroundStuff.children[i].y >= this.backgroundStuff.children[i].height)
		{
			this.backgroundStuff.children[i].y = -1 * this.backgroundStuff.children[i].height;
		}
	}

	if (!spawning && this.notesOnScreen <= 0 && levelNumber != 0 && !this.won && !this.lost) {
		// then finish the level!
		if (!this.won && !this.lost) {
			this.onLevelEnd();
		}
	}
	if (this.displayedAccuracy < 0.1) {
		// console.log("Lost game");
		this.won = false;
		this.lost = true;
		this.playing = false;
		// start loosing!
	}

	// if (this.playing) {
	// update the score display to move the display closer to the correct accuracy
	this.displayedAccuracy = (this.displayedAccuracy*2 + this.accuracy)/3;
	// then move the sprite to the correct value
	this.accuracyBar.width = (1125/4*3) * this.displayedAccuracy;
	if (Math.abs(this.displayedAccuracy - this.accuracy) > .001) {
		// then screenshake
		this.usedScoreshake = true;
		this.accuracyBar.angle = Math.random()*4-2;
		this.accuracyBar.x = 1125/8 + Math.random()*20-10;
		this.accuracyBar.y = 140 + Math.random()*20-10;
	} else if (this.usedScoreshake) {
		this.usedScoreshake = false;
		this.accuracyBar.angle = 0;
		this.accuracyBar.x = 1125/8;
		this.accuracyBar.y = 140;
	}
	// }
	let scoreDelta = this.score - this.displayScore;
	if (Math.abs(scoreDelta) <= 7 && scoreDelta != 0) {
		this.displayScore += scoreDelta/Math.abs(scoreDelta);
		this.scoreText.x = game.world.centerX + Math.random()*5 - 2.5;
		this.scoreText.y = 0.15 * game.height + Math.random()*5 - 2.5;
	}
	else if (scoreDelta != 0) {
		this.displayScore += Math.round(scoreDelta/5);
		this.scoreText.x = game.world.centerX + Math.random()*10 - 5;
		this.scoreText.y = 0.15 * game.height + Math.random()*10 - 5;
	} else {
		this.scoreText.x = game.world.centerX;
		this.scoreText.y = 0.15 * game.height;
	}

	this.scoreText.text = this.displayScore;
	this.goBackButton.bringToTop();
};

gamePlayState.prototype.showScoreUI = function() {
	// disable the score and accuracy in the background!
	this.accuracyBar.alpha = 0; // hide it

	// create the background
	let backGround = game.add.sprite(game.world.centerX, game.height*.45, 'ScoreDisplayBackground');
	backGround.anchor.setTo(0.5, 0.5)
    backGround.width = 1000;
    backGround.height = 1600;
	backGround.angle = 180;

    // create the you win! or you loose! text
    let youWinTextContent = "You Win!";
    if (this.lost) {
    	youWinTextContent = "Uh Oh...";
    	if (levelNumber === 0) {
    		// infinite
    		youWinTextContent = "Nice Job!";
    	}
    }
    let youWinTextStyle = { font: "80px Courier New", fill: "#000000", align: "center" };
    let youWinText = game.add.text(game.world.centerX, 0.15 * game.height, youWinTextContent, youWinTextStyle);
    youWinText.align = 'center';
    youWinText.anchor.setTo(0.5, 0.5);
    // then display the summary of what happened I guess...
    let summaryTextText = "You messed it up this time. Try again!";
    if (this.won || levelNumber === 0) {
	    switch(levelNumber) {
    	case 0:
    		// the infinite level
		    summaryTextText = "Another happy flight and another happy song!";
    		break;
    	case 1:
    		summaryTextText = "That one was close! But not quite Eurovision Quality. Maybe next song!";
    		break;
    	case 2:
    		summaryTextText = "It's getting faster now!";
    		break;
    	case 3:
    		summaryTextText = "What a song, but it wasn't quite there. Maybe the next song will be a hit...";
    		break;
    	case 4:
    		summaryTextText = "Now that's a tune! But the judges still don't like it...";
    		break;
    	case 5:
    		summaryTextText = "So close!";
    		break;
    	case 6:
    		summaryTextText = "I can feel myself getting better! I'm nearly there!";
    		break;
    	case 7:
    		summaryTextText = "Forget the formula, let's just make a fun song!";
    		break;
    	case 8:
    		summaryTextText = "Yes! This was it! Eurovision here we come!";
    		break;
    	}
    }
    let summaryTextStyle = { font: "65px Courier New", fill: "#000000", align: "center", wordWrap: true, wordWrapWidth:800};
    let summaryText = game.add.text(game.world.centerX, 0.3 * game.height, summaryTextText, summaryTextStyle);
    summaryText.align = 'center';
    summaryText.anchor.setTo(0.5, 0.5);

    let accuracyTextText = "Hit " + this.notesHit + " out of " + (this.notesHit+this.notesMissed) + " notes!";
	let accuracyText = game.add.text(game.world.centerX, 0.4 * game.height, accuracyTextText, summaryTextStyle);
    accuracyText.align = 'center';
    accuracyText.anchor.setTo(0.5, 0.5);

    if (this.won) {
	    let scoreText = game.add.text(game.world.centerX, 0.5 * game.height, "Score: " + this.score, summaryTextStyle);
	    scoreText.align = 'center';
	    scoreText.anchor.setTo(0.5, 0.5);
	}

	// then add the buttons that go to the next level or retry
	let retryButton = game.add.button(1125/3, .7*game.height, "retryButton", () => {game.state.start('GameState', true, false, levelNumber);}, this);
    retryButton.anchor.setTo(0.5, 0.5);
    retryButton.width = 200;
    retryButton.height = 200;
    retryButton.inputEnabled = true;

    if (levelNumber < 8 && this.won) {
	    let nextButton = game.add.button(1125/3*2, .7*game.height, "nextButton", () => {game.state.start('GameState', true, false, levelNumber + 1);}, this);
	    nextButton.anchor.setTo(0.5, 0.5);
	    nextButton.width = 200;
	    nextButton.height = 200;
	    nextButton.inputEnabled = true;
	    nextButton.angle = 180; // to flip the direction of the arrow
	} else {
		// then you've unlocked the infinite levels so display level select instead
		let nextButton = game.add.button(1125/3*2, .7*game.height, "hamburgerButton", () => {game.state.start('LevelSelectState');}, this);
	    nextButton.anchor.setTo(0.5, 0.5);
	    nextButton.width = 200;
	    nextButton.height = 200;
	    nextButton.inputEnabled = true;
	    nextButton.angle = 180; // to flip the direction of the arrow
	}


    // game.state.start('LevelSelectState');
}

gamePlayState.prototype.playNote = function(noteIn, musicManager, instrument, note, duration, score) {
	// this gets turned into an anonymous function which already has the correct note passed in etc.
	// also need to determine how close to the beat you are
	// note is x from left to right
	// duration is 0 = quarter, 1 = half, 2 = whole
	//console.info("got here 2");
	//console.info("music manager " + this.stunTimer);
	// console.log(noteSprite);
	if (this.playing && !noteIn.hasBeenTapped) {
		if(this.stunTimer === 0)//only play music while not stunned
		{
			musicManager.playNote(0, note, duration);
		}
	}
}

gamePlayState.prototype.addCheatKeys = function() {
    // keys for lock all levels and unlock next level
    let winKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    let lossKey = game.input.keyboard.addKey(Phaser.Keyboard.L);

    // Callback functions for those keys. Directly change the levelNum
    let winLevel = function() {
    	this.won = true;
    	this.lost = false;
    	this.playing = false;
    	this.onLevelEnd(); // to unlock the next level :P
    };
    let loseLevel = function() {
    	this.lost = true;
    	this.won = false;
    	this.playing = false;
    };
    // Add listener
    winKey.onUp.add(winLevel, this);
    lossKey.onUp.add(loseLevel, this);
};

gamePlayState.prototype.increaseScore = function(noteIn) {
	if (!noteIn.hasBeenTapped && this.playing) {
		if(this.stunTimer === 0)//only incrase score while not stunned
		{
			this.score += noteIn.score;
			noteIn.animations.play("clicked");
			noteIn.moving = false;
			noteIn.hasBeenTapped = true;
			let disappear = game.add.tween(noteIn);
			disappear.to({alpha: 0}, 500);
			disappear.onComplete.add(this.deleteNote);
			disappear.start();
			this.notesHit++; // accuracy increases!
			this.notesOnScreen--;
			this.updateAccuracy(true);
		}
	}
}

gamePlayState.prototype.updateAccuracy = function(hitNote) {
	// update it if you hit the note
	if (this.accuracyBuffer[this.accuracyIndex]) {
		// then remove one that you got correct
		this.accuracyCorrect--;
	} else {
		this.accuracyIncorrect--; // remove one that you missed
	}
	this.accuracyBuffer[this.accuracyIndex] = hitNote;
	if (hitNote) {
		this.accuracyCorrect++;
	} else {
		this.accuracyIncorrect++;
	}

	this.accuracy = this.accuracyCorrect / (this.accuracyBufferLength);

	this.accuracyIndex++;
	this.accuracyIndex %= this.accuracyBufferLength;
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
		this.musicManager.playRandomCymbal();
		//console.info("stunned");	
		this.player.alpha = 0.80;
		this.stunTimer = 100;
		this.score -= 150;
	}
}

gamePlayState.prototype.noteFellOffScreen = function(note) {
	// this will only be when you miss a note so it falls off screen
	if (!note.hasBeenTapped && this.playing) {
		this.notesOnScreen--;
		if (!note.hasBeenTapped) {
			// then loose points!
			this.score -= 200;
			this.notesMissed++; // you missed a note because it fell off
			this.updateAccuracy(false);
		}
		note.hasBeenTapped = true; // just call it tapped even if it hasn't been tapped
	}
}

gamePlayState.prototype.resetPlane = function(){
	this.player.loadTexture("playerN");
}

gamePlayState.prototype.deleteNote = function(note){
	note.kill();
}


gamePlayState.prototype.onLevelEnd = function() {
	if (!this.lost) {
		if (levelNumber == userLevelNum) {
			userLevelNum++; // unlock the next level
		}
		this.won = true;
		this.playing = false;
	}
}