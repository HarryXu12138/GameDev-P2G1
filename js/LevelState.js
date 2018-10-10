let LevelState = function() {
};

LevelState.prototype.preload = function() {
    this.startButtonPosition = [0.4 * game.width, 0.8 * game.height]
    this.manager = new NoteManager();
    this.manager.update(0);
    this.i = 0;
}

LevelState.prototype.create = function() {
    this.startButton = game.add.button(this.startButtonPosition[0], this.startButtonPosition[1],
        'StartButtonOver', hitStartButton, this);
    this.startButton.height = this.startButton.width = 200;
    // this.startButton.height = this.startButton.width;
    let textConfig = {
        font: '100px Arial',
        align: 'center',
        fontSize: 100,
        fill: 'white',
    };
    this.titleText = game.add.text(200, 200, 'Level State', textConfig);
};

LevelState.prototype.update = function(timestamp, elapsed) {
    // console.log(game.time.elapsed/1000);
    this.manager.update(game.time.elapsed/1000);
    this.i++;
};


// function createSprite() {

// }

function hitStartButton() {
    // alert('Hello world! '+ this.i +" : " + this.manager.time);
    // game.state.start("MainMenuState");
    this.manager.testAddRandomNote();
}