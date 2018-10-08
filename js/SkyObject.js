

class SkyObject extends Phaser.Sprite {
	// this is the class to describe the sky object. It's a sprite, it has coordinates, a sound that gets played when it's tapped (or none)
	// it also has an effect that occurs when it falls off the edge of the screen and an effect that occurs when the plane flys into it
	// all of the note types and other planes and thunder clouds probably inherit from this.
	constructor (game, x, y, key, frame) {
		super(game, 10000, 0, key, frame); // spawn off screen. We may want to figure this out better
	}

	setPosition(x, y) {
		super.x = x;
		super.y = y;
	}

	actionGetTapped() {

	}

	actionGetReleased() {
		
	}

	actionFallOffEdge() {

	}

	actionPlaneFlysInto() {

	}
}