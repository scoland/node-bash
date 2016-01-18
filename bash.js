var commands = require('./commands');
var async = require('async');
var userCommand = "pwd";

function done(output) {
	process.stdout.write(output);
	process.stdout.write('\nprompt > ');
}

// console.log(process.hrtime());

process.stdout.write('prompt > ');

process.stdin.on('data', function(data) {
	var cmdString = data.toString().trim();
	var cmdList = cmdString.split(/\s*\|\s*/g);

	var splitData = cmdList[0].toString().split(' ');
	var cmd = splitData[0].toString().trim(); // removes newline
	var arg = cmdList[0].toString().slice(cmd.length + 1).trim();
	var stdin = null;
	if (cmd.length === 0) {
		commands.blanks();
	} else {
		commands[cmd](stdin, arg, done);
	}
})