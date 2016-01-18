var fs = require('fs');
var request = require('request');

var commands = {
	pwd: function(stdin,file, done) {
		done(process.cwd());
	},
	ls: function(stdin,file, done) {
		var result = ""
		fs.readdir('.', function(err, files) {
		  if (err) throw err;
		  files.forEach(function(file) {
		    result += file.toString() + "\n";
		  })
		  done(result);

		});

	},
	echo: function(stdin,file,done) {
		done(file);
	},
	cat: function(stdin,file,done) {
		fs.readFile(file, function(err, data) {
		  if (err) throw err;
		  done(data.toString());
		})
	},
	blanks: function() {
		process.stdout.write('\nPlease input command');
		process.stdout.write('\nprompt > ');
	},
	head: function(stdin,file,done) {
		if (stdin) {
			file = stdin;
		} 
		fs.readFile(file,function(err,data) {
			if (err) throw err;
			var answer = [];
			var splitData = data.toString().split("\n");
			for (var x = 0; x < 5; x++) {
				answer.push(splitData[x]);
			}
			done(answer.join("\n"));
		})
	},
	tail: function(stdin,file,done) {
		fs.readFile(file,function(err,data) {
			if (err) throw err;
			var answer = [];
			var splitData = data.toString().split("\n");
			for (var x = splitData.length - 1; x > splitData.length - 6; x--) {
				answer.push(splitData[x]);
			}
			answer.reverse();
			done(answer.join("\n"));
		})
	},
	wc: function(stdin,file,done) {
		fs.readFile(file,function(err,data) {
			if (err) throw err;
			var splitData = data.toString().split("\n");
			done(splitData.length.toString());
		})
	},
	sort: function(stdin,file, done) {
		fs.readFile(file,function(err,data) {
			if (err) throw err;
			var splitData = data.toString().split("\n");
			done(splitData.sort().join("\n"));
		})
	},
	uniq: function(stdin,file,done) {
		fs.readFile(file,function(err,data) {
			if (err) throw err;
			var splitData = data.toString().split("\n");
			var resultArray = [splitData[0]];

			for (var i = 1; i < splitData.length; i++) {
				if (splitData[i] !== resultArray[resultArray.length - 1]) {
					resultArray.push(splitData[i]);
				}
			};

			done(resultArray.join("\n"));
		})
	},
	curl: function(stdin,file,done) {
		request(file, function(err, response, body) {
			if (err) throw err;
			done(body);
		})
	}

};

module.exports = commands;