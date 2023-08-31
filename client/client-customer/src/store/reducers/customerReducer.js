const initialState = {
  customers: []
};

export const customersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'customers/fetch':
      return {
        ...state,
        customers: action.payload
      }

    default:
      return state
  }
};
