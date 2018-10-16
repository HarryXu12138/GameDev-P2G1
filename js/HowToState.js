let HowToState = function() {
};

HowToState.prototype.preload = function() {
    this.goBackButtonPosition = [0.1 * game.width, 0.05 * game.height];
    this.goBackButtonShape = [200, 200];
    this.goBackButtonSprite = 'GoBackButton';
    this.goBackButtonSpriteFrames = [1, 0, 2, 2];
};

HowToState.prototype.create = function() {
    let callback = function() {game.state.start('MainMenuState');};

    let goBackButton = game.add.button(this.goBackButtonPosition[0], this.goBackButtonPosition[1], this.goBackButtonSprite, callback, this,
        this.goBackButtonSpriteFrames[0], this.goBackButtonSpriteFrames[1], this.goBackButtonSpriteFrames[2], this.goBackButtonSpriteFrames[3]);
    goBackButton.anchor.setTo(0.5, 0.5);
    goBackButton.width = this.goBackButtonShape[0];
    goBackButton.height = this.goBackButtonShape[1];
};