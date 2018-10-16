let LevelSelectState = function() {
};

LevelSelectState.prototype.preload = function() {
    this.UISettings();
};

LevelSelectState.prototype.create = function() {
    this.initializeUI();
};

LevelSelectState.prototype.UISettings = function() {
    this.levelSelectBackGroundPosition = [0.5 * game.width, 0.45 * game.height];
    this.levelSelectBackGroundShape = [1000, 1600];
    this.levelSelectBackGroundTextOffset = -630;

    this.levelButtonsSettings = [];
    let minXY = [0.27, 0.36];
    let maxX = 0.8;
    let buttonSpace = [0.22, 0.1];
    let buttonShape = [200, 200];

    let previousPosition = [minXY[0] - buttonSpace[0], minXY[1]];
    for (let i = 1; i < 9; ++i) {
        let nextPosition = [previousPosition[0] + buttonSpace[0], previousPosition[1]];
        if (nextPosition[0] >= maxX) {
            nextPosition[0] = minXY[0];
            nextPosition[1] = nextPosition[1] + buttonSpace[1];
        }
        previousPosition = nextPosition;
        nextPosition = [nextPosition[0] * game.width, nextPosition[1] * game.height];
        let buttonFrames = [1, 0, 2, 2];
        let buttonText = i.toString();
        let buttonEnabled = true;
        if (i > userLevelNum) {
            buttonFrames = [4, 4, 4, 4];
            buttonText = '';
            buttonEnabled = false;
        }
        let setting = {
            position:nextPosition,
            shape:buttonShape.slice(),
            text:buttonText,
            style:{
                font:'bold 80pt Arial',
                fill:'white'
            },
            frames:buttonFrames,
            enabled:buttonEnabled
        };
        this.levelButtonsSettings.push(setting);
    }
    let infinitLevelButton = this.levelButtonsSettings[this.levelButtonsSettings.length - 1];
    infinitLevelButton.position[0] += buttonSpace[0] * game.width / 2;
    infinitLevelButton.shape[0] = buttonShape[0] + buttonSpace[0] * game.width;
    if (userLevelNum > 7)
        infinitLevelButton.text = '∞';
    infinitLevelButton.style = {
        font:'bold 150pt Arial',
        fill:'white'
    };

    this.goBackButtonPosition = [0.9 * game.width, 0.05 * game.height];
    this.goBackButtonShape = [200, 200];
    this.goBackButtonSprite = 'GoBackButton';
    this.goBackButtonSpriteFrames = [1, 0, 2, 2];
};

LevelSelectState.prototype.initializeUI = function() {
    let backGround = game.add.sprite(this.levelSelectBackGroundPosition[0], this.levelSelectBackGroundPosition[1],
        'LevelSelectBkground')
    let bkgroundText = game.add.sprite(this.levelSelectBackGroundPosition[0],
        this.levelSelectBackGroundPosition[1] + this.levelSelectBackGroundTextOffset, 'LevelSelectText')
    bkgroundText.anchor.setTo(0.5, 0.5)
    backGround.anchor.setTo(0.5, 0.5)
    backGround.width = this.levelSelectBackGroundShape[0];
    backGround.height = this.levelSelectBackGroundShape[1];

    for (let i = 0; i < this.levelButtonsSettings.length; ++i) {
        let setting = this.levelButtonsSettings[i];
        let callback = function() {this.hitLevelButton(i + 1)};
        if (i == this.levelButtonsSettings.length - 1)
            callback = function() {this.hitLevelButton(0)};
        this.addGeneralButtonWithText(setting.position, setting.shape, setting.text, setting.style, setting.frames, setting.enabled,callback);
    }
    this.addButton(this.goBackButtonPosition, this.goBackButtonShape,
        this.goBackButtonSprite, this.goBackButtonSpriteFrames, true, this.hitGoBackButton);
};

LevelSelectState.prototype.hitGoBackButton = function() {
    game.state.start('MainMenuState');
};

LevelSelectState.prototype.hitLevelButton = function(levelNumber) {
	game.state.start('GameState', true, false, levelNumber);
};

LevelSelectState.prototype.addGeneralButtonWithText = function(position, shape, text, style, frames, buttonEnabled, callback) {
    this.addButton(position, shape, 'GeneralButton', frames, buttonEnabled, callback);
    let buttonText = game.add.text(position[0], position[1], text, style);
    buttonText.anchor.setTo(0.5, 0.5);
    buttonText.align = 'center';
};

LevelSelectState.prototype.addButton = function(position, shape, sprite, spriteFrames, buttonEnabled,callback) {
    let newButton = game.add.button(position[0], position[1], sprite, callback, this,
        spriteFrames[0], spriteFrames[1], spriteFrames[2], spriteFrames[3]);
    newButton.anchor.setTo(0.5, 0.5);
    newButton.width = shape[0];
    newButton.height = shape[1];
    newButton.inputEnabled = buttonEnabled;
};