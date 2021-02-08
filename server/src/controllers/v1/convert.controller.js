import { spawn } from 'child_process';

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
        res.status(500).send({ 'message': 'Error' });
    }
}

export { convertAudioToText };