import moment from 'moment-timezone';

function reducer(state, action) {
  switch (action.type) {
    case 'setData':
      return {
        ...state,
        data: createData(state.timezones, state.baseTimesUtc)
      };
    case 'addTimezone':
      if (
        action.value &&
        !state.timezones.some((item) => item === action.value)
      ) {
        state.timezones = [...state.timezones, action.value];
        return {
          ...state,
          timezones: state.timezones,
          data: createData(state.timezones, state.baseTimesUtc)
        };
      }
      return state;
    case 'deleteTimezone':
      if (
        action.value &&
        state.timezones.some((item) => item === action.value)
      ) {
        state.timezones = [
          ...state.timezones.filter((timezone) => timezone !== action.value)
        ];
        return {
          ...state,
          timezones: state.timezones,
          data: createData(state.timezones, state.baseTimesUtc)
        };
      }
      return state;
    case 'openPopover':
      return {
        ...state,
        popoverOpen: action.timezone
      };
    case 'addTime':
      return {
        ...state,
        baseTimesUtc: [...state.baseTimesUtc, action.utcDateTime]
      };
    default:
      throw new Error();
  }
}
function createData(timezones, baseTimesUtc) {
  return timezones.map((item) => {
    return { name: item, times: getTimes(item, baseTimesUtc) };
  });
}
function getTimes(timezone, baseTimesUtc) {
  const times = [moment.tz(timezone)];
  for (const baseTime of baseTimesUtc) {
    times.push(baseTime.tz(timezone));
  }
  return times;
}
export default reducer;
