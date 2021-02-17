import { getExpertAPIResponse } from '../../utils/expert-ai-request';
import { getDateTimeInFormat } from '../../utils/datetime-manipulation';
import { getGoogleAuthClient } from '../../utils/google-client';
import { google } from 'googleapis';

const createEventFromText = async (text, token) => {
    try {
        const oAuth2Client = getGoogleAuthClient();
        oAuth2Client.setCredentials(token);
        const calendar = google.calendar({ version: 'v3', oAuth2Client });

        return new Promise(async function(resolve, reject) {
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
            }, function (err, e) {
                if (err) reject({ 'message': `Error! \n` + err, 'error': true });
                event = { ...event, 'link': e.data.htmlLink };
                resolve({ 'message': event, 'error': false });
            });
        })
    } catch (err) {
        return { 'message': `Error! \n` + err, 'error': true };
    }
}

const getEvents = async (token) => {
    try {
        const oAuth2Client = getGoogleAuthClient();
        oAuth2Client.setCredentials(token);
        const calendar = google.calendar({ version: 'v3', oAuth2Client });

        return new Promise(function (resolve, reject) {
            calendar.events.list({
                auth: oAuth2Client,
                calendarId: 'primary',
                timeMin: (new Date()).toISOString(),
                maxResults: 10,
                singleEvents: true,
                orderBy: 'startTime',
            }, (err, response) => {
                if (err) {
                    return reject({ 'message': `Error! \n` + err, 'error': true });
                }
                const events = response.data.items;
                return resolve({ 'message': events, 'error': false });
            });
        });
    } catch (err) {
        return { 'message': `Error! \n` + err, 'error': true };
    }
}

const checkEventFunction = async (req, res) => {
    let text = req.body.text;
    let token = JSON.parse(req.body.token);

    let response = await getExpertAPIResponse(text);
    let relations = response.data.relations;

    let verbs = relations.filter((relation) => {
        return relation['verb']['lemma'] === 'get' || relation['verb']['lemma'] === 'create' || relation['verb']['lemma'] === 'make' || relation['verb']['lemma'] === 'set';
    });

    let type = verbs[0]['verb']['lemma'];

    let data;
    if (type !== 'get') data = await createEventFromText(text, token); else data = await getEvents(token);
    if (data['error'] === undefined) res.status(500).send(data); else res.status(200).send(data);
}

export { checkEventFunction };