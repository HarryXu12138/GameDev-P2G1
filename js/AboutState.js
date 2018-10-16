let AboutState = function() {
};

AboutState.prototype.preload = function() {
    this.UISettings();
};

AboutState.prototype.create = function() {
    this.initializeUI();
};

AboutState.prototype.update = function() {
    this.aboutTextCurrentHeight -= game.height * 0.002;
    this.aboutText.y = this.aboutTextCurrentHeight;
    if (this.aboutText.bottom < -100) game.state.start('MainMenuState');
};

AboutState.prototype.UISettings = function() {
    this.aboutText = game.cache.getText('AboutText');
    this.aboutTextStartPosition = [0.05 * game.width, 1 * game.height];
    this.aboutTextSize = 64;
    this.aboutTextCurrentHeight = 1 * game.height;

    this.goBackButtonPosition = [0.9 * game.width, 0.05 * game.height];
    this.goBackButtonShape = [200, 200];
    this.goBackButtonSprite = 'GoBackButton';
    this.goBackButtonSpriteFrames = [1, 0, 2, 2];
};

AboutState.prototype.initializeUI = function() {
    let hitGoBackButton = function() {game.state.start('MainMenuState');};
    this.aboutText = game.add.bitmapText(this.aboutTextStartPosition[0], this.aboutTextStartPosition[1],
        'DefaultFont', this.aboutText, this.aboutTextSize);
    this.aboutText.align = 'left';
    this.aboutText.anchor.setTo(0, 0);
    this.aboutText.maxWidth = 1050;

    this.addButton(this.goBackButtonPosition, this.goBackButtonShape,
        this.goBackButtonSprite, this.goBackButtonSpriteFrames, hitGoBackButton);
};

AboutState.prototype.addButton = function(position, shape, sprite, spriteFrames, callback) {
    let newButton = game.add.button(position[0], position[1], sprite, callback, this,
        spriteFrames[0], spriteFrames[1], spriteFrames[2], spriteFrames[3]);
    newButton.anchor.setTo(0.5, 0.5);
    newButton.width = shape[0];
    newButton.height = shape[1];
};