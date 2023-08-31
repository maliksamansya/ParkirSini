import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link, useNavigate, useParams} from "react-router-dom";
import {fetchLandlordDetail, fetchParkingSpaceRelation, fetchParkingSpacesByLandlord} from "../store/actions/index.js";
import Logout from "../components/Logout.jsx";

const LandlordListings = () => {
  const landlordDetail = useSelector((state) => state.landlordDetail.landlordDetail);
  const parkingSpaces = useSelector((state) => state.dataByLandlord.dataByLandlord);
  const relation = useSelector(state => state.relation.relation);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchLandlordDetail(id));
    dispatch(fetchParkingSpacesByLandlord(id))
    dispatch(fetchParkingSpaceRelation(id))
  }, []);

  const handleBackButtonClick = () => {
    navigate('/dashboard-landlord');
  };

  if (!parkingSpaces) {
    return <div>Loading...</div>;
    // console.log(parkingSpaces, '<---landlordListings page2')
  }
  // console.log(relation)
  return (
    <>
      <div className="container-fluid" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <Logout />
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="titile-block title-block_subpage">
              <h2>Daftar Lahan Parkir Milik Anda</h2>
            </div>
          </div>
        </div>
      </div>



      <div className="container-fluid">
        <button className="btn btn-primary" onClick={handleBackButtonClick}>
          ← Kembali
        </button>
        <hr />
        <div className="row">
          {parkingSpaces.map(space => (
            <div className="col-md-6 col-lg-3 article-first" key={space.id}>
              <div className="news-block">
                <img
                  src={space.mainImg}
                  className="img-fluid"
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                  }}
                />
                <div className="news-title">
                  <p>Rp. {space.price.toLocaleString('id-ID')} / 30 hari</p>
                  <h5>{space.name}</h5>
                  <p className="blog2-thumbnail-name  ellipsis">{space.description}</p>
                  <Link to={`/rental-list/${space.id}`}className="btn-primary">Lihat</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default LandlordListings;
