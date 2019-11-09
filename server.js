var net = require('net');
var fs = require("fs");
var exec = require("child_process").exec;
var server = net.createServer(onConnected);

var connections = [];

server.listen(3000,'127.0.0.1',() => { console.log(server.address()); });

function onConnected(connection){

	var address = connection.remoteAddress+" : " + connection.remotePort; 
	console.log(address);
	connections.push(connection);
	connection.on('data',(data) => { 
		data = JSON.parse(data);
		// console.log(address + "  ==  " + data["type"]);
		// console.log(data["data"]);
		fs.writeFile('out.cpp', data["data"], (err) => {
			if(err) throw err;
		});

		exec("g++ out.cpp && ./a.out", (err,stdout,stderr) => {
			connection.write(stdout);
		})

		
	});
}
