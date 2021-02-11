import { spawn } from 'child_process';
import * as fs from 'fs';

const convertAudioToText = async (req, res) => {
    try {
        const PATH = req.file.path;
        let python = spawn('python3', [ './src/scripts/audio_to_text.py', String(PATH) ]);
        
        let data = '';
        for await (const chunk of python.stdout) {
            data += chunk;
        }
        data = data.replace('\n', '');

        let error = '';
        for await (const chunk of python.stderr) {
            error += chunk;
        }

        if (error !== '') {
            res.status(200).send({ 'message': data })
        } else {
            res.status(500).send({ 'message': 'Error: ' + error })
        }
    } catch (err) {
        res.status(500).send({ 'message': 'Error: ' + err });
    }
}

const convertTextFileToText = async(req, res) => {
    try {
        const PATH = req.file.path;
        let text = fs.readFileSync(PATH);
        res.status(200).send({ 'message': text.toString() });
    } catch(err) {
        res.status(500).send({ 'message': 'Error: ' + err });
    }
}

export { convertAudioToText, convertTextFileToText };