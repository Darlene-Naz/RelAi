import { getExpertAPIResponse } from '../../utils/expert-ai-request';

const getAnalyzedOutput = async (req, res) => {
    try {
        let text = req.body.text;
        let response = await getExpertAPIResponse(text);
        res.status(200).json({ 'message': response.data });
    } catch (e) {
        res.status(500).json({ 'message': `Error! \n` + e });
    }
}

export { getAnalyzedOutput };