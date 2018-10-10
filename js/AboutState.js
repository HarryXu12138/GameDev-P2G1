let AboutState = function() {
};

AboutState.prototype.preload = function() {
    this.aboutText = game.cache.getText('AboutText');
    this.aboutTextStartPosition = [0.05 * game.width, 1 * game.height];
    this.aboutTextSize = 64;
    this.aboutTextCurrentHeight = 1 * game.height;
};

AboutState.prototype.create = function() {
    this.aboutText = game.add.bitmapText(this.aboutTextStartPosition[0], this.aboutTextStartPosition[1],
        'DefaultFont', this.aboutText, this.aboutTextSize);
    this.aboutText.align = 'left';
    this.aboutText.anchor.setTo(0, 0);
    this.aboutText.maxWidth = 1050;
};

AboutState.prototype.update = function() {
    this.aboutTextCurrentHeight -= game.height * 0.005;
    this.aboutText.y = this.aboutTextCurrentHeight;
};