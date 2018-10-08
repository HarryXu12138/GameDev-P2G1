

class NoteManager {
	constructor() {
		this.currentNotes = []
	}

	update(var dt) {
		foreach(var note in currentNotes) {

		}
	}

	addObject(var note) {
		// this gets called whenever we load a new note. The notes have a time, a channel/note value, and a color thing.
		// This gets called a bunch to load notes when we load a file, and it also gets called during the level update if we go for a procedural/infinite level as well.
		// objects are notes, obstacles, and whatever else we decide to add.
	}
}