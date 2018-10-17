let AboutState = function() {
};

AboutState.prototype.preload = function() {
    this.UISettings();
};

AboutState.prototype.create = function() {
    // add background art that scrolls
    this.backgroundStuff = game.add.group();
    let background1 = this.backgroundStuff.create(0,0, "bg4");
    let background2 = this.backgroundStuff.create(0, -1 * background1.height, "bg4");

    this.plane = game.add.sprite(562.5 - 175, menuPlaneY, "playerN");
    this.plane.width = 350;
    this.plane.height = 350;
    // this.plane.enableBody = true;

    this.initializeUI();
};

AboutState.prototype.update = function() {
    // When starting the state scroll up the about text and stop in a point
    this.aboutTextCurrentHeight -= game.height * 0.002;
    this.aboutText.y = this.aboutTextCurrentHeight;
    if (this.aboutText.bottom < -100) game.state.start('MainMenuState');


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

AboutState.prototype.UISettings = function() {
    // Settings for different parts of UI
    this.aboutTextContent = game.cache.getText('AboutText');
    this.aboutTextStartPosition = [0.05 * game.width, 1 * game.height];
    this.aboutTextSize = 64;
    this.aboutTextCurrentHeight = 1 * game.height;

    this.goBackButtonPosition = [0.1 * game.width, 0.05 * game.height];
    this.goBackButtonShape = [200, 200];
    this.goBackButtonSprite = 'GoBackButton';
    this.goBackButtonSpriteFrames = [1, 0, 2, 2];
};

AboutState.prototype.initializeUI = function() {
    // Callback function for the button
    let hitGoBackButton = function() {game.state.start('MainMenuState');};
    // Initialize the text
    this.aboutText = game.add.bitmapText(this.aboutTextStartPosition[0], this.aboutTextStartPosition[1],
        'DefaultFont', this.aboutTextContent, this.aboutTextSize);
    this.aboutText.align = 'left';
    this.aboutText.anchor.setTo(0, 0);
    this.aboutText.maxWidth = 1050;

    // Add the button
    this.addButton(this.goBackButtonPosition, this.goBackButtonShape,
        this.goBackButtonSprite, this.goBackButtonSpriteFrames, hitGoBackButton);
};

// General add button function
AboutState.prototype.addButton = function(position, shape, sprite, spriteFrames, callback) {
    let newButton = game.add.button(position[0], position[1], sprite, callback, this,
        spriteFrames[0], spriteFrames[1], spriteFrames[2], spriteFrames[3]);
    newButton.anchor.setTo(0.5, 0.5);
    newButton.width = shape[0];
    newButton.height = shape[1];
};