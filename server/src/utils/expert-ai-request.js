import { EXPERT_API_ENDPOINT } from '../config/endpoints';
import axios from 'axios';

const getExpertAPIResponse = async (text) => {
        let config = {
            'headers': {
                'Authorization': `Bearer ${process.env.EXPERT_AI_TOKEN}`,
                'Content-Type': 'application/json',
            }
        }

        let data = {
            'document': {
                'text': text,
            }
        }

        return axios.post(
            EXPERT_API_ENDPOINT, 
            data,
            config,
        ).then((response) => {
            return Promise.resolve(response.data);
        }).catch((e) => {
            return Promise.reject(e);
        });
}

export { getExpertAPIResponse };