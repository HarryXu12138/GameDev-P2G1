let PreloadState = function() {
};

PreloadState.prototype.preload = function() {
    game.load.image('StartBotton', 'assets/buttons/StartButtonNormal.jpg');
    game.load.image('StartButtonOver', 'assets/buttons/StartButtonOver.jpg');
    game.load.image('Level1', 'assets/Level1.png');
    game.load.image("quarternote", "assets/notecloudQuarter.png");

    //load level files
    game.load.text("1", "assets/levels/testSpawning.txt");
};

PreloadState.prototype.create = function() {
    game.state.start("MainMenuState");
};