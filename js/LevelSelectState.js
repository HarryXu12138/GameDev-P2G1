let LevelSelectState = function() {
};

LevelSelectState.prototype.preload = function() {
    // UI settings
    this.UISettings();
};

LevelSelectState.prototype.create = function() {
    // add background art that scrolls
    this.backgroundStuff = game.add.group();
    let background1 = this.backgroundStuff.create(0,0, "bg1");
    let background2 = this.backgroundStuff.create(0, -1 * background1.height, "bg1");

    this.plane = game.add.sprite(562.5 - 175, menuPlaneY, "playerN");
    this.plane.width = 350;
    this.plane.height = 350;
    // this.plane.enableBody = true;


    // UI initialization
    this.initializeUI();
    // Cheat keys, disable if not for debugging
    this.addCheatKeys();
};

LevelSelectState.prototype.UISettings = function() {
    // Settings for background sprite
    this.levelSelectBackGroundPosition = [0.5 * game.width, 0.45 * game.height];
    this.levelSelectBackGroundShape = [1000, 1600];
    // Deprecated but will keep it. This is for the fancy UI(version 1) UI
    // NVM
    this.levelSelectBackGroundTextOffset = -630;

    // Initialize all level buttons
    this.levelButtonsSettings = [];
    // Initialize level buttons as an array
    // All values are percentage value corresponding to screen resolution
    // This is the left upper corner of the array
    let minXY = [0.27, 0.36];
    // This is the largest width of the array
    let maxX = 0.8;
    // This is the space between buttons
    let buttonSpace = [0.22, 0.1];
    // This is the shape of each buttons
    let buttonShape = [200, 200];

    // Record the previous button position
    let previousPosition = [minXY[0] - buttonSpace[0], minXY[1]];
    for (let i = 1; i < 10; ++i) {
        // Calculate the next button position
        let nextPosition = [previousPosition[0] + buttonSpace[0], previousPosition[1]];
        // If exceed max width, go to next line
        if (nextPosition[0] >= maxX) {
            nextPosition[0] = minXY[0];
            nextPosition[1] = nextPosition[1] + buttonSpace[1];
        }
        // Record loop invariant
        previousPosition = nextPosition;
        // Change the percentage to coordinates
        nextPosition = [nextPosition[0] * game.width, nextPosition[1] * game.height];
        // Sprites and text settings for each button
        let buttonFrames = [1, 0, 2, 2];
        let buttonText = i.toString();
        // Indicate if the button is enabled or not
        let buttonEnabled = true;
        // Lock buttons over the max user passed level
        if (i > userLevelNum) {
            buttonFrames = [4, 4, 4, 4];
            buttonText = '';
            buttonEnabled = false;
        }
        // Initialize setting dictionary
        let setting = {
            position:nextPosition,
            shape:buttonShape.slice(),
            text:buttonText,
            style:{
                font:'bold 80pt Arial',
                fill:'white'
            },
            frames:buttonFrames,
            enabled:buttonEnabled
        };
        // Push to the settings
        this.levelButtonsSettings.push(setting);
    }
    // Last button need some special settings since it is infinite level
    let infinitLevelButton = this.levelButtonsSettings[this.levelButtonsSettings.length - 1];
    // infinitLevelButton.position[0] += buttonSpace[0] * game.width / 2;
    // infinitLevelButton.shape[0] = buttonShape[0] + buttonSpace[0] * game.width;
    if (userLevelNum > 8)
        infinitLevelButton.text = '∞';
    infinitLevelButton.style = {
        font:'bold 150pt Arial',
        fill:'white'
    };

    // Settings for go back button
    this.goBackButtonPosition = [0.1 * game.width, 0.05 * game.height];
    this.goBackButtonShape = [200, 200];
    this.goBackButtonSprite = 'GoBackButton';
    this.goBackButtonSpriteFrames = [1, 0, 2, 2];
};

LevelSelectState.prototype.update = function() {
    // this updates the background and plane
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
}

LevelSelectState.prototype.initializeUI = function() {
    // Initialize the background of level select
    let backGround = game.add.sprite(this.levelSelectBackGroundPosition[0], this.levelSelectBackGroundPosition[1],
        'LevelSelectBkground')
    let bkgroundText = game.add.sprite(this.levelSelectBackGroundPosition[0],
        this.levelSelectBackGroundPosition[1] + this.levelSelectBackGroundTextOffset, 'LevelSelectText')
    bkgroundText.anchor.setTo(0.5, 0.5)
    backGround.anchor.setTo(0.5, 0.5)
    backGround.width = this.levelSelectBackGroundShape[0];
    backGround.height = this.levelSelectBackGroundShape[1];

    // This is the call back function for the level buttons
    let hitLevelButton = function(levelNumber) {game.state.start('GameState', true, false, levelNumber);};

    // Add those buttons and setting callback functions
    for (let i = 0; i < this.levelButtonsSettings.length; ++i) {
        let setting = this.levelButtonsSettings[i];
        // The callback function is different for the infinite level
        let callback = function() {hitLevelButton(i + 1)};
        if (i == this.levelButtonsSettings.length - 1)
            callback = function() {hitLevelButton(0)};
        // Add the button with those settings
        this.addGeneralButtonWithText(setting.position, setting.shape, setting.text, setting.style, setting.frames, setting.enabled,callback);
    }
    // Add go back button
    let hitGoBackButtonCallBack = function() {game.state.start('MainMenuState');};
    this.addButton(this.goBackButtonPosition, this.goBackButtonShape,
        this.goBackButtonSprite, this.goBackButtonSpriteFrames, true, hitGoBackButtonCallBack);
};

// Add some cheat keys that we can directly unlock levels
LevelSelectState.prototype.addCheatKeys = function() {
    // keys for lock all levels and unlock next level
    let unlockKey = game.input.keyboard.addKey(Phaser.Keyboard.U);
    let lockKey = game.input.keyboard.addKey(Phaser.Keyboard.L);

    // Callback functions for those keys. Directly change the levelNum
    let unlockNextLevel = function() {
        ++userLevelNum;
        game.state.restart();
    };
    let lockAllLevel = function() {
        userLevelNum = 1;
        game.state.restart();
    };
    // Add listener
    unlockKey.onUp.add(unlockNextLevel, this);
    lockKey.onUp.add(lockAllLevel, this);
};

// Add button with text on it. So I can manually set the text by myself
LevelSelectState.prototype.addGeneralButtonWithText = function(position, shape, text, style, frames, buttonEnabled, callback) {
    this.addButton(position, shape, 'GeneralButton', frames, buttonEnabled, callback);
    let buttonText = game.add.text(position[0], position[1], text, style);
    buttonText.anchor.setTo(0.5, 0.5);
    buttonText.align = 'center';
};

// Add a buttons to the state
LevelSelectState.prototype.addButton = function(position, shape, sprite, spriteFrames, buttonEnabled,callback) {
    let newButton = game.add.button(position[0], position[1], sprite, callback, this,
        spriteFrames[0], spriteFrames[1], spriteFrames[2], spriteFrames[3]);
    newButton.anchor.setTo(0.5, 0.5);
    newButton.width = shape[0];
    newButton.height = shape[1];
    newButton.inputEnabled = buttonEnabled;
};