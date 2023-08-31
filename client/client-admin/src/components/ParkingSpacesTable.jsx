import React, { useEffect, useState } from 'react';

const ParkingSpacesTable = () => {
  const [users, setUsers] = useState([
    { id: 1, email: 'example1@example.com', phoneNumber: '123-456-7890', address: '123 Example Street' },
    { id: 2, email: 'example2@example.com', phoneNumber: '987-654-3210', address: '456 Example Avenue' },
    // add more users as needed
  ]);

  return (
    <table className="table table-striped">
      <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Email</th>
        <th scope="col">Phone Number</th>
        <th scope="col">Address</th>
        <th scope="col">tabelnya ParkingSpaces</th>
      </tr>
      </thead>
      <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <th scope="row">{user.id}</th>
          <td>{user.email}</td>
          <td>{user.phoneNumber}</td>
          <td>{user.address}</td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default ParkingSpacesTable
