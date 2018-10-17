let userLevelNum = 1;
let menuScrollingBackgroundY = 0;
let menuPlaneY = 2500; // start offscreen

let PreloadState = function() {
};

PreloadState.prototype.preload = function() {
    // Buttons
    game.load.spritesheet('StartButton', 'assets/buttons/StartButtonSpriteSheet v2.png', 512, 512);
    game.load.spritesheet('AboutButton', 'assets/buttons/AboutButton.png', 206, 209);
    game.load.spritesheet('GoBackButton', 'assets/buttons/GoBackButton.png', 206, 212);
    game.load.spritesheet('HowToPlayButton', 'assets/buttons/HowToPlayButton.png', 205, 209);
    game.load.spritesheet('GeneralButton', 'assets/buttons/GeneralButton.png', 211, 214);
    // End buttons

    // Sprite fonts
    game.load.bitmapFont('DefaultFont', 'assets/fonts/shortStack.png', 'assets/fonts/shortStack.xml');
    // End sprite fonts

    // Level Select State
    game.load.image('LevelSelectBkground', 'assets/levelSelector/LevelSelectBkground v2.png')
    game.load.image('LevelSelectText', 'assets/levelSelector/LevelSelectText.png')
    // End Level Select State

    // Main Game assets
    // game.load.image('Level1', 'assets/Level1.png');
    game.load.text('AboutText', 'assets/about.txt');
    //game.load.image('StartBotton', 'assets/buttons/StartButtonNormal.jpg');
    //game.load.image('StartButtonOver', 'assets/buttons/StartButtonOver.jpg');
    game.load.image('Level1', 'assets/cloudprototype.png');
    //game.load.image("quarternote", "assets/notecloudQuarter.png");
    //note images
    game.load.spritesheet("0", "assets/sprites/CloudC1.1.png", 512, 512);
    game.load.spritesheet("1", "assets/sprites/CloudD1.1.png", 512, 512);
    game.load.spritesheet("2", "assets/sprites/CloudE1.1.png", 512, 512);
    game.load.spritesheet("3", "assets/sprites/CloudG1.1.png", 512, 512);
    game.load.spritesheet("4", "assets/sprites/CloudA1.1.png", 512, 512);

    game.load.spritesheet("obst1", "assets/sprites/seagullFlipped.png", 512, 512);
    game.load.image("obst2", "assets/sprites/lightning_cloud.png");

    game.load.image("line", "assets/lineprototype2.png");
    game.load.image("player", "assets/player1.png");
    //game.load.spritesheet("playerSS", "assets/sprites/PlayerM.png", 512, 512, 3);
    game.load.image("playerN", "assets/sprites/PlayerMN.png");
    game.load.image("playerL", "assets/sprites/PlayerML.png");
    game.load.image("playerR", "assets/sprites/PlayerMR.png");

    game.load.image('ScoreDisplayBackground', 'assets/UI/ScoreWindow.png');
    game.load.image('accuracyBar', 'assets/UI/UI2.png');
    game.load.image("retryButton", "assets/UI/UI3.png");
    game.load.image("nextButton", "assets/UI/UI4.png");
    game.load.image("hamburgerButton", "assets/UI/UI5.png");



    // load audio:
    this.loadNotes();

    //load level files
    game.load.text("1", "assets/levels/level1.txt");
    game.load.text("2", "assets/levels/level2.txt");
    game.load.text("3", "assets/levels/level3.txt");
    game.load.text("4", "assets/levels/level4.txt");
    game.load.text("5", "assets/levels/level5.txt");
    game.load.text("6", "assets/levels/level6.txt");
    game.load.text("7", "assets/levels/level7.txt");
    game.load.text("8", "assets/levels/level8.txt");


    //load backgrounds
    //game.load.image("cloudBG", "assets/sprites/Backgrounds/bg_cloud.png");
    game.load.image("bg4", "assets/sprites/Backgrounds/bg_1.1.png");
    //game.load.image("bg1.2", "assets/sprites/Backgrounds/bg_1.2.png");
    game.load.image("bg2", "assets/sprites/Backgrounds/bg_2.1clouded.png");
    game.load.image("bg3", "assets/sprites/Backgrounds/bg_3.1.png");
    game.load.image("bg1", "assets/sprites/Backgrounds/bg_4.png");
    game.load.image("bg5", "assets/sprites/Backgrounds/bg_3.1.png");
    game.load.image("bg6", "assets/sprites/Backgrounds/bg_1.1.png");
    game.load.image("bg7", "assets/sprites/Backgrounds/bg_2.1clouded.png");
    game.load.image("bg8", "assets/sprites/Backgrounds/bg_4.png");

    game.load.image("bg0", "assets/sprites/Backgrounds/bg_4.png");

    // End Main Game assets

    game.load.text('HowToText', 'assets/HowTo.txt')
    game.load.text('AboutText', 'assets/about.txt');
};

PreloadState.prototype.create = function() {
    game.state.start('MainMenuState');
};

PreloadState.prototype.loadNotes = function() {
	game.load.audio('p_c5_quarter', 'assets/audio/notes/piano_c5_quarter.mp3');
	game.load.audio('p_d5_quarter', 'assets/audio/notes/piano_d5_quarter.mp3');
	game.load.audio('p_e5_quarter', 'assets/audio/notes/piano_e5_quarter.mp3');
	game.load.audio('p_g5_quarter', 'assets/audio/notes/piano_g5_quarter.mp3');
	game.load.audio('p_a6_quarter', 'assets/audio/notes/piano_a6_quarter.mp3');

    game.load.audio('cymbalCrash1', 'assets/audio/cymbals/34818__zin__crash-1-hit-2-cut.wav');
    game.load.audio('cymbalCrash2', 'assets/audio/cymbals/34819__zin__crash-2-hit-1.wav');
    game.load.audio('snare', 'assets/audio/drums/232014__seidhepriest__ambassador-6.wav');
    game.load.audio('kick', 'assets/audio/drums/183097__dwsd__bd-doitlive.wav');

}