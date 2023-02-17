const GPT3 = require('./rest_api_client')
const { calendarsInfo } = require('./calendars_info')
const CalendarEvent = require('../domain/calendarEvent')

const PROMPT_CONTEXT_TEMPLATE = `
Generate JSON list of calendar events from text.
Sample calendar event: {"calendarId" : "string","title" : "string","description" : "string","startDateTimeUtc" : "yyyy-MM-ddThh:mm:ssZ","endDateTimeUtc" : "yyyy-MM-ddThh:mm:ssZ","timeZone" : "Europe/Madrid"}
Desired result format: [event1, event2, ..., eventN]

Example available calendar ids: work, habits, personal_growth, life
Example text: Saturday afternoon I'm visiting one friend from 5pm to 6:30pm. Then I'm doing sport until 8pm. Later, at 9pm, I'm going to practise english for 1 hour.
Example result: [{"calendarId":"life","title":"Visit friend","description":"","startDateTimeUtc":"2023-02-18T17:00:00","endDateTimeUtc":"2023-02-18T18:30:00","timeZone":"Europe/Madrid"},{"calendarId":"habits","title":"Sport","description":"","startDateTimeUtc":"2023-02-18T18:30:00","endDateTimeUtc":"2023-02-18T20:00:00","timeZone":"Europe/Madrid"},{"calendarId":"personal_growth","title":"Practise enclish","description":"","startDateTimeUtc":"2023-02-18T21:00:00","endDateTimeUtc":"2023-02-18T22:00:00","timeZone":"Europe/Madrid"}]

Available calendar ids: <?available-calendar-ids>
Text: <?user-input>
Result:
`
class GPT3CalendarAssistant {
    #gpt3;

    constructor() {
        this.#gpt3 = new GPT3();
    }

    #buildPrompt(userInput) {
        const availableCalendarIdsForGpt = Object.keys(calendarsInfo).join(', ');
        return PROMPT_CONTEXT_TEMPLATE
            .replace('<?available-calendar-ids>', availableCalendarIdsForGpt)
            .replace('<?user-input>', userInput)
    }

    /**
     * Calls GPT-3 to obtain JSON events and parses it to build domain objects
     * @param {string} userInput - The user input talking about their events to add
     * @returns {Promise<Array<CalendarEvent>>} 
     */
    async buildCalendarEvents(userInput) {
        const preparedPrompt = this.#buildPrompt(userInput)
        console.log('[calendar-assistant]---> Calling GPT3 REST API...')
        const gpt3Response = await this.#gpt3.prompt(preparedPrompt)
        const parsedCalendarEvents = JSON.parse(gpt3Response)
        return parsedCalendarEvents.map(calendarEvent => {
            const googleCalendarId = calendarsInfo[calendarEvent.calendarId]
            return new CalendarEvent({
                ...calendarEvent,
                calendarId: googleCalendarId,
                startDateTimeUtc: new Date(calendarEvent.startDateTimeUtc),
                endDateTimeUtc: new Date(calendarEvent.endDateTimeUtc)
            })
        })
    }
}

module.exports = GPT3CalendarAssistant;