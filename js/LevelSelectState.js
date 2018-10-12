let LevelSelectState = function() {
};

LevelSelectState.prototype.preload = function() {
    this.UISettings();
};

LevelSelectState.prototype.create = function() {
    this.initializeUI();
};

LevelSelectState.prototype.UISettings = function() {
    this.level1ButtonPosition = [0.1 * game.width, 0.1 * game.height];
    this.level1ButtonShape = [200, 200];
    this.level1ButtonSprite = 'Level1Button';
    this.level1ButtonSpriteFrames = [0, 0, 0, 0];

    this.goBackButtonPosition = [0.9 * game.width, 0.05 * game.height];
    this.goBackButtonShape = [200, 200];
    this.goBackButtonSprite = 'GoBackButton';
    this.goBackButtonSpriteFrames = [1, 0, 2, 2];
};

LevelSelectState.prototype.initializeUI = function() {
    this.addButton(this.level1ButtonPosition, this.level1ButtonShape,
        this.level1ButtonSprite, this.level1ButtonSpriteFrames, this.hitLevel1Button);
    this.addButton(this.goBackButtonPosition, this.goBackButtonShape,
        this.goBackButtonSprite, this.goBackButtonSpriteFrames, this.hitGoBackButton);
};

LevelSelectState.prototype.hitGoBackButton = function() {
    game.state.start('MainMenuState');
};

LevelSelectState.prototype.hitLevel1Button = function() {
	game.state.start('GameState', true, false, 1);
};

LevelSelectState.prototype.addButton = function(position, shape, sprite, spriteFrames, callback) {
    let newButton = game.add.button(position[0], position[1], sprite, callback, this,
        spriteFrames[0], spriteFrames[1], spriteFrames[2], spriteFrames[3]);
    newButton.anchor.setTo(0.5, 0.5);
    newButton.width = shape[0];
    newButton.height = shape[1];
};