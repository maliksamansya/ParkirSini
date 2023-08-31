const initialState = {
  landlords: [],
  landlordDetail: {},
  saldo: {}
};

export const landlordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'landlords/fetch':
      return {
        ...state,
        landlords: action.payload
      }

    default:
      return state
  }
};

export const landlordDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'landlordDetail/fetch':
      return {
        ...state,
        landlordDetail: action.payload
      }

    default:
      return state
  }
};
export const saldoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'saldo/fetch':
      return {
        ...state,
        saldo: action.payload
      }

    default:
      return state
  }
};

