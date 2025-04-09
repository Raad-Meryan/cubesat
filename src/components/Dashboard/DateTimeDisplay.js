import React, { useEffect, useState } from 'react';

function DateTimeDisplay() {
  const [utcTime, setUtcTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setUtcTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      fontSize: '20px',
      fontWeight: 'normal',
      color: '#ffffff',
      margin: '10px 0'
    }}>
      <div>{utcTime.toISOString().split('T')[0]}</div>
      <div>{utcTime.toUTCString().split(' ')[4]} UTC</div>
    </div>
  );
}

export default DateTimeDisplay;
