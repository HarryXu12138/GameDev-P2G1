

class NoteManager {
	constructor() {
		this.currentObjects = [];
		this.time = 0;
	}

	update(dt) {
		this.time += dt;
		this.updateAllObjects(dt);
	}

	updateAllObjects(dt) {
		var i = 0;
		while (i < this.currentObjects.length) {
			// if the time is less than the current time +1 (to account for it being off screen) then it should be destroyed
			if (this.currentObjects[i].time + 1 < this.time || this.currentObjects[i].requestDestroy) {
				// destroy it
				console.log("Destroyed object");
				this.currentObjects.splice(i, 1); // remove that object
			} else {
				// otherwise update it then increase the i
				var col = this.currentObjects[i].collumn;
				var x = col * 100 + 50; // convert collumn to x position
				var y = game.height-(this.currentObjects[i].time - this.time);
				this.currentObjects[i].setPosition(x, y);
				i++;
				console.log("Set position " + y);
			}
		}
	}

	testAddRandomNote() {
		this.addObject("");
	}


	addObject(note) {
		// this gets called whenever we load a new note. The notes have a time, a channel/note value, and a color thing.
		// This gets called a bunch to load notes when we load a file, and it also gets called during the level update if we go for a procedural/infinite level as well.
		// objects are notes, obstacles, and whatever else we decide to add.
		var obj = new SkyObject(game, "StartBotton", 0, this.time + 10, 1);
		game.add(obj);
		this.currentObjects.push(obj);
	}
}