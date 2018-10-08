let PreloadState = function() {
};

PreloadState.prototype.preload = function() {
    game.load.image('StartBotton', 'assets/buttons/StartButtonNormal.jpg');
    game.load.image('StartButtonOver', 'assets/buttons/StartButtonOver.jpg')
    game.load.image('MusicNoteTest', 'assets/sprites/musicnotetest.png')
};

PreloadState.prototype.create = function() {
    game.state.start("MainMenuState");
};