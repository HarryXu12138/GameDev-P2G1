let HowToState = function() {
};

HowToState.prototype.preload = function() {
    // Settings for two UI parts
    this.goBackButtonPosition = [0.1 * game.width, 0.05 * game.height];
    this.goBackButtonShape = [200, 200];
    this.goBackButtonSprite = 'GoBackButton';
    this.goBackButtonSpriteFrames = [1, 0, 2, 2];

    this.helpTextContent = game.cache.getText('HowToText');
    this.helpTextStartPosition = [0.05 * game.width, 1 * game.height];
    this.helpTextSize = 64;
    this.helpTextCurrentHeight = 1 * game.height;
};

HowToState.prototype.create = function() {
    // Call back function for go back button
    let callback = function() {game.state.start('MainMenuState');};

    // Add go back button to the state
    let goBackButton = game.add.button(this.goBackButtonPosition[0], this.goBackButtonPosition[1], this.goBackButtonSprite, callback, this,
        this.goBackButtonSpriteFrames[0], this.goBackButtonSpriteFrames[1], this.goBackButtonSpriteFrames[2], this.goBackButtonSpriteFrames[3]);
    goBackButton.anchor.setTo(0.5, 0.5);
    goBackButton.width = this.goBackButtonShape[0];
    goBackButton.height = this.goBackButtonShape[1];

    // Initialize the help text
    this.helpText = game.add.bitmapText(this.helpTextStartPosition[0], this.helpTextStartPosition[1],
        'DefaultFont', this.helpTextContent, this.helpTextSize);
    this.helpText.align = 'left';
    this.helpText.anchor.setTo(0, 0);
    this.helpText.maxWidth = 1050;
};

HowToState.prototype.update = function() {
    // When starting the state scroll up the help text and stop in a point
    if (this.helpText.top > game.height * 0.15) {
        this.helpTextCurrentHeight -= game.height * 0.002;
        this.helpText.y = this.helpTextCurrentHeight;
    }
};