const http = require('http')
const sockTS = require('sockjs')

const socketPortNumber = 3000

const serialPort = require('serialport')
const readLine = require('@serialport/parser-readline')
const portName = 'COM10'

const arduinoPort = new serialPort(portName,{baudRate: 9600})
const parser = arduinoPort.pipe(new readLine())

let sendToClient = function(_:string){}

arduinoPort.on('open', ()=>{
    console.log("Port open!")
})

parser.on('data', d => {
    sendToClient(d)
    console.log(d)
})


let echo = sockTS.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' })
echo.on('connection', conn => {
    sendToClient = function(data: string){
        conn.write(data)
    }
    conn.on('data', message => {
        console.log(message)
    });
    conn.on('close', ()=>{})
    conn.on('ard_data', function(e: CustomEvent){
        console.log(e.detail)
    })
});

const server = http.createServer()
echo.installHandlers(server, {prefix:'/arduino'})
server.listen(socketPortNumber, '127.0.0.1')
