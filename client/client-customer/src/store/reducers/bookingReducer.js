const initialState = {
    bookings: []
};

export const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'booking/fetch':
            return {
                ...state,
                bookings: action.payload
            }

        default:
            return state
    }
};
