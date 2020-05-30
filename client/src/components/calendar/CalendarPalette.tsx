import React from 'react';
import { Draggable } from "@fullcalendar/interaction";

export const CalendarPalette: React.FC = () => {


    React.useEffect(() => {
        let draggableEl = document.getElementById("palette-events") as HTMLElement;
        new Draggable(draggableEl, {
            itemSelector: ".fc-event",
            eventData: function (eventEl) {
                let title = eventEl.getAttribute("title");
                let id = eventEl.getAttribute("data");
                return {
                    title: title,
                    id: id
                };
            }
        });
    }, [])

    return (
        <>
            <div id="palette-events">
                <div className='fc-event' title={'Busy'}>
                    Draggable busy element
                </div>
                <div className='fc-event' title={'Available'}>
                    Draggable available element
                </div>
            </div>
            <div>Add specified event </div>
        </>
    )
}