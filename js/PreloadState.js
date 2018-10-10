let PreloadState = function() {
};

PreloadState.prototype.preload = function() {
    game.load.spritesheet('StartButton', 'assets/buttons/StartButtonSpriteSheet.png', 1289, 1310);
    game.load.bitmapFont('DefaultFont', 'assets/fonts/shortStack.png', 'assets/fonts/shortStack.xml');
    game.load.text('AboutText', 'assets/about.txt');
    game.load.image('Level1Button', 'assets/buttons/Level1Button.png');
    game.load.image('GoBackButton', 'assets/buttons/GoBackButton.png');
};

PreloadState.prototype.create = function() {
    game.state.start('MainMenuState');
};