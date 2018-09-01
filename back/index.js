import fs from "fs"
import express from "express"
import socket from "socket.io"
import {Server} from "http"
import ss from "socket.io-stream"


var app = express()
var server = Server(app)
var stream2 = ss.createStream()
server.listen(3000)

app.use('/',express.static(__dirname))
    
var listener = socket.listen(server)
listener.sockets.on("connection",(socket)=>{
    ss(socket).on("video",(stream)=>{
        console.log("piping to frontend lmao")
        socket.emit("video2",stream2)
        stream.pipe(stream2)
        })
    })

