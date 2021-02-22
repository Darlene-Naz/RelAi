import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "./Calendar.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

function CalendarView(props) {
    const [ events, updateEvents ] = useState([
        {
            start: moment().toDate(),
            end: moment().add(1, "days").toDate(),
            title: "Some title",
        },
    ]);

    useEffect(() => {
        axios.post(
            'http://localhost:8000/api/v1/event/check',
            {
                'text': 'get my events',
                'token': JSON.stringify({
                    'access_token': localStorage.getItem('access_token'),
                    'refresh_token': localStorage.getItem('refresh_token'),
                    'scope': localStorage.getItem('scope'),
                    'token_type': localStorage.getItem('token_type'),
                    'expiry_date': localStorage.getItem('expiry_date')
                })
            },
            {}
        ).then(res => {
            updateEvents(res.data.message.map(element => {
                return { start: new Date(element.start.dateTime), end: new Date(element.end.dateTime), title: element.summary }
            }))
        }).catch(e => {
            console.log(e);
        })
    }, []);

    // events: [
    //     {
    //         start: moment().toDate(),
    //         end: moment().add(1, "days").toDate(),
    //         title: "Some title",
    //     },
    // ],


    // function onEventResize(data) {
    //     const { start, end } = data;
    //     console.log(data)
    //     updateEvents((prev) => {
    //         state.events[ 0 ].start = start;
    //         state.events[ 0 ].end = end;
    //         return { events: [ ...state.events ] };
    //     });
    // };

    // function onEventDrop(data) {
    //     console.log(data);
    // };


    return (
        <div className="App">
            <DnDCalendar
                defaultDate={moment().toDate()}
                defaultView="month"
                events={events}
                localizer={localizer}
                // onEventDrop={onEventDrop}
                // onEventResize={onEventResize}
                resizable
                style={{ height: "100vh" }}
            />
        </div>
    );

}

export default CalendarView;