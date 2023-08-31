import React from "react";
import {Link} from "react-router-dom";

function EmptyPage() {
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="titile-block title-block_subpage text-center mb-4">
              <h2>Hai, Selamat Datang Di Parkirsini</h2>
              {/*<h4>Saldo pemilik lahan: Rp. {relation.Landlord.amount.toLocaleString('id-ID')}</h4>*/}
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-4 text-center mb-5 btn">
            <h3>Penyewa Lahan</h3>
            <p></p>
            <Link
              to={`/regCustomer`}
              className="btn-primary"
              style={{ marginTop: '40px', marginBottom: '40px' }}
            >
              MULAI
            </Link>
            <p></p>
            <img src="images/clip4.jpg" alt="lahan parkir mobil" style={{ width: "100%"}} />

          </div>

          <div className="col-md-4 text-center mb-5">
            <h3>Pemilik Lahan Parkir</h3>
            <p></p>
            <Link to={`/reg`} className="btn-primary">MULAI
            </Link>
            <p></p>
            <img src="images/clip3.jpg" alt="memajukan umkm" style={{ width: "100%" }} />

          </div>
        </div>
      </div>
    </>
  );
}

export default EmptyPage;
