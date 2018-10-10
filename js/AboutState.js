let AboutState = function() {
};

AboutState.prototype.preload = function() {
    this.aboutText = game.cache.getText('AboutText');
    this.aboutTextStartPosition = [0.05 * game.width, 1 * game.height];
    this.aboutTextSize = 64;
    this.aboutTextCurrentHeight = 1 * game.height;

    this.goBackButtonPosition = [0.9 * game.width, 0.05 * game.height];
    this.goBackButtonShape = [200, 200];
    this.goBackButtonSprite = 'GoBackButton';
    this.goBackButtonSpriteFrames = [0, 0, 0, 0];
};

AboutState.prototype.create = function() {
    this.aboutText = game.add.bitmapText(this.aboutTextStartPosition[0], this.aboutTextStartPosition[1],
        'DefaultFont', this.aboutText, this.aboutTextSize);
    this.aboutText.align = 'left';
    this.aboutText.anchor.setTo(0, 0);
    this.aboutText.maxWidth = 1050;

    this.addButton(this.goBackButtonPosition, this.goBackButtonShape,
        this.goBackButtonSprite, this.goBackButtonSpriteFrames, this.hitGoBackButton);
};

AboutState.prototype.hitGoBackButton = function() {
    game.state.start('MainMenuState');
};

AboutState.prototype.addButton = function(position, shape, sprite, spriteFrames, callback) {
    let newButton = game.add.button(position[0], position[1], sprite, callback, this,
        spriteFrames[0], spriteFrames[1], spriteFrames[2], spriteFrames[3]);
    newButton.anchor.setTo(0.5, 0.5);
    newButton.width = shape[0];
    newButton.height = shape[1];
};

AboutState.prototype.update = function() {
    this.aboutTextCurrentHeight -= game.height * 0.005;
    this.aboutText.y = this.aboutTextCurrentHeight;
};