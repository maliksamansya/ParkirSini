
import { combineReducers } from "redux";
import {
  parkingSpaceDetailReducer, parkingSpaceImages,
  parkingSpaceReducer,
  parkingSpaceReducerByLandlord,
  parkingSpaceRelation
} from "./parkingSpaceReducer.js";
import {landlordDetailReducer, landlordsReducer, saldoReducer} from "./landlordsReducer.js";
import { facilityDetailReducer, reviewDetailReducer } from "./reviewReducer.js";
import { bookingReducer } from "./bookingReducer.js";
import {customersReducer} from "./customerReducer.js";

const mainReducer = combineReducers({
  data: parkingSpaceReducer,
  dataByLandlord: parkingSpaceReducerByLandlord,
  detail: parkingSpaceDetailReducer,
  landlords: landlordsReducer,
  landlordDetail: landlordDetailReducer,
  reviewDetail: reviewDetailReducer,
  facilityDetail: facilityDetailReducer,
  relation: parkingSpaceRelation,
  booking: bookingReducer,
  images: parkingSpaceImages,
  customers: customersReducer,
  saldo: saldoReducer
})


export default mainReducer;
