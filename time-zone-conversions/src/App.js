import React, { useEffect, useReducer } from 'react';
import './App.css';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { DeleteOutline, Schedule } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';

import timezoneList from './timezone-list';
import AddDateTimeCell from './AddDateTimeCell';
import { useStyles } from './styles';
import reducer from './state/reducer';
import initialState from './state/initalState';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [autocompleteValue] = React.useState(null);
  const [autocompleteInputValue, setAutocompleteInputValue] = React.useState(
    ''
  );

  useEffect(() => {
    localStorage.setItem('timezones', JSON.stringify(state.timezones));
  }, [state.timezones]);

  useEffect(() => {
    localStorage.setItem('baseTimesUtc', JSON.stringify(state.baseTimesUtc));
  }, [state.baseTimesUtc]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'setData' });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addNewTimezone = () => {
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
                <TextField
                  {...params}
                  label="Add timezone"
                  variant="outlined"
                />
              )}
            />
          </FormControl>
        </TableCell>
      </TableRow>
    );
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Schedule />
        </Avatar>
        <Typography component="h1" variant="h5">
          Timezone Conversion Table
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Timezone</TableCell>
                <TableCell align="left">Now</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.data.map((row, timezoneIndex) => (
                <TableRow key={row.name}>
                  <TableCell component="td" scope="row">
                    {row.name}
                    {timezoneIndex > 0 && (
                      <IconButton
                        aria-label="delete"
                        onClick={() =>
                          dispatch({ type: 'deleteTimezone', value: row.name })
                        }
                      >
                        <DeleteOutline />
                      </IconButton>
                    )}
                  </TableCell>
                  {row.times.map((time, timeIndex) => (
                    <TableCell key={`${row.name}-${timeIndex}`} align="left">
                      {time.format('YYYY-MM-DD')}
                      <br />
                      {time.format('HH:mm:ss')}
                      <br />
                      {time.format('hh:mm:ss A')}
                    </TableCell>
                  ))}
                  <AddDateTimeCell
                    row={row}
                    timezoneIndex={timezoneIndex}
                    open={row.name === state.popoverOpen}
                    dispatch={dispatch}
                  />
                </TableRow>
              ))}
              {addNewTimezone()}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}

export default App;
