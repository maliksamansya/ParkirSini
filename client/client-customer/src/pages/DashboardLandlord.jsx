import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {fetchCustomers, fetchParkingSpaceRelation, fetchSaldo} from "../store/actions/index.js";
import {useDispatch, useSelector} from "react-redux";
import Logout from "../components/Logout.jsx";
import SwalTimer from "../components/SwalTimer.jsx";

const DashboardLandlord = () => {
  const saldo = useSelector((state) => state.saldo.saldo);
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchSaldo());
      setTimeout(() => {
        setIsReady(true);
      }, 500);
    };

    fetchData();
  }, [dispatch]);

  if (!saldo || !isReady) {
    return <div></div>;
  }
  // console.log(saldo.username)

  return (
    <div className="container-fluid" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <Logout />
      </div>

      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="titile-block title-block_subpage text-center mb-4">
            <h2>Selamat Datang, Pemilik Lahan Parkir!</h2>
            <h4>Hai {saldo.username}, saldomu saat ini adalah Rp. {saldo.amount.toLocaleString('id-ID')}</h4>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-4 text-center mb-5">
          <Link to="/add-listing" className="btn btn-primary btn-lg btn-block">
            Tambah Lahan Parkir
          </Link>
        </div>
        <div className="col-md-4 text-center mb-5">
          <Link to="/landlordListings" className="btn btn-primary btn-lg btn-block">
            Daftar Lahan Parkir
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardLandlord;
