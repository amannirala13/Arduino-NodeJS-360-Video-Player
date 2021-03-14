"use strict";
// Requesting HTTP and sockJS from the respective modules
const http = require('http');
const sockTS = require('sockjs');
// Defining port number: (Change this port number to the port you want to make a socket connection though)
const socketPortNumber = 3000;
// Requesting serialport and readline from respective modules for reading incoming serial data flow
const serialPort = require('serialport');
const readLine = require('@serialport/parser-readline');
// Defining the port name: This is the port to which your arduino is connected.
// Change it to the name of the port to which you have connected your arduino
const portName = 'COM10';
// Listening to the data from the serial port
const arduinoPort = new serialPort(portName, { baudRate: 9600 });
// Parsing the data to readable format and converting into streams of lines
const parser = arduinoPort.pipe(new readLine());
// Defining a function to send data from arduino to the client via the socket port
let sendRawDataToClient = function (_) { };
// Callback for the event when we are successfully listening on the serial port
arduinoPort.on('open', () => {
    console.log("Port open!");
});
// Callback for the event when we receive stream of data on the serial port
parser.on('data', d => {
    //When the data is received, it is sent to the client via this function
    sendRawDataToClient(d);
    console.log(d);
});
// Creating a socket server
let socketServer = sockTS.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });
// Callback for the event when a connection is created
socketServer.on('connection', conn => {
    // Assigning the function to send data received from serial port to the socket
    sendRawDataToClient = function (data) {
        conn.write(data); //sending data to the client
    };
    // Callback to the event when the client sends some response or a message
    conn.on('data', message => {
        console.log(message); // print the response
    });
    // Callback for event when the socket connection is closed
    conn.on('close', () => { }); // do nothing
});
// Creating an http server
const server = http.createServer();
// Assigning a prefix. When a client tries to connect to the host with this prefix, a socket connection is established
// between the client and the listening server
socketServer.installHandlers(server, { prefix: '/arduino' });
// Start listening for connections on localhost(127.0.0.1) via the defined port number in socketPortNumber
server.listen(socketPortNumber, '127.0.0.1');
