let MainMenuState = function() {
};

MainMenuState.prototype.preload = function() {
    // Change the background randomly
    game.stage.backgroundColor = 0xff0000;
    this.colors = [0x000000, 0xFFFFFF, 0xFF0000, 0x00FF00, 0x0000FF, 0x00FFFF];
    // Avoid multiple changing in one second
    this.lastBkgroundUpdate = 0;
    // Overall UI settings for this state
    this.UISettings();
};

MainMenuState.prototype.create = function() {
    // add background art that scrolls
    this.backgroundStuff = game.add.group();
    let background1 = this.backgroundStuff.create(0,0, "bg1");
    let background2 = this.backgroundStuff.create(0, -1 * background1.height, "bg1");

    this.plane = game.add.sprite(562.5 - 175, menuPlaneY, "playerN");
    this.plane.width = 350;
    this.plane.height = 350;
    // this.plane.enableBody = true;

    // Initiate UI stuff with UI settings
    this.initializeUI();
};

MainMenuState.prototype.update = function() {
    // change the background color for every second
    // if (game.time.totalElapsedSeconds() - this.lastBkgroundUpdate > 1) {
    //     this.lastBkgroundUpdate = game.time.totalElapsedSeconds();
    //     game.stage.backgroundColor = Phaser.ArrayUtils.getRandomItem(this.colors);
    // }

    // scroll the background
    for(let i = 0; i < this.backgroundStuff.children.length; i++)
    {
        this.backgroundStuff.children[i].y = this.backgroundStuff.children[i].y + 8;
        if(this.backgroundStuff.children[i].y >= this.backgroundStuff.children[i].height)
        {
            this.backgroundStuff.children[i].y = -1 * this.backgroundStuff.children[i].height;
        }
    }

    // move the plane to where it should be
    if (menuPlaneY > 2036) {
        // move it towards the location
        let delta = (2036 - menuPlaneY)/50;
        menuPlaneY = menuPlaneY + Math.max(delta, -20);
    }
    this.plane.y = menuPlaneY;
};

MainMenuState.prototype.shutdown = function() {
    // Set the background color back
    game.stage.backgroundColor = 0xFFFFFF;
};

MainMenuState.prototype.UISettings = function() {
    // Settings for start button
    this.startButtonPosition = [0.5 * game.width, 0.5 * game.height];
    this.startButtonShape = [400, 400];
    this.startButtonSprite = 'StartButton';
    // The frame is in the same order when call add function
    this.startButtonSpriteFrames = [1, 0, 2, 2];

    // Settings for title text
    this.titleTextPosition = [0.5 * game.width, 0.15 * game.height];
    this.titleText = 'Airline Beats';
    this.titleSize = 128;

    // Settings for about button
    this.aboutButtonPosition = [0.94 * game.width, 0.97 * game.height];
    this.aboutButtonShape = [100, 100];
    this.aboutButtonSprite = 'AboutButton';
    this.aboutButtonSpriteFrames = [1, 0, 2, 2];

    // Settings for how-to-play button
    this.howToPlayButtonPosition = [0.5 * game.width, 0.65 * game.height];
    this.howToPlayButtonShape = [300, 300];
    this.howToPlayButtonSprite = 'HowToPlayButton';
    this.howToPlayButtonSpriteFrames = [1, 0, 2, 2];
};

MainMenuState.prototype.initializeUI = function() {
    // Call back functions for buttons
    let hitHowToPlayButton = function() {game.state.start('HowToState');};
    let hitAboutButton = function() {game.state.start('AboutState');};
    let hitStartButton = function() {game.state.start('LevelSelectState');};

    // Add the buttons
    this.addButton(this.startButtonPosition, this.startButtonShape,
        this.startButtonSprite, this.startButtonSpriteFrames, hitStartButton);

    this.addButton(this.aboutButtonPosition, this.aboutButtonShape,
        this.aboutButtonSprite, this.aboutButtonSpriteFrames, hitAboutButton);

    this.addButton(this.howToPlayButtonPosition, this.howToPlayButtonShape,
        this.howToPlayButtonSprite, this.howToPlayButtonSpriteFrames, hitHowToPlayButton);

    // Add title text
    // let titleText = game.add.bitmapText(this.titleTextPosition[0], this.titleTextPosition[1],
    //     'DefaultFont', this.titleText, this.titleSize);
    let titleText = game.add.text(this.titleTextPosition[0], this.titleTextPosition[1],
        this.titleText, { font: "200px Courier New", fill: "#FFFFFF", align: "center", wordWrap: true, wordWrapWidth:800});
    titleText.align = 'center';
    titleText.anchor.setTo(0.5, 0.5);
};

// This function add button to the state and give the buttons some general settings
MainMenuState.prototype.addButton = function(position, shape, sprite, spriteFrames, callback) {
    let newButton = game.add.button(position[0], position[1], sprite, callback, this,
        spriteFrames[0], spriteFrames[1], spriteFrames[2], spriteFrames[3]);
    newButton.anchor.setTo(0.5, 0.5);
    newButton.width = shape[0];
    newButton.height = shape[1];
};