/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useState } from 'react';
import { Divider } from 'primereact/divider';
import { RangePicker } from 'react-minimal-datetime-range';
import styles from './choose-date-time-range.module.css';
import 'react-minimal-datetime-range/lib/react-minimal-datetime-range.css';
import { checkDateIsNotZero } from '../common-ui';

export interface ChooseDateTimeRangeProps {
  setShouldDisableNextButton: (sdnb: boolean) => void;
  setStartDate: (sd: Date) => void;
  setEndDate: (ed: Date) => void;
  startDate: Date;
  endDate: Date;
  toast: any;
}

export function ChooseDateTimeRange(props: ChooseDateTimeRangeProps) {
  const {
    setShouldDisableNextButton,
    setStartDate,
    setEndDate,
    startDate,
    endDate,
    toast,
  } = props;
  const now = new Date();
  const [hour] = useState('00');
  const [minute] = useState('00');
  const [month] = useState(String(now.getMonth() + 1).padStart(2, '0'));
  const [date] = useState(String(now.getDate()).padStart(2, '0'));
  const [year] = useState(String(now.getFullYear()));

  const prepareDateString = (dateStr: string) =>
    dateStr.split(' ').join('T') + ':00.000Z';

  const handleOnConfirm = (dates: string[]) => {
    const [startDateStr, endDateStr] = dates;
    const aStartDate = new Date(prepareDateString(startDateStr));
    setStartDate(aStartDate);
    const aEndDate = new Date(prepareDateString(endDateStr));
    setEndDate(aEndDate);
    setShouldDisableNextButton(false);
    toast.current.show({
      severity: 'success',
      summary: 'Date range chosen!',
      detail: `${startDate.toUTCString()} - ${endDate.toUTCString()}`,
    });
  };

  return (
    <div className={styles['container']}>
      <div className="field">
        <label>Choose Datetime Range (GMT):</label>
        <RangePicker
          locale={`en-us`} // default is en-us
          show={false} // default is false
          disabled={false} // default is false
          allowPageClickToClose={true} // default is true
          placeholder={['Start Time', 'End Time']}
          defaultDates={[
            year + '-' + month + '-' + date,
            year + '-' + month + '-' + date,
          ]} // ['YYYY-MM-DD', 'YYYY-MM-DD']
          defaultTimes={[hour + ':' + minute, hour + ':' + minute]} // ['hh:mm', 'hh:mm']
          initialDates={[
            year + '-' + month + '-' + date,
            year + '-' + month + '-' + date,
          ]} // ['YYYY-MM-DD', 'YYYY-MM-DD']
          initialTimes={[hour + ':' + minute, hour + ':' + minute]} // ['hh:mm', 'hh:mm']
          onConfirm={handleOnConfirm}
          // onClose={() => console.log('closed')}
          style={{ width: '400px' }}
        />
      </div>
      {checkDateIsNotZero(startDate) && checkDateIsNotZero(endDate) && (
        <>
          <Divider />
          <div className="field">
            <label>Chosen Datetime Range:</label>
            <div>
              {startDate.toUTCString()} - {endDate.toUTCString()}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ChooseDateTimeRange;
