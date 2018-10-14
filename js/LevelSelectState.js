let LevelSelectState = function() {
};

LevelSelectState.prototype.preload = function() {
    this.UISettings();
};

LevelSelectState.prototype.create = function() {
    this.initializeUI();
};

LevelSelectState.prototype.UISettings = function() {
    game.stage.backgroundColor = 0xff0000;
    this.levelButtonsSettings = [];
    let minXY = [0.1, 0.2];
    let maxX = 0.9;
    let buttonSpace = [0.2, 0.2];

    let previousPosition = [minXY[0] - buttonSpace[0], minXY[1]];
    for (let i = 1; i < 8; ++i) {
        let nextPosition = [previousPosition[0] + buttonSpace[0], previousPosition[1]];
        if (nextPosition[0] >= maxX) {
            nextPosition[0] = minXY[0];
            nextPosition[1] = nextPosition[1] + buttonSpace[1];
        }
        previousPosition = nextPosition;
        nextPosition = [nextPosition[0] * game.width, nextPosition[1] * game.height];
        let setting = {
            position:nextPosition,
            shape:[200, 200],
            text:i.toString(),
            style:{
                font:'bold 80pt Arial',
                fill:'white'
            }
        };
        this.levelButtonsSettings.push(setting);
    }

    this.goBackButtonPosition = [0.9 * game.width, 0.05 * game.height];
    this.goBackButtonShape = [200, 200];
    this.goBackButtonSprite = 'GoBackButton';
    this.goBackButtonSpriteFrames = [1, 0, 2, 2];
};

LevelSelectState.prototype.initializeUI = function() {
    for (let i = 0; i < this.levelButtonsSettings.length; ++i) {
        let setting = this.levelButtonsSettings[i];
        this.addGeneralButtonWithText(setting.position, setting.shape, setting.text, setting.style, this.hitLevelButton);
    }
    this.addButton(this.goBackButtonPosition, this.goBackButtonShape,
        this.goBackButtonSprite, this.goBackButtonSpriteFrames, this.hitGoBackButton);
};

LevelSelectState.prototype.hitGoBackButton = function() {
    game.state.start('MainMenuState');
};

LevelSelectState.prototype.hitLevelButton = function() {
	game.state.start('GameState', true, false, 1);
};

LevelSelectState.prototype.addGeneralButtonWithText = function(position, shape, text, style, callback) {
    this.addButton(position, shape, 'GeneralButton', [1, 0, 2, 2], callback);
    let buttonText = game.add.text(position[0], position[1], text, style);
    buttonText.anchor.setTo(0.5, 0.5);
    buttonText.align = 'center';
};

LevelSelectState.prototype.addButton = function(position, shape, sprite, spriteFrames, callback) {
    let newButton = game.add.button(position[0], position[1], sprite, callback, this,
        spriteFrames[0], spriteFrames[1], spriteFrames[2], spriteFrames[3]);
    newButton.anchor.setTo(0.5, 0.5);
    newButton.width = shape[0];
    newButton.height = shape[1];
};