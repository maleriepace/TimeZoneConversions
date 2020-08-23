import React from 'react';
import { TableCell, IconButton } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import moment from 'moment';

function CustomTimeHeader({ state, baseTimeUtc, baseTimeUtcIndex, dispatch }) {
  const getDiffFromPrevious = () => {
    let prevTime = moment().utc();
    if (baseTimeUtcIndex !== 0) {
      prevTime = state.baseTimesUtc[baseTimeUtcIndex - 1];
    }

    let diff = moment(baseTimeUtc.diff(prevTime));
    const displayPart = [];
    if (diff < 0) {
      displayPart.push('-');
      diff = diff * -1;
    } else {
      displayPart.push('+');
    }
    const duration = moment.duration(diff);
    addDisplayPart(displayPart, duration.days(), 'd');
    addDisplayPart(displayPart, duration.hours(), 'h');
    addDisplayPart(displayPart, duration.minutes(), 'm');
    addDisplayPart(displayPart, duration.seconds(), 's');
    return displayPart.join(' ');
  };

  const addDisplayPart = (array, number, part) => {
    if (number) {
      array.push(`${number}${part}`);
    }
  };

  return (
    <TableCell align="left">
      {getDiffFromPrevious()}
      <IconButton
        aria-label="delete"
        onClick={() =>
          dispatch({ type: 'deleteBaseTime', index: baseTimeUtcIndex })
        }
      >
        <DeleteOutline />
      </IconButton>
    </TableCell>
  );
}

export default CustomTimeHeader;
