let MainMenuState = function() {
};

MainMenuState.prototype.preload = function() {
    this.UISettings();
};

MainMenuState.prototype.create = function() {
    this.initializeUI();
};

MainMenuState.prototype.UISettings = function() {
    this.startButtonPosition = [0.5 * game.width, 0.85 * game.height];
    this.startButtonShape = [300, 300];
    this.startButtonSprite = 'StartButton';
    this.startButtonSpriteFrames = [1, 0, 1, 0];

    this.titleTextPosition = [0.5 * game.width, 0.15 * game.height];
    this.titleText = 'Game Name';
    this.titleTextConfig = {
        font: '100px Arial',
        align: 'center',
        fontSize: 100,
        fill: 'white'
    };

    this.aboutButtonPosition = [0.5 * game.width, 0.95 * game.height];
    this.aboutButtonShape = [100, 100];
    this.aboutButtonSprite = 'StartButton';
    this.aboutButtonSpriteFrames = [1, 0, 1, 0];
};

MainMenuState.prototype.initializeUI = function() {
    this.addButton(this.startButtonPosition, this.startButtonShape,
        this.startButtonSprite, this.startButtonSpriteFrames, this.hitStartButton);

    this.addButton(this.aboutButtonPosition, this.aboutButtonShape,
        this.aboutButtonSprite, this.aboutButtonSpriteFrames, this.hitAboutButton);

    this.titleText = game.add.text(this.titleTextPosition[0], this.titleTextPosition[1],
        this.titleText, this.titleTextConfig);
    this.titleText.anchor.setTo(0.5, 0.5);
};

MainMenuState.prototype.addButton = function(position, shape, sprite, spriteFrames, callback) {
    let newButton = game.add.button(position[0], position[1], sprite, callback, this,
        spriteFrames[0], spriteFrames[1], spriteFrames[2], spriteFrames[3]);
    newButton.anchor.setTo(0.5, 0.5);
    newButton.width = shape[0];
    newButton.height = shape[1];
};

MainMenuState.prototype.hitAboutButton = function() {
    game.state.start('AboutState');
};

MainMenuState.prototype.hitStartButton = function() {
    game.state.start('LevelSelectState');
};