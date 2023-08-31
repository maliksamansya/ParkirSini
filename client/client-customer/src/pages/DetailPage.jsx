import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookingDetail from '../components/DetailPageComponents/BookingDetail.jsx';
import Reserve from '../components/DetailPageComponents/Reserve.jsx';
import {
  fetchFacilityDetail,
  fetchParkingSpaceRelation,
  fetchParkingSpacesDetail,
  fetchReviewDetail
} from '../store/actions/index';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const dispatch = useDispatch();
  const parkingSpace = useSelector(state => state.detail.detail);
  const reviews = useSelector(state => state.reviewDetail.reviewDetail);
  const facilities = useSelector(state => state.facilityDetail.facilityDetail);
  const relation = useSelector(state => state.relation.relation);
  const loading = useSelector(state => state.detail.loading);
  const error = useSelector(state => state.detail.error);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchParkingSpacesDetail(id));
    dispatch(fetchReviewDetail(id));
    dispatch(fetchFacilityDetail())
    dispatch(fetchParkingSpaceRelation(id))
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Reserve parkingSpace={parkingSpace} reviews={reviews} />
      <BookingDetail parkingSpace={parkingSpace} reviews={reviews} facilities={facilities} relation={relation}/>
    </>
  );
};

export default DetailPage;
