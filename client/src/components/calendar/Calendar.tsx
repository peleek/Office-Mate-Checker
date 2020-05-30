import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";

import '@fullcalendar/core/main.css';
import '@fullcalendar/timegrid/main.css';

export const Calendar: React.FC = () =>
    <FullCalendar
        events={[
            { title: 'event 1', date: Date.now().toLocaleString() },
            { title: 'event 2', date: Date.now().toLocaleString() }
        ]}
        defaultView="timeGridWeek"
        plugins={[timeGridPlugin, interactionPlugin]}
        editable={true}
    />;
