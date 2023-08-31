import React from 'react'
import ParkingSpacesTable from "../components/ParkingSpacesTable.jsx";

const ParkingSpaces = () => {
  return (
    <>
      <div>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Ini Halaman ParkingSpaces</h1>
        </div>
        <div className="cardTemplate">
          <ParkingSpacesTable />
        </div>
      </div>
    </>
  )
}

export default ParkingSpaces;
