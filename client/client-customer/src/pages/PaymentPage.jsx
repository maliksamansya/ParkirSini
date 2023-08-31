// import React from "react";

// const PaymentPage = () => {
//   const handlePayment = async () => {
//     try {
//       // Mengirimkan permintaan ke server untuk menghasilkan token pembayaran
//       const response = await fetch("http://localhost:3001/generate-token");
//       const redirectUrl = await response.text();

//       // Redirect ke halaman pembayaran Midtrans
//       window.location = redirectUrl;
//     } catch (error) {
//       console.error("Payment error:", error);
//       // Handle kesalahan pembayaran
//     }
//   };

//   return (
//     <div>
//       <h1>Halaman Pembayaran</h1>
//       <button onClick={handlePayment}>Bayar Sekarang</button>
//     </div>
//   );
// };

// export default PaymentPage;
