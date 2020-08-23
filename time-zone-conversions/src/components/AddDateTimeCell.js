import React from 'react';
import TextField from '@material-ui/core/TextField';
import { AddAlarm, Done } from '@material-ui/icons';
import Popover from '@material-ui/core/Popover';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment-timezone';

function AddDateTimeCell({ timezone, timezoneIndex, open, dispatch, classes }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [textValue, setTextValue] = React.useState(
    moment().tz(timezone).format('YYYY-MM-DDTHH:mm')
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

    dispatch({ type: 'openPopover', timezone });
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch({ type: 'openPopover', timezone: null });
  };
  const handleChange = (event) => {
    setTextValue(event.target.value);
  };

  const addDateTime = () => {
    dispatch({
      type: 'addTime',
      utcDateTime: moment.tz(textValue, timezone).utc()
    });
  };

  return (
    <TableCell>
      <IconButton
        aria-describedby={open ? `popover-${timezoneIndex}` : ''}
        onClick={handleClick}
      >
        <AddAlarm />
      </IconButton>
      <Popover
        id={open ? `popover-${timezoneIndex}` : ''}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <form className={classes.container} noValidate style={{ padding: 20 }}>
          <TextField
            id="datetime-local"
            label="Date/Time"
            type="datetime-local"
            defaultValue={textValue}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            onChange={handleChange}
          />
          <IconButton color="primary" variant="contained" onClick={addDateTime}>
            <Done />
          </IconButton>
        </form>
      </Popover>
    </TableCell>
  );
}

export default AddDateTimeCell;
