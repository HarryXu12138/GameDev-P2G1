class MusicManager {
	constructor(game) {

		this.game = game;

		this.pianoNotes = []
		this.createPianoNotes();
	}

	createPianoNotes() {
		// create the notes and add them to the game
		// first add the quarter notes
		this.pianoNotes.push(this.game.add.audio("p_c5_quarter"));
		this.pianoNotes.push(this.game.add.audio("p_d5_quarter"));
		this.pianoNotes.push(this.game.add.audio("p_e5_quarter"));
		this.pianoNotes.push(this.game.add.audio("p_g5_quarter"));
		this.pianoNotes.push(this.game.add.audio("p_a6_quarter"));
		// add the half notes after the quarter notes

		// then add the whole notes
	}

	playNote(instrument, note, duration) {
		var notes;
		switch(instrument) {
			case 0:
				// 0 is piano
				notes = this.pianoNotes;
				break;
		}

		notes[note + duration*5].play();
	}
}