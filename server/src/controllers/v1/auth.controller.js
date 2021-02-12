import { google } from 'googleapis';
import * as fs from 'fs';
import { getGoogleAuthClient } from '../../utils/google-client';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';

function authorize(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });

    return authUrl;
}

const getAuthLink = (req, res) => {
    try {
        const oAuth2Client = getGoogleAuthClient();
        const authURL = authorize(oAuth2Client);
        res.status(200).send({ 'message': `Auth URL: ${authURL}` });
    } catch (err) {
        res.status(500).send({ 'message': err });
    }
}

const getAuthToken = (req, res) => {
    try {
        const code = req.body.access_code;
        const oAuth2Client = getGoogleAuthClient();
        
        oAuth2Client.getToken(code, (err, token) => {
            if (err) res.status(500).send({ 'message': err });
            res.status(200).send({ 'message': token })
        });

    } catch (err) {
        res.status(500).send({ 'message': err });
    }

}

export { getAuthLink, getAuthToken };