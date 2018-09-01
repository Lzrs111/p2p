import "babel-polyfill"
import React, { Component } from 'react'
import Video from "./video"
import io from "socket.io-client"
import ss from  "socket.io-stream"

class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            stream: ""
        };
    }
    componentDidMount() {
        var socket = io("http://localhost:3000")
        var stream = ss.createStream()
        socket.on("LOL",(param)=>{
            console.log("connected?!")
            })
        navigator.mediaDevices.getUserMedia({audio:true, video:true}).then((mstream) => {
            var recorder = new MediaRecorder(mstream)
            var chunks = []
            var blob = new Blob(chunks)
            

            recorder.onstart = (e)=>{
                console.log("starting to record lmao")
                console.log(recorder.state)
                }
            
            recorder.ondataavailable = (e)=>{
                console.log("data available")
                chunks.push(e.data)
                blob = new Blob(chunks)
                }

                
                ss(socket).emit("video",stream)
                ss.createBlobReadStream(blob).pipe(stream)
            
            recorder.start(1000)

            socket.on("video2",(stream)=>{
                console.log("xD")
                this.video.srcObject = stream
                })
            
        }).catch((reason) => {
            console.log(reason)
        });
        
    }
    render () {
        return (
            <div>
                <video controls="true" ref={(video)=>{
                    this.video = video
                    }} />
            </div>
        )
    }
}

export default App