import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchCustomers, fetchParkingSpaceRelation} from '../store/actions';
import { useNavigate, useParams } from 'react-router-dom';
import Logout from "../components/Logout.jsx";

const RentalList = () => {
  const relation = useSelector((state) => state.relation.relation);
  const customers = useSelector((state) => state.customers.customers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchParkingSpaceRelation(id));
      await dispatch(fetchCustomers());
      setTimeout(() => {
        setIsReady(true);
      }, 500);
    };

    fetchData();
  }, [dispatch, id]);

  const handleBackButtonClick = () => {
    navigate('/landlordListings');
  };

  // Render loading state if relation is not yet available or if not ready
  if (!relation || !isReady) {
    return <div></div>;
  }

  // console.log(relation)

  return (
    <>
      <div className="container-fluid" style={{ width: '80%', margin: '0 auto', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <Logout />
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="titile-block title-block_subpage">
              <h2>Detail Lahan Parkir</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid" style={{ width: '80%', margin: '0 auto' }}>
        <button
          className="btn btn-primary"
          onClick={handleBackButtonClick}
          style={{marginBottom: '20px'}}
        >
          ← Kembali
        </button>

        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <tbody>
              <tr>
                <td>Nama</td>
                <td>{relation.name}</td>
              </tr>
              <tr>
                <td>Lahan Parkir Tersedia</td>
                <td>{relation.stock - relation.Bookings?.length}</td>
              </tr>
              <tr>
                <td>Harga</td>
                <td>Rp. {relation.price.toLocaleString('id-ID')} / 30 hari</td>
              </tr>
              <tr>
                <td>Foto Utama</td>
                <td>
                  <div style={{ width: '50%' }}>
                    <img src={relation.mainImg} alt="#" className="img-fluid" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Keterangan</td>
                <td>
                  <p>{relation.subtitle}</p>
                </td>
              </tr>
              <tr>
                <td>Penyewa</td>
                <td style={{ verticalAlign: 'middle' }}>
                  {relation.Bookings && relation.Bookings.length > 0 ? (
                    <table style={{ width: '100%' }}>
                      <tbody>
                      {relation.Bookings.map((booking, i) => {
                        const customer = customers.find((customer) => customer.id === booking.customerId);
                        return (
                          <React.Fragment key={i}>
                            <tr>
                              <td>Nomor:</td>
                              <td>{i+1}</td>
                            </tr>
                            <tr>
                              <td>Username:</td>
                              <td>{customer?.username}</td>
                            </tr>
                            <tr>
                              <td>Nomor Handphone:</td>
                              <td>{customer?.phoneNumber}</td>
                            </tr>
                            <tr>
                              <td>Sisa durasi parkir:</td>
                              <td>{booking.duration} hari</td>
                            </tr>
                            <hr style={{ visibility: 'hidden' }} />
                          </React.Fragment>
                        );
                      })}
                      </tbody>
                    </table>
                  ) : (
                    <p>Belum ada penyewa</p>
                  )}
                </td>
              </tr>




              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentalList;
