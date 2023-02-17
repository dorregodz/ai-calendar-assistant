/**
 * Calendar event aggregate
 */
class CalendarEvent {
    calendarId;
    title;
    description;
    startDateTimeUtc;
    endDateTimeUtc;
    timeZone;

    /**
     * 
     * @param {object} params
     * @param {string} params.calendarId
     * @param {string} params.title
     * @param {string} params.description
     * @param {Date} params.startDateTimeUtc
     * @param {Date} params.endDateTimeUtc
     * @param {string} params.timeZone - Eg: Europe/Madrid
     */
    constructor(params) {
        this.calendarId = params.calendarId;
        this.title = params.title;
        this.description = params.description;
        this.startDateTimeUtc = params.startDateTimeUtc;
        this.endDateTimeUtc = params.endDateTimeUtc;
        this.timeZone = params.timeZone;
    }
}

module.exports = CalendarEvent;