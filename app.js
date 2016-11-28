console.log('starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs
	.command('add', 'Add a new note', {
		title: {
			describe: 'Note\'s title',
			demand: true,
			alias: 't'
		},
		body: {
			describe: 'Note\'s body',
			demand: true,
			alias: 'b'
		}
	})
	.command('list', 'List all notes')	
	.command('read', 'Read a note', {
		title: {
			describe: 'Note\'s title',
			demand: true,
			alias: 't'
		}
	})
	.command('remove', 'Remove a note', {
		title: {
			describe: 'Note\'s title',
			demand: true,
			alias: 't'
		}
	})
	.help()
	.argv;
var command = argv._[0];
console.log('Command:', command);

console.log('Yargs:', argv);

if (command === 'add') {
	var note = notes.addNote(argv.title, argv.body);
	if (note) {
		console.log('Note created successfully.');
		notes.logNote(note);		
	} else {
		console.log('Note add failed!');
	}
} else if (command === 'list') {
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} notes(s).`);
	allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
	var note = notes.getNote(argv.title);
	if (note) {
		console.log('Note found.');
		notes.logNote(note);
	} else {
		console.log('Note not found!');
	}
} else if (command === 'remove') {
	var removed = notes.removeNote(argv.title);
	var message = removed ? 'Note removed!' : 'Note not found!';
	console.log(message);
} else {
	console.log('Command not recognized.');
}