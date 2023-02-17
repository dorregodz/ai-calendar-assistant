const { AxiosResponse } = require("axios");
const { calendar_v3 } = require("googleapis");
const CalendarEvent = require("../domain/calendarEvent");

/**
 * 
 * @param {CalendarEvent} calendarEvent - The domain object
 * @returns {object} The Google Calendar event object to send as payload
 */
const fromDomainObjectToGoogleCalendarObject = (calendarEvent) => ({
    summary: calendarEvent.title,
    description: calendarEvent.description,
    start: {
        dateTime: calendarEvent.startDateTimeUtc.toISOString(),
        timeZone: calendarEvent.timeZone
    },
    end: {
        dateTime: calendarEvent.endDateTimeUtc.toISOString(),
        timeZone: calendarEvent.timeZone
    },
})

class CalendarEventRepository {
    #calendarClient;

    /**
     * @param {calendar_v3.Calendar} calendarClient - The google calendar client
     */
    constructor(calendarClient) {
        this.#calendarClient = calendarClient;
    }

    /**
     * @param {CalendarEvent} calendarEvent - The event to create
     * @return {Promise<AxiosResponse>} The calendar creation request
     */
    create(calendarEvent) {
        return this.#calendarClient.events.insert(
            {
                calendarId: calendarEvent.calendarId,
                resource: fromDomainObjectToGoogleCalendarObject(calendarEvent)
            });
    }
}

module.exports = CalendarEventRepository;