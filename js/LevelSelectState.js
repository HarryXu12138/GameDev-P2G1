let LevelSelectState = function() {
};

LevelSelectState.prototype.preload = function() {
    this.UISettings();
};

LevelSelectState.prototype.create = function() {
    this.initializeUI();
};

LevelSelectState.prototype.UISettings = function() {
    this.level1ButtonPosition = [0.1 * game.width, 0.1 * game.height];
};

LevelSelectState.prototype.initializeUI = function() {
    this.level1Button = game.add.button(this.level1ButtonPosition[0], this.level1ButtonPosition[1],
        'Level1', this.hitLevel1Button, this);
    this.level1Button.anchor.setTo(0.5, 0.5);
};

LevelSelectState.prototype.hitLevel1Button = function() {
	game.state.start("GameState", true, false, 1);
    alert('Enter level 1');
};