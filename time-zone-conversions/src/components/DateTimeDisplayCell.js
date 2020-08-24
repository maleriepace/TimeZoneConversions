import React from 'react';

import { TableCell } from '@material-ui/core';
import { NightsStay, WbSunny } from '@material-ui/icons';

function DateTimeDisplayCell({ state, timezone, baseTimeUtc }) {
  const time = baseTimeUtc.tz(timezone);
  const displayTime = () => {
    if (state.timeFormat === '24hr') {
      return time.format('HH:mm:ss');
    }
    return time.format('hh:mm:ss A');
  };

  return (
    <TableCell align="left">
      {time.format('YYYY-MM-DD')}
      <br />
      {displayTime()}
      {time.hours() >= 12 ? <NightsStay /> : <WbSunny />}
    </TableCell>
  );
}

export default DateTimeDisplayCell;
