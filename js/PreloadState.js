let PreloadState = function() {
};

PreloadState.prototype.preload = function() {
    game.load.spritesheet('StartButton', 'assets/buttons/StartButtonSpriteSheet.png', 205, 202);
    game.load.spritesheet('AboutButton', 'assets/buttons/AboutButton.png', 206, 209);
    game.load.spritesheet('GoBackButton', 'assets/buttons/GoBackButton.png', 206, 212);
    game.load.spritesheet('HowToPlayButton', 'assets/buttons/HowToPlayButton.png', 205, 209);
    game.load.spritesheet('GeneralButton', 'assets/buttons/GeneralButton.png', 212, 214)
    game.load.bitmapFont('DefaultFont', 'assets/fonts/shortStack.png', 'assets/fonts/shortStack.xml');
    game.load.text('AboutText', 'assets/about.txt');
};

PreloadState.prototype.create = function() {
    game.state.start('MainMenuState');
};