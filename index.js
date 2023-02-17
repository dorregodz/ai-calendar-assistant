require('dotenv').config()
const CalendarEventRepository = require('./google/calendarEventRepository');
const { getGoogleCalendar } = require('./google/get-google-calendar');
const GPT3CalendarAssistant = require('./gpt3/calendar_assistant')
const readline = require('readline');

const gpt3CalendarAssistant = new GPT3CalendarAssistant()
const calendar = getGoogleCalendar();
const calendarEventRepository = new CalendarEventRepository(calendar)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter some text about things you will do. Press Enter to proceed \n> ', async (answer) => {
    console.log('\n\n')
    const eventsToCreate = await gpt3CalendarAssistant.buildCalendarEvents(answer)

    if (eventsToCreate.length === 0) {
        console.log(`[index]---> No events to create. Exited`)
        return
    }

    console.log(`[index]---> Creating ${eventsToCreate.length} events in Google Calendar...`)
    for (const calendarEvent of eventsToCreate) {
        console.debug(`[default]----> Creating event '${calendarEvent.title}'`)
        await calendarEventRepository.create(calendarEvent);
    }
    console.log(`[index]---> Created all events in calendar... 🚀`);
    rl.close();
});
