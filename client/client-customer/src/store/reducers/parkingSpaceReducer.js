const initialState = {
  data: [],
  dataByLandlord: [],
  detail: {},
  relation: {}
};

export const parkingSpaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'parkingSpace/fetch':
      return {
        ...state,
        data: action.payload
      }

    default:
      return state
  }
};

export const parkingSpaceDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'parkingSpaceDetail/fetch':
      return {
        ...state,
        detail: action.payload
      }

    default:
      return state
  }
};

export const parkingSpaceReducerByLandlord = (state = initialState, action) => {
  switch (action.type) {
    case 'parkingSpaceByLandlord/fetch':
      return {
        ...state,
        dataByLandlord: action.payload
      }

    default:
      return state
  }
};

export const parkingSpaceRelation = (state = initialState, action) => {
  switch (action.type) {
    case 'facilityParkingSpaceRelation/fetch':
      return {
        ...state,
        relation: action.payload
      }

    default:
      return state
  }
};

export const parkingSpaceImages = (state = initialState, action) => {
  switch (action.type) {
    case 'parkingSpaceImages/fetch':
      return {
        ...state,
        images: action.payload
      }

    default:
      return state
  }
};
