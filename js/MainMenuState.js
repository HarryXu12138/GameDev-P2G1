let MainMenuState = function() {
};

MainMenuState.prototype.preload = function() {
    game.stage.backgroundColor = 0xff0000;
    this.colors = [0x000000, 0xFFFFFF, 0xFF0000, 0x00FF00, 0x0000FF, 0x00FFFF];
    this.lastBkgroundUpdate = 0;
    this.UISettings();
};

MainMenuState.prototype.create = function() {
    this.initializeUI();
};

MainMenuState.prototype.update = function() {
    if (game.time.totalElapsedSeconds() - this.lastBkgroundUpdate > 1) {
        this.lastBkgroundUpdate = game.time.totalElapsedSeconds();
        game.stage.backgroundColor = Phaser.ArrayUtils.getRandomItem(this.colors);
    }
};

MainMenuState.prototype.shutdown = function() {
    game.stage.backgroundColor = 0xFFFFFF;
};

MainMenuState.prototype.UISettings = function() {
    this.startButtonPosition = [0.5 * game.width, 0.5 * game.height];
    this.startButtonShape = [400, 400];
    this.startButtonSprite = 'StartButton';
    this.startButtonSpriteFrames = [1, 0, 2, 2];

    this.titleTextPosition = [0.5 * game.width, 0.15 * game.height];
    this.titleText = 'Game Name\nGoes Here';
    this.titleSize = 128;

    this.aboutButtonPosition = [0.94 * game.width, 0.97 * game.height];
    this.aboutButtonShape = [100, 100];
    this.aboutButtonSprite = 'AboutButton';
    this.aboutButtonSpriteFrames = [1, 0, 2, 2];

    this.howToPlayButtonPosition = [0.5 * game.width, 0.65 * game.height];
    this.howToPlayButtonShape = [300, 300];
    this.howToPlayButtonSprite = 'HowToPlayButton';
    this.howToPlayButtonSpriteFrames = [1, 0, 2, 2];
};

MainMenuState.prototype.initializeUI = function() {
    this.addButton(this.startButtonPosition, this.startButtonShape,
        this.startButtonSprite, this.startButtonSpriteFrames, this.hitStartButton);

    this.addButton(this.aboutButtonPosition, this.aboutButtonShape,
        this.aboutButtonSprite, this.aboutButtonSpriteFrames, this.hitAboutButton);

    this.addButton(this.howToPlayButtonPosition, this.howToPlayButtonShape,
        this.howToPlayButtonSprite, this.howToPlayButtonSpriteFrames, this.hitHowToPlayButton);

    let titleText = game.add.bitmapText(this.titleTextPosition[0], this.titleTextPosition[1],
        'DefaultFont', this.titleText, this.titleSize);
    titleText.align = 'center';
    titleText.anchor.setTo(0.5, 0.5);
};

MainMenuState.prototype.hitHowToPlayButton = function() {
    game.state.start('HowToState');
};

MainMenuState.prototype.hitAboutButton = function() {
    game.state.start('AboutState');
};

MainMenuState.prototype.hitStartButton = function() {
    game.state.start('LevelSelectState');
};

MainMenuState.prototype.addButton = function(position, shape, sprite, spriteFrames, callback) {
    let newButton = game.add.button(position[0], position[1], sprite, callback, this,
        spriteFrames[0], spriteFrames[1], spriteFrames[2], spriteFrames[3]);
    newButton.anchor.setTo(0.5, 0.5);
    newButton.width = shape[0];
    newButton.height = shape[1];
};