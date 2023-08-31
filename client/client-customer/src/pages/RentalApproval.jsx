import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateParkingSpace } from '../store/actions';
import Logout from "../components/Logout.jsx";

const RentalApproval = () => {
  const [consumerName, setConsumerName] = useState('');
  const [approvalStatus, setApprovalStatus] = useState('');
  const dispatch = useDispatch();

  const handleApproval = () => {
    const landlordId = 1; // Replace with the actual landlord ID
    const parkingSpaceId = 1; // Replace with the actual parking space ID
    const customerId = 1
    const status = 'Approved';
    const newPhone = '123123'
    dispatch(updateParkingSpace(landlordId, parkingSpaceId, customerId,status, newPhone ));
  };

  return (
    <>
      <div className="container-fluid" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <Logout />
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="titile-block title-block_subpage">
              <h2>Rental Approval</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <tbody>
              <tr>
                <td>Rating</td>
                <td>4.5</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>Dukom Car Park</td>
              </tr>
              <tr>
                <td>Image</td>
                <td>
                  <div style={{ width: '50%' }}>
                    <img src="images/article-img1.jpg" alt="#" className="img-fluid" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>Description</td>
                <td>
                  <p>
                    Tempat paling aman dan bersih, sudah pakai eskalator mobil guys! Mobil bagusmu akan merasa nyaman di sini.
                  </p>
                </td>
              </tr>
              <tr>
                <td>Approval</td>
                <td style={{ verticalAlign: 'middle' }}>
                  <p>{consumerName}</p>
                  {approvalStatus !== 'Approved' && (
                    <button className="btn btn-primary" onClick={handleApproval}>
                      Setujui
                    </button>
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

export default RentalApproval;
