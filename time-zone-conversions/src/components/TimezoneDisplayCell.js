import React from 'react';
import { IconButton, TableCell } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';

function TimezoneDisplayCell({ timezone, timezoneIndex, dispatch }) {
  return (
    <TableCell component="td" scope="row">
      {timezone}
      {timezoneIndex > 0 && (
        <IconButton
          aria-label="delete"
          onClick={() => dispatch({ type: 'deleteTimezone', value: timezone })}
        >
          <DeleteOutline />
        </IconButton>
      )}
    </TableCell>
  );
}

export default TimezoneDisplayCell;
