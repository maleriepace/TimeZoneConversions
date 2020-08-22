import moment from 'moment-timezone';

let storedTimezones = localStorage.getItem('timezones');
storedTimezones = storedTimezones && JSON.parse(storedTimezones);

let storedBaseTimesUtc = localStorage.getItem('baseTimesUtc');
storedBaseTimesUtc =
  storedBaseTimesUtc &&
  JSON.parse(storedBaseTimesUtc).map((time) => moment(time));

export default {
  timezones: storedTimezones || ['UTC'],
  baseTimesUtc: storedBaseTimesUtc || [],
  data: []
};
