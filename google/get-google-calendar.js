const fs = require('fs')
const { Auth, google } = require('googleapis');
const keyDir = process.env.GOOGLE_SERVICE_ACCOUNT_ABS_PATH

const key = JSON.parse(Buffer.from(fs.readFileSync(keyDir)).toString())

const getGoogleCalendar = () => {
    const auth = new Auth.GoogleAuth({
        credentials: key,
        scopes: 'https://www.googleapis.com/auth/calendar',
    });
    return google.calendar({ version: 'v3', auth });
}

module.exports = { getGoogleCalendar }