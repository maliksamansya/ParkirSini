const initialState = {
  reviewDetail: [],
  facilityDetail: []
};

export const reviewDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'reviewDetail/fetch':
      return {
        ...state,
        reviewDetail: action.payload
      }

    default:
      return state
  }
};

export const facilityDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'facilityDetail/fetch':
      return {
        ...state,
        facilityDetail: action.payload
      }

    default:
      return state
  }
};


