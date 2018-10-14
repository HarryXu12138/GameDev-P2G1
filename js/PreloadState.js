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
    // game.load.image('Level1', 'assets/Level1.png');
    game.load.image("quarternote", "assets/notecloudQuarter.png");
    game.load.image("line", "assets/lineprototype2.png");

    // load audio:
    this.loadNotes();

    //load level files
    game.load.text("1", "assets/levels/testSpawning.txt");
};

PreloadState.prototype.create = function() {
    game.state.start('MainMenuState');
};


PreloadState.prototype.loadNotes = function() {
	game.load.audio('p_c5_quarter', 'assets/audio/notes/piano_c5_quarter.mp3');
	game.load.audio('p_d5_quarter', 'assets/audio/notes/piano_d5_quarter.mp3');
	game.load.audio('p_e5_quarter', 'assets/audio/notes/piano_e5_quarter.mp3');
	game.load.audio('p_g5_quarter', 'assets/audio/notes/piano_g5_quarter.mp3');
	game.load.audio('p_a5_quarter', 'assets/audio/notes/piano_a5_quarter.mp3');
}