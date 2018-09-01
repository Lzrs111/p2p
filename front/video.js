import React from 'react'

function Video(props) {
    return (
        <div  >
            <video src={props.src} controls>
            </video>
        </div>
    )
}

export default Video