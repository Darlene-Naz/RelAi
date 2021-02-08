import { spawn } from 'child_process';

const convertAudioToText = async (req, res) => {
    try {
        const PATH = req.file.path;
        let python = spawn('python', ['../../scripts/audio_to_text.py', String(PATH)]);
        let dataToSend;
        console.log(python);
        python.stdout.on('data', function (data) {
            console.log('Pipe data from python script ...');
            dataToSend = data.toString();
        });
        python.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
            res.status(200).send({ 'message': dataToSend })
        });
    } catch (err) {
        res.status(500).send({ 'message': 'Error' });
    }
}

export { convertAudioToText };