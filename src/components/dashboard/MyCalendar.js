import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMines } from '../../api/task/TaskInfo';
import { produce } from 'immer';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getMines()
      .then((items) => {
        items.length > 0 &&
          items.map(({ sdate, edate, tname, status }) => {
            const info = {
              start: new Date(sdate),
              end: new Date(edate),
              title: tname,
              status: status,
            };

            setEvents(
              produce((draft) => {
                draft.push(info);
              }),
            );
          });
      })
      .catch((err) => console.error(err));
  }, []);


  return (
    <div>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        /* events 배열은 달력에 표시될 이벤트 목록이다. 
        배열의 각 객체는 start, end, 그리고 title 속성을 가져야 한다. */
        style={{ height: '95vh' }}
        eventPropGetter={(events) => {
          const backgroundColor =
            events.status === 'request'
              ? '#1E5959'
              : events.status === 'progress'
              ? '#7b9eb5'
              : events.status === 'success'
              ? '#164773'
              : 'gray';
          const color = 'white';
          return { style: { backgroundColor, color } };
        }}
      />
    </div>
  );
};

export default MyCalendar;
