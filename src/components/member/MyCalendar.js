import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  const events = [
    {
      start: new Date(),
      end: new Date(moment().add(1, 'days')),
      title: 'Sample Event',
    },
    {
      start: new Date('2024-02-01'),
      end: new Date('2024-02-02'),
      title: 'TEST',
    },
    // more events...
  ];

  return (
    <div>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        /* events 배열은 달력에 표시될 이벤트 목록이다. 
        배열의 각 객체는 start, end, 그리고 title 속성을 가져야 한다. */
        style={{ height: '100vh' }}
      />
    </div>
  );
};

export default MyCalendar;
