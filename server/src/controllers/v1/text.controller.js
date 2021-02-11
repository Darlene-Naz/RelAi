import { getExpertAPIResponse } from '../../utils/expert-ai-request';
import { getDateTimeInFormat } from '../../utils/datetime-manipulation';

const getSummarizedOutput = async (req, res) => {
    try {
        let text = req.body.text;
        let response = await getExpertAPIResponse(text);
        res.status(200).json({ 'message': response.data.mainSentences });
    } catch (e) {
        res.status(500).json({ 'message': `Error! \n` + e });
    }
}

const getEventsFromText = async (req, res) => {
    try {
        let text = req.body.text;
        let response = await getExpertAPIResponse(text);
        let entities = response.data.entities;
        let dates = entities.filter((entity) => entity.type === 'DAT');
        let times = entities.filter((entity) => entity.type === 'HOU');
        let summary = entities.filter((entity) => entity.type === 'EVN')[0].lemma;
        let location = entities.filter((entity) => entity.type === 'GEO')[0].lemma;

        let endDate = dates[0].lemma;
        let startDate = dates[dates.length - 1].lemma;

        let endTime = times[0].lemma;
        let startTime = times[times.length - 1].lemma;

        let startTimeFormatted = getDateTimeInFormat(startDate, startTime);
        let endTimeFormatted = getDateTimeInFormat(endDate, endTime);

        let event = {
            'summary': summary,
            'location': location,
            'description': undefined,
            'start': {
              'dateTime': startTimeFormatted,
              'timeZone': 'Asia/Kolkata',
            },
            'end': {
              'dateTime': endTimeFormatted,
              'timeZone': 'Asia/Kolkata',
            },
            'reminders': {
                'useDefault': false,
                'overrides': [
                  {'method': 'email', 'minutes': 24 * 60},
                  {'method': 'popup', 'minutes': 10},
                ],
            },
        };

        res.status(200).json({ 'message': event });
    } catch (e) {
        res.status(500).json({ 'message': `Error! \n` + e });
    }
}

export { getSummarizedOutput, getEventsFromText };