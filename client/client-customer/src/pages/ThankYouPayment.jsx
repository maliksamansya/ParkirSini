import React from 'react';

const ThankYouPayment = () => {
  return (
    <section className="main-block">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center min-height-block">
          <div className="col-md-12">
            <div className="confirmation-wrap">
              <span className="ti-check"></span>
              <h2>Terimakasih karena telah melakukan pembayaran...</h2>
              <p>Akan dikirimkan bukti pembayarannya melalui emailmu</p>
              <a href="#" className="btn btn-outline-danger btn-confirmation">CHECK INVOICE</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThankYouPayment;
