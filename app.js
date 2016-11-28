console.log('starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
var command = argv._[0];
console.log('Command:', command);

console.log('Yargs:', argv);

if (command === 'add') {
	var note = notes.addNote(argv.title, argv.body);
	if (note) {
		console.log('Note created successfully.');		
	} else {
		console.log('Note add failed!');
	}
} else if (command === 'list') {
	notes.getAll();
} else if (command === 'read') {
	var note = notes.getNote(argv.title);
	if (note) {
		console.log('Note found.');
		console.log(`Title: ${note.title}`);
		console.log(`Body: ${note.body}`);
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