import React from 'react';
import { captureUserMedia, S3Upload } from './AppUtils';
import Webcam from './Webcam';
import RecordRTC from 'recordrtc';
import { CButton, CCol, CContainer, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import user from './Icons/user2.jpeg'
import camerastop from './Icons/camera-stop.svg'
import microphone from './Icons/microphone.svg'
import microphonestop from './Icons/microphone-stop.svg'
import share from './Icons/share.svg'
import hangup from './Icons/hang-up.svg'
import fullscreen from './Icons/fullscreen.svg'
import minimize from './Icons/minimize.svg'
import ringtone from './Sounds/ringtone.mp3'
// import { Modal } from 'react-bootstrap';

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);

class RecordPage extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            recordVideo: null,
            src: null,
            uploadSuccess: null,
            uploading: false,
            startBtn: false,
        };

        this.requestUserMedia = this.requestUserMedia.bind(this);
        this.startRecord = this.startRecord.bind(this);
        this.stopRecord = this.stopRecord.bind(this);
    }

    componentDidMount() {
        if (!hasGetUserMedia) {
            alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
            return;
        }
        this.requestUserMedia();
    }

    requestUserMedia() {
        console.log('requestUserMedia')
        captureUserMedia((stream) => {
            console.log(stream);
            this.setState({ src: stream });
            console.log('setting state', this.state)
        });
    }

    startRecord() {
        this.setState({
            'startBtn': true,
        });
        captureUserMedia((stream) => {
            this.state.recordVideo = RecordRTC(stream, { type: 'video/webm' });
            this.state.recordVideo.startRecording();
        });
    }

    stopRecord() {
        this.setState({
            'startBtn': false,
        });
        this.state.recordVideo.stopRecording(() => {
            let params = {
                type: 'video/webm',
                data: this.state.recordVideo.blob,
                id: Math.floor(Math.random() * 90000) + 10000
            }

            this.setState({ uploading: true });

            S3Upload(params)
                // .then((success) => {
                //     console.log('enter then statement')
                //     if (success) {
                //         console.log(success)
                //         this.setState({ uploadSuccess: true, uploading: false });
                //     }
                // }, (error) => {
                //     alert(error, 'error occurred. check your aws settings and try again.')
                // })
        });
    }

    render() {
        return (
            <CCol>
                {/* <Modal show={this.state.uploadSuccess}><Modal.Body>Upload success!</Modal.Body></Modal> */}
                <CRow>
                    <CCol col="12" sm="6" md="6" xl className="mr-3">
                        <Webcam src={this.state.src} />
                    </CCol>
                    <CCol col="12" sm="6" md="6" xl className="mr-3 mb-1 justify-content-center">
                        <div style={{
                            width: "100%",
                            height: "100%",
                            background: "black",
                            zIndex: "99",
                            alignItems: "center",
                        }}>
                            <CIcon className="align-self-center" src={user} />
                        </div>
                    </CCol>
                </CRow>
                {
                    this.state.uploading ?
                        <div>Uploading...</div> : null
                }
                <CButton block color="danger" onClick={this.state.startBtn ? this.stopRecord : this.startRecord}>{this.state.startBtn ? 'Stop Recording' : 'Start Recording' }</CButton>
            </CCol >
        )
    }
}

export default RecordPage;