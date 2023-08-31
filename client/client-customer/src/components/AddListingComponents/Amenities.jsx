import React from 'react';

const Amenities = () => {
  return (
    <div>
      <div className="listing-title">
        <span className="ti-gift"></span>
        <h4>Fasilitas</h4>
        <p>Pilih lebih dari satu fasilitas apa saja yang tersedia</p>
      </div>

      <div className="row">
        <div className="col-md-4 responsive-wrap">
          <div className="md-checkbox">
            <input id="i1" type="checkbox" />
            <label htmlFor="i1">Tenaga keamanan 24 jam</label>
          </div>
        </div>
        <div className="col-md-4 responsive-wrap">
          <div className="md-checkbox">
            <input id="i2" type="checkbox" />
            <label htmlFor="i2">Wifi gratis</label>
          </div>
        </div>
        <div className="col-md-4 responsive-wrap">
          <div className="md-checkbox">
            <input id="i3" type="checkbox" />
            <label htmlFor="i3">Atap tertutup</label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 responsive-wrap">
          <div className="md-checkbox">
            <input id="i4" type="checkbox" />
            <label htmlFor="i4">Atap terbuka</label>
          </div>
        </div>
        <div className="col-md-4 responsive-wrap">
          <div className="md-checkbox">
            <input id="i5" type="checkbox" />
            <label htmlFor="i5">No smoking</label>
          </div>
        </div>
        <div className="col-md-4 responsive-wrap">
          <div className="md-checkbox">
            <input id="i6" type="checkbox" />
            <label htmlFor="i6">Lantai semen atau lebih baik</label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 responsive-wrap">
          <div className="md-checkbox">
            <input id="i7" type="checkbox" />
            <label htmlFor="i7">Lantai tanah</label>
          </div>
        </div>
        <div className="col-md-4 responsive-wrap">
          <div className="md-checkbox">
            <input id="i8" type="checkbox" />
            <label htmlFor="i8">Menjual minuman/makanan</label>
          </div>
        </div>
        <div className="col-md-4 responsive-wrap">
          <div className="md-checkbox">
            <input id="i9" type="checkbox" />
            <label htmlFor="i9">Rantai penghalang per 1 mobil</label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 responsive-wrap">
          <div className="md-checkbox">
            <input id="i11" type="checkbox" />
            <label htmlFor="i11">Terdapat pagar dan gerbang</label>
          </div>
        </div>
        <div className="col-md-4 responsive-wrap">
          <div className="md-checkbox">
            <input id="i12" type="checkbox" />
            <label htmlFor="i12">Lokasi bebas banjir</label>
          </div>
        </div>
        <div className="col-md-4 responsive-wrap">
          <div className="md-checkbox">
            <input id="i13" type="checkbox" />
            <label htmlFor="i13">Jasa tambahan cuci mobil</label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="btn-wrap btn-wrap2">
            <a href="#" className="btn btn-simple">SUBMIT LISTING</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Amenities;
