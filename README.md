# AI calendar assistant
Manage events in your Google Calendar using natural language, which will be handled by an AI to generate or remove events from your calendar.

## How to use

Create a `.env` file in the root directory following `.env.example` structure.

- OPENAI_API_KEY: Create this key from [OpenAI Platform](https://platform.openai.com).
- GOOGLE_SERVICE_ACCOUNT_ABS_PATH: Create a service account from [Google Coud](https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts/). Grant this service account access to Google Calendar API. Then, create a JSON key for that service account. Once created, a JSON file with the key will be downloaded. Put that file where you prefer and paste in this var the absolute path to the file.

When you've done this, you can use the app with:

```bash
npm start

> gpt3-calendar-assistant@1.0.0 start
> node index.js

Enter some text about things you will do. Press Enter to proceed 
> Today I plan to ...
```
