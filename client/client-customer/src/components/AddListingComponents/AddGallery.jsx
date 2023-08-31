import React, { useState } from 'react';

const AddGallery = () => {
  const [file, setFile] = useState(null);

  const onFileChange = event => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="listing-title">
      <h4>Add Gallery</h4>
      <p>Write Something General Information About Your Listing</p>

      <div className="row">
        <div className="col-md-12">
          <div className="custom-file">
            <div className="add-gallery-text">
              <i className="ti-gallery"></i>
              <span>Drag &amp; Drop To Change Logo</span>
            </div>
            <input type="file" className="custom-file-input" id="customFile" onChange={onFileChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGallery;
