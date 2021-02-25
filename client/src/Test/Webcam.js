import React, { VideoHTMLAttributes, useEffect, useRef } from 'react';


function Webcam(props) {

    const refVideo = useRef(null)

    useEffect(() => {
        if (!refVideo.current) return;
        refVideo.current.srcObject = props.src
        console.log(refVideo);
        refVideo.current.play();
    }, [props.src])

    return <video ref={refVideo} {...props} />

}

export default Webcam;