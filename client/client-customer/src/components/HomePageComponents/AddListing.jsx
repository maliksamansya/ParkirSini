import React from 'react';
import {Link} from "react-router-dom";

const AddListing = () => {
  return (
    <section className="main-block">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="titile-block">
              <h2>Jangkau Jutaan Orang</h2>
              <p>Bila punya lahan yang dapat disewakan, jadikan sebagai penghasilan tambahanmu</p>
            </div>
            <Link to="/empty">
              <div className="btn-wrap btn-wrap2">
                <a className="btn btn-simple" style={{ color: 'white' }}>Ayo mulai →</a>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddListing
