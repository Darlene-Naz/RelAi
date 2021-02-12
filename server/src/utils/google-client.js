import * as fs from 'fs'
import { google } from 'googleapis';

const getGoogleAuthClient = () => {
    try{
        let content = fs.readFileSync('src/config/credentials.json');
        const credentials = JSON.parse(content);
        const { client_secret, client_id, redirect_uris } = credentials.web;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

        return oAuth2Client;
    } catch(err) {
        console.log('Error loading client secret file:', err);
    }
}

export { getGoogleAuthClient };