import React, { useEffect, useReducer } from 'react';
import './App.css';
import {
  Avatar,
  CssBaseline,
  Paper,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { Schedule } from '@material-ui/icons';

import moment from 'moment';

// Libraries
import { useStyles } from './styles';

// State
import reducer from './state/reducer';
import initialState from './state/initalState';

// Custom Components
import AddDateTimeCell from './components/AddDateTimeCell';
import TimeFormatToggle from './components/TimeFormatToggle';
import TimezoneDisplayCell from './components/TimezoneDisplayCell';
import DateTimeDisplayCell from './components/DateTimeDisplayCell';
import AddTimezone from './components/AddTimezone';
import CustomTimeHeader from './components/CustomTimeHeader';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [data, setData] = React.useState([]);
  //createData(state.timezones, state.baseTimesUtc)();

  function createData(timezones, baseTimesUtc) {
    // return timezones.map((item) => {
    //   return { name: item, times: getTimes(item, baseTimesUtc) };
    // });
  }

  function getTimes(timezone, baseTimesUtc) {
    const times = [moment.tz(timezone)];
    for (const baseTime of baseTimesUtc) {
      times.push(baseTime.tz(timezone));
    }
    return times;
  }

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
        <TimeFormatToggle state={state} dispatch={dispatch} />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Timezone</TableCell>
                <TableCell align="left">Now</TableCell>
                {state.baseTimesUtc.map((baseTimeUtc, baseTimeUtcIndex) => (
                  <CustomTimeHeader
                    key={`timeHeader-${baseTimeUtcIndex}`}
                    state={state}
                    baseTimeUtc={baseTimeUtc}
                    baseTimeUtcIndex={baseTimeUtcIndex}
                    dispatch={dispatch}
                  />
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {state.timezones.map((timezone, timezoneIndex) => (
                <TableRow key={timezone}>
                  <TimezoneDisplayCell
                    timezone={timezone}
                    timezoneIndex={timezoneIndex}
                    dispatch={dispatch}
                  />
                  <DateTimeDisplayCell
                    state={state}
                    timezone="UTC"
                    baseTimeUtc={moment()}
                  />
                  {state.baseTimesUtc.map((baseTimeUtc, baseTimeUtcIndex) => (
                    <DateTimeDisplayCell
                      key={`${timezone}-${baseTimeUtcIndex}`}
                      state={state}
                      timezone={timezone}
                      baseTimeUtc={baseTimeUtc}
                    />
                  ))}
                  <AddDateTimeCell
                    timezone={timezone}
                    timezoneIndex={timezoneIndex}
                    open={timezone === state.popoverOpen}
                    dispatch={dispatch}
                    classes={classes}
                  />
                </TableRow>
              ))}
              <AddTimezone classes={classes} dispatch={dispatch} />
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}

export default App;
