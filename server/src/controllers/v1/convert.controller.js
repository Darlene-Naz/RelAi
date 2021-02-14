import { spawn } from 'child_process';
import { AUDIO_TO_TEXT_PYTHON_SCRIPT, VIDEO_TO_AUDIO_PYTHON_SCRIPT } from '../../config/constants';
import * as fs from 'fs';


const processAudioToText = async (path) => {
    let python = spawn('python3', [ AUDIO_TO_TEXT_PYTHON_SCRIPT, path ]);
        
    let data = '';
    for await (const chunk of python.stdout) {
        data += chunk;
    }
    data = data.replace('\n', '');

    let error = '';
    for await (const chunk of python.stderr) {
        error += chunk;
    }
    
    fs.unlink(path, (err) => {
        if (err) error += err;
        console.log(`${path} was deleted`);
    });

    return { data, error };
}

const convertAudioToText = async (req, res) => {
    try {
        const PATH = req.file.path;
        const { data, error } = await processAudioToText(String(PATH));

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

const convertVideoToText = async (req, res) => {
    try {
        const PATH = req.file.path;
        let converter = spawn('python3', [ VIDEO_TO_AUDIO_PYTHON_SCRIPT, String(PATH) ]);
        
        let intermediate = '';
        for await (const chunk of converter.stdout) {
            intermediate += chunk;
        }
        console.log(intermediate);

        const { data, error } = await processAudioToText('src/uploads/upload.wav');
        
        fs.unlink(PATH, (err) => {
            if (err) console.log(err);
            console.log(`${PATH} was deleted`);
        });

        if (error !== '') {
            res.status(200).send({ 'message': data })
        } else {
            res.status(500).send({ 'message': 'Error: ' + error })
        }
    } catch (err) {
        res.status(500).send({ 'message': 'Error: ' + err });
    }
}

export { convertAudioToText, convertTextFileToText, convertVideoToText };