import React from 'react';

const ThankYouListing = () => {
  return (
    <section className="main-block">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center min-height-block">
          <div className="col-md-12">
            <div className="confirmation-wrap">
              <span className="ti-check"></span>
              <h2>Thank you for your Listing</h2>
              <p>You'll receive a confirmation email at mail@yourgmail.com</p>
              <a href="#" className="btn btn-outline-danger btn-confirmation">CHECK INVOICE</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThankYouListing;
