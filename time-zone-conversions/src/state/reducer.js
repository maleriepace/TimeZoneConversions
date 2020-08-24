function reducer(state, action) {
  switch (action.type) {
    case 'addTimezone':
      if (
        action.value &&
        !state.timezones.some((item) => item === action.value)
      ) {
        state.timezones = [...state.timezones, action.value];
        return {
          ...state,
          timezones: state.timezones
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
          timezones: state.timezones
        };
      }
      return state;
    case 'openPopover':
      return {
        ...state,
        popoverOpen: action.timezone
      };
    case 'addTime':
      console.log(action.utcDateTime);
      return {
        ...state,
        baseTimesUtc: [...state.baseTimesUtc, action.utcDateTime]
      };
    case 'setTimeFormat':
      return { ...state, timeFormat: action.timeFormat };
    case 'deleteBaseTime':
      state.baseTimesUtc.splice(action.index, 1);
      return {
        ...state,
        baseTimesUtc: [...state.baseTimesUtc]
      };
    default:
      throw new Error();
  }
}
export default reducer;
