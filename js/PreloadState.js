let PreloadState = function() {
};

PreloadState.prototype.preload = function() {
    game.load.image('StartBotton', 'assets/buttons/StartButtonNormal.jpg');
    game.load.image('StartButtonOver', 'assets/buttons/StartButtonOver.jpg');
    game.load.image('Level1', 'assets/Level1.png');
    game.load.image("quarternote", "assets/notecloudQuarter.png");
    game.load.image("line", "assets/lineprototype2.png");

    // load audio:
    this.loadNotes();

    //load level files
    game.load.text("1", "assets/levels/testSpawning.txt");
};

PreloadState.prototype.create = function() {
    game.state.start("MainMenuState");
};


PreloadState.prototype.loadNotes = function() {
	game.load.audio('p_c5_quarter', 'assets/audio/notes/piano_c5_quarter.mp3');
	game.load.audio('p_d5_quarter', 'assets/audio/notes/piano_d5_quarter.mp3');
	game.load.audio('p_e5_quarter', 'assets/audio/notes/piano_e5_quarter.mp3');
	game.load.audio('p_g5_quarter', 'assets/audio/notes/piano_g5_quarter.mp3');
	game.load.audio('p_a5_quarter', 'assets/audio/notes/piano_a5_quarter.mp3');
}