var net = require('net');
var fs = require('fs');

var socket = net.Socket();
socket.connect(3000,'127.0.0.1',() => {  console.log("connected"); });

var data = {
	"type": "ports",
	"data": 1234
}

// data = JSON.stringify(data);

// socket.write(data);

socket.on('data', (data) => {
	// data = data.toString();
	// data = JSON.parse(data);
	// console.log(data["type"]);
	console.log(data.toString());
});

fs.readFile('code.cpp', (err,data) => {
	if(err) throw err;
	let file = {
		"type" : "file",
		"data" : data.toString()
	};
	socket.write(JSON.stringify(file));
})
