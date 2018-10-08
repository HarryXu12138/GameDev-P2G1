let MainMenuState = function() {
};

MainMenuState.prototype.preload = function() {
    this.startButtonPosition = [0.4 * game.width, 0.8 * game.height]
};

MainMenuState.prototype.create = function() {
    this.startButton = game.add.button(this.startButtonPosition[0], this.startButtonPosition[1],
        'StartBotton', hitStartBotton, this);
    this.startButton.width = 200;
    this.startButton.height = this.startButton.width;
    let textConfig = {
        font: '100px Arial',
        align: 'center',
        fontSize: 100,
        fill: 'white',
    };
    this.titleText = game.add.text(200, 200, 'Game Name', textConfig);

};

function hitStartBotton() {
    alert('Hello world!');
    game.state.start("LevelState");
}