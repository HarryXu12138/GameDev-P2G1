let MainMenuState = function() {
};

MainMenuState.prototype.preload = function() {
    game.stage.backgroundColor = 0xff0000;
    this.colors = [0x000000, 0xFFFFFF, 0xFF0000, 0x00FF00, 0x0000FF, 0x00FFFF];
    this.UISettings();
};

MainMenuState.prototype.create = function() {
    this.initializeUI();
};

MainMenuState.prototype.update = function() {
    if (game.time.totalElapsedSeconds() % 1 < 0.1) {
        game.stage.backgroundColor = Phaser.ArrayUtils.getRandomItem(this.colors);
    }
};

MainMenuState.prototype.UISettings = function() {
    this.startButtonPosition = [0.5 * game.width, 0.85 * game.height];
    this.startButtonShape = [300, 300];
    this.startButtonSprite = 'StartButton';
    this.startButtonSpriteFrames = [1, 0, 1, 0];

    this.titleTextPosition = [0.5 * game.width, 0.15 * game.height];
    this.titleText = 'Game Name\nGoes Here';
    this.titleSize = 128;

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

    let titleText = game.add.bitmapText(this.titleTextPosition[0], this.titleTextPosition[1],
        'DefaultFont', this.titleText, this.titleSize);
    titleText.align = 'center';
    titleText.anchor.setTo(0.5, 0.5);
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