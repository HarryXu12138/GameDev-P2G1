let HowToState = function() {
};

HowToState.prototype.preload = function() {
    // add background art that scrolls
    this.backgroundStuff = game.add.group();
    let background1 = this.backgroundStuff.create(0,0, "bg4");
    let background2 = this.backgroundStuff.create(0, -1 * background1.height, "bg4");

    this.plane = game.add.sprite(562.5 - 175, menuPlaneY, "playerN");
    this.plane.width = 350;
    this.plane.height = 350;
    // this.plane.enableBody = true;



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
    // this.helpText = game.add.text(this.helpTextStartPosition[0], this.helpTextStartPosition[1],
    //     this.helpTextContent, { font: "64px Courier New", fill: "#FFFFFF", align: "center", wordWrap: true, wordWrapWidth:800});
    
    this.helpText.align = 'left';
    this.helpText.anchor.setTo(0, 0);
    this.helpText.maxWidth = 1050;
};

HowToState.prototype.update = function() {
    // When starting the state scroll up the help text and stop in a point
    if (this.helpText.top > game.height * 0.11) {
        this.helpTextCurrentHeight -= game.height * 0.002;
        this.helpText.y = this.helpTextCurrentHeight;
    }

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