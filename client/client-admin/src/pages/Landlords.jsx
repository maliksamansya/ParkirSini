import React from 'react'
import LandlordsTable from "../components/LandlordsTable.jsx";

const Landlords = () => {
  return (
    <>
      <div>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Ini Halaman Landlords</h1>
        </div>
        <div className="cardTemplate">
          <LandlordsTable />
        </div>
      </div>
    </>
  )
}

export default Landlords
