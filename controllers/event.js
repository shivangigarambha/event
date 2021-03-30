const Event = require('../models/event');

// 1) add event
exports.postAddEvent = (req, res, next) => {
    console.log(req.body);
    const title = req.body.title;
    const s_date = req.body.startDate;
    const e_date = req.body.endDate;
    const recurrence_1 = req.body.recurrence_1; 
    const recurrence_2 = req.body.recurrence_2;
    const event = new Event({
        title: title,
        startDate: s_date,
        endDate: e_date,
        recurrence_1: recurrence_1,
        recurrence_2: recurrence_2
    })
    event
        .save()
        .then(result => {
            console.log('New Event created.');
            res.json({
                message: 'Event added'
            })
        })
        .catch((err) => {
            console.log(err);
            res.json({
                message: 'Something wrong with creating event!',
                error: err
            })
        })
}

// 2) List Event
exports.getEvents = (req, res, next) => {
    Event.find()
        .then(events => {
            if(events.length === 0) {
                return res.json({
                    message: 'No Event Found'
                })
            }
            res.json({events: events})
        })
        .catch((err) => {
            console.log(err);
            res.json({
                message: 'Something wrong with fetching event!',
                error: err
            })
        })
}

// 3) View Event
exports.getViewEvent = (req, res, next) => {
    eventId = req.params.eventId;
    Event
        .findById(eventId)
        .then(event => {
            if(!event) {
                return res.json({
                    message: 'No Event Found'
                })
            }

            const s_d = new Date(event.startDate);
            const e_d = new Date(event.endDate);
            const occurrences = [];
            let diff;
            if(event.recurrence_1 === 'Every') diff = 1; 
            else if(event.recurrence_1 === 'Every Other') diff = 2; 
            else if(event.recurrence_1 === 'Every Third') diff = 3; 
            else if(event.recurrence_1 === 'Every Fourth') diff = 4;

            if(event.recurrence_2 === 'Day') {
                for(var date = s_d; date <= e_d; date.setDate(date.getDate()+diff)) {
                    occurrences.push(new Date(date));
                }
            } 
            else if(event.recurrence_2 === 'Week') {
                for(var date = s_d; date <= e_d; date.setDate(date.getDate()+diff*7)) {
                    occurrences.push(new Date(date));
                }
            }
            else if(event.recurrence_2 === 'Month') {
                for(var date = s_d; date <= e_d; date.setMonth(date.getMonth()+diff)) {
                    occurrences.push(new Date(date));
                }
            }
            else if(event.recurrence_2 === 'Year') {
                for(var date = s_d; date <= e_d; date.setFullYear(date.getFullYear()+diff)) {
                    occurrences.push(new Date(date));
                }
            }
            
            res.json({
                message: 'Event found',
                event: {...event._doc, occurrences: occurrences, eventCount: occurrences.length}
            })
        })
        .catch((err) => {
            console.log(err);
            res.json({
                message: 'Something went wrong!',
                error: err
            })
        })
}

// 4) Edit Event
exports.putEditEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    const title = req.body.title;
    const s_date = req.body.startDate;
    const e_date = req.body.endDate;
    const recurrence_1 = req.body.recurrence_1; 
    const recurrence_2 = req.body.recurrence_2;
    Event
        .findByIdAndUpdate(eventId, {
            title: title,
            startDate: s_date,
            endDate: e_date,
            recurrence_1: recurrence_1,
            recurrence_2: recurrence_2
        })
        .then((result) => {
            console.log('Event Updated');
            res.json({
                message: 'Event Updated'
            })

        })
        .catch((err) => {
            console.log(err);
            res.json({
                message: 'Something wrong with updating event!',
                error: err
            })
        })
}