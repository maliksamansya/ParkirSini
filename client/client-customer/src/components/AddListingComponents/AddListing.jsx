import React from 'react'
import GeneralInformation from "./GeneralInformation.jsx";
import AddLocation from "./AddLocation.jsx";
import AddGallery from "./AddGallery.jsx";
import Amenities from "./Amenities.jsx";

const AddListing = () => {
  return (
    <>
      <section className="main-block">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="listing-wrap">
                <form action="#">

                  <GeneralInformation />
                  <AddLocation />
                  <AddGallery />
                  <Amenities />

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddListing
