import React from 'react'
import CustomerTable from "../components/CustomerTable.jsx";

const Customers = () => {
  return (
    <>
      <div>
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Ini Halaman Customers</h1>
        </div>
        <div className="cardTemplate">
          <CustomerTable />
        </div>
      </div>
    </>
  )
}

export default Customers;
