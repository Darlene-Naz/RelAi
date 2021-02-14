import { getExpertAPIResponse } from '../../utils/expert-ai-request';
import { getDateTimeInFormat } from '../../utils/datetime-manipulation';
import { getGoogleAuthClient } from '../../utils/google-client';
import { google } from 'googleapis';

const getAnalyzedOutput = async (req, res) => {
    try {
        let text = req.body.text;
        let response = await getExpertAPIResponse(text);
        res.status(200).json({ 'message': response.data });
    } catch (e) {
        res.status(500).json({ 'message': `Error! \n` + e });
    }
}

const getEventsFromText = async (req, res) => {
    try {
        let text = req.body.text;
        let token = JSON.parse(req.body.token);

        const oAuth2Client = getGoogleAuthClient();
        oAuth2Client.setCredentials(token);
        const calendar = google.calendar({ version: 'v3', oAuth2Client });

        let response = await getExpertAPIResponse(text);

        let entities = response.data.entities;
        let dates = entities.filter((entity) => entity.type === 'DAT');
        let times = entities.filter((entity) => entity.type === 'HOU');
        let summary = entities.filter((entity) => entity.type === 'EVN' || entity.type === 'ORG' || entity.type === 'NPR')[0].lemma;
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
                  { 'method': 'email', 'minutes': 24 * 60 },
                  { 'method': 'popup', 'minutes': 10 },
                ],
            },
        };

        calendar.events.insert({
            auth: oAuth2Client,
            calendarId: 'primary',
            resource: event,
          }, function(err, e) {
            if (err) {
                res.status(500).json({ 'message': `Error! \n` + err });
            }
            event = { ...event, 'link': e.data.htmlLink };
            res.status(200).json({ 'message': event });
        });

    } catch (e) {
        res.status(500).json({ 'message': `Error! \n` + e });
    }
}

const returnEvents = (req, res) => {
    try {
        let token = JSON.parse(req.body.token);

        const oAuth2Client = getGoogleAuthClient();
        oAuth2Client.setCredentials(token);
        const calendar = google.calendar({ version: 'v3', oAuth2Client });

        calendar.events.list({
            auth: oAuth2Client,
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        }, (err, response) => {
            if (err) res.send(500).status({ 'message': `Error! \n` + err });
            const events = response.data.items;
            res.status(200).send({ 'message': events });
        });

    } catch(err) {
        res.send(500).status({ 'message': `Error! \n` + err })
    }
}

export { getAnalyzedOutput, getEventsFromText, returnEvents };