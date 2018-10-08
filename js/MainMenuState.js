let MainMenuState = function() {
};

MainMenuState.prototype.preload = function() {
    this.UISettings();
};

MainMenuState.prototype.create = function() {
    this.initializeUI();
};

MainMenuState.prototype.UISettings = function() {
    this.startButtonPosition = [0.5 * game.width, 0.85 * game.height]
    this.titleTextPosition = [0.5 * game.width, 0.15 * game.height]
    this.titleText = 'Game Name';
    this.titleTextConfig = {
        font: '100px Arial',
        align: 'center',
        fontSize: 100,
        fill: 'white'
    };
};

MainMenuState.prototype.initializeUI = function() {
    this.startButton = game.add.button(this.startButtonPosition[0], this.startButtonPosition[1],
        'StartBotton', this.hitStartBotton, this);
    this.startButton.width = 200;
    this.startButton.height = this.startButton.width;
    this.startButton.anchor.setTo(0.5, 0.5);

    this.titleText = game.add.text(this.titleTextPosition[0], this.titleTextPosition[1],
        this.titleText, this.titleTextConfig);
    this.titleText.anchor.setTo(0.5, 0.5);
};

MainMenuState.prototype.hitStartBotton = function() {
    game.state.start('LevelSelectState');
};