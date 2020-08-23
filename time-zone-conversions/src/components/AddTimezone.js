import React from 'react';

import { FormControl, TextField, TableCell, TableRow } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

// Libraries
import timezoneList from '../lib/timezone-list';

function AddTimezone({ classes, dispatch }) {
  const [autocompleteValue] = React.useState(null);
  const [autocompleteInputValue, setAutocompleteInputValue] = React.useState(
    ''
  );

  return (
    <TableRow key="newTimezone">
      <TableCell>
        <FormControl variant="outlined" className={classes.formControl}>
          <Autocomplete
            id="combo-box-demo"
            value={autocompleteValue}
            onChange={(event, newValue) => {
              dispatch({ type: 'addTimezone', value: newValue });
              setAutocompleteInputValue('');
            }}
            inputValue={autocompleteInputValue}
            onInputChange={(event, newInputValue) => {
              setAutocompleteInputValue(newInputValue);
            }}
            options={timezoneList}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Add timezone" variant="outlined" />
            )}
          />
        </FormControl>
      </TableCell>
    </TableRow>
  );
}

export default AddTimezone;
