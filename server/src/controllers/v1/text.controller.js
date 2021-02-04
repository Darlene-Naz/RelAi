import { EXPERT_API_ENDPOINT } from '../../config/endpoints';
import axios from 'axios';

const getSummarizedOutput = async (req, res) => {
    try {
        let text = req.body.text;

        // Header
        let config = {
            'headers': {
                'Authorization': `Bearer ${process.env.EXPERT_AI_TOKEN}`,
                'Content-Type': 'application/json',
            }
        }

        // Data
        let data = {
            'document': {
                'text': text,
            }
        }

        axios.post(
            EXPERT_API_ENDPOINT, 
            data,
            config,
        ).then((response) => {
            res.status(200).send(response.data.data.mainSentences);
        }).catch((e) => {
            console.log(e);
            res.status(500).json({ 'message': e });
        });

    } catch (e) {
        res.status(500).json({ 'message': `Error! \n` + e });
    }
}

export { getSummarizedOutput };