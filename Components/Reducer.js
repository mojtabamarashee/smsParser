
const initialState = {
  list: [],
  count: 0,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_LIST':
      return {
        ...state,
        list: action.list,
        count: action.list.length,
      };
    default:
      return state;
  }
};

export default Reducer;
