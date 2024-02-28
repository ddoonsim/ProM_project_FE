import { useCallback, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';

const AddTaskCalendar = ({ form, onChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <>
      <div>
        <Calendar
          // onChange={changeDate}
          next2Label={null}
          prev2Label={null}
          selectRange={true}
          formatDay={(locale, date) => moment(date).format('DD')}
        />
        <input
          name="sDate"
          value={startDate || ''}
          onChange={onChange}
          disabled
          placeholder="시작일"
        />
        <input
          name="eDate"
          value={endDate || ''}
          onChange={onChange}
          disabled
          placeholder="종료일"
        />
      </div>
    </>
  );
};

export default AddTaskCalendar;
