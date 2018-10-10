let PreloadState = function() {
};

PreloadState.prototype.preload = function() {
    game.load.spritesheet('StartButton', 'assets/buttons/StartButtonSpriteSheet.png', 1289, 1310);
    game.load.image('Level1', 'assets/Level1.png');
};

PreloadState.prototype.create = function() {
    game.state.start('MainMenuState');
};