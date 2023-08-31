import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LocalOfferSharpIcon from "@mui/icons-material/LocalOfferSharp";
import { fetchParkingSpacesDetail } from "../../store/actions/index.js";
import StarIcon from "@mui/icons-material/Star";
import { fetchParkingSpaceRelation } from "../../store/actions";
import swal from "sweetalert";

const Reserve = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isReady, setIsReady] = useState(false);
  const parkingSpace = useSelector((state) => state.detail.detail);
  const reviews = useSelector((state) => state.reviewDetail.reviewDetail);
  const relation = useSelector((state) => state.relation.relation);
  const baseURL = "http://localhost:3000";
  // const baseURL = "https://parkir-sini.maliksamansya.site";

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      : "belum ada ulasan";

  useEffect(() => {
    dispatch(fetchParkingSpaceRelation(parkingSpace.id));
  }, [dispatch, parkingSpace]);
  console.log(relation, "<<<<<<<<<< relasi di reserve");

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchParkingSpacesDetail(id));
      setTimeout(() => {
        setIsReady(true);
      }, 500);
    };

    fetchData();
  }, [dispatch, id]);

  const creteBooking = async () => {
    // const { amount, email, parkingSpaceId, price } = req.body
    try {
      const response = await fetch(`${baseURL}/booking/create-booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify({
          amount: parkingSpace.price,
          email: parkingSpace.Landlord?.email,
          parkingSpaceId: parkingSpace.id,
          price: parkingSpace.price,
        }),
      });
      if (response.ok) {
        console.log("---> reserve line 61", response);
        setTimeout(function () {
          // Kode yang akan dijalankan setelah jangka waktu tertentu
          navigate("/rented");
        }, 2000); // Waktu ditentukan dalam milidetik (dalam contoh ini, 2000 ms atau 2 detik)
        navigate("/thankyou-payment");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePayment = async () => {
    console.log("masukkk");

    try {
      // Mengirimkan permintaan ke server untuk menghasilkan token pembayaran
      const response = await fetch(`${baseURL}/booking/generate-midtrans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
        body: JSON.stringify({
          amount: parkingSpace.price,
          parkingSpaceId: parkingSpace.id,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data, "<<<<<<<<<<<<<<<");
        let cb = creteBooking;
        window.snap.pay(data.token, {
          onSuccess: function () {
            /* You may add your own implementation here */
            console.log("Succes bayar bos");
            cb();
          },
        });
      } else {
        console.log("error nih >>>>>>>>>:", response);
        if (response.statusText === "Unauthorized") {
          return swal("Error", "Silakan login terlebih dahulu.", "error");
        } else if (response.statusText === "Forbidden") {
          return swal("Error", "Mohon maaf tidak dapat order 2x", "error");
        } else if (!response.statusText) {
          return swal("Error", "Silakan login terlebih dahulu.", "error");
        }
      }
    } catch (error) {
      console.error("Payment error:", error);

      // Handle kesalahan pembayaran
    }
  };

  if (!isReady) {
    return <div></div>; // Return a loading state or component until the data is ready
  }

  return (
    <>
      <section className="reserve-block">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>{parkingSpace.name}</h5>
              <br />
              <p>
                <LocalOfferSharpIcon />{" "}
                <span>
                  Rp. {parkingSpace.price.toLocaleString("id-ID")}
                  <sub> / 30 hari</sub>
                </span>
              </p>
              <br />
              <p className="reserve-description">
                Lahan parkir tersedia:{" "}
                {parkingSpace.stock - relation.Bookings?.length}
              </p>
              <br />
              <p className="reserve-description">{parkingSpace.subtitle}</p>
            </div>
            <div className="col-md-6">
              <div className="reserve-seat-block">
                <div className="reserve-rating mx-0 mx-md-3">
                  <span>
                    {typeof averageRating === "number" ? (
                      <>
                        <StarIcon /> {averageRating}
                        <sub>/5</sub>
                      </>
                    ) : (
                      averageRating
                    )}
                  </span>
                </div>
                <div className="reserve-btn">
                  <div className="featured-btn-wrap">
                    <button
                      onClick={() => handlePayment(parkingSpace.id)}
                      className="btn btn-danger"
                    >
                      SEWA PARKIR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reserve;
