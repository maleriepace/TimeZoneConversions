import React, { useEffect } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';

function TimeFormatToggle({ state, dispatch }) {
  const handleTimeFormat = (event, newTimeFormat) => {
    dispatch({ type: 'setTimeFormat', timeFormat: newTimeFormat });
  };

  useEffect(() => {
    localStorage.setItem('timeFormat', state.timeFormat);
  }, [state.timeFormat]);

  return (
    <ToggleButtonGroup
      style={{
        alignSelf: 'flex-end'
      }}
      value={state.timeFormat}
      exclusive
      onChange={handleTimeFormat}
      aria-label="text alignment"
    >
      <ToggleButton value="12hr" aria-label="12 hr">
        12hr
      </ToggleButton>
      <ToggleButton value="24hr" aria-label="24 hr">
        24hr
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default TimeFormatToggle;
