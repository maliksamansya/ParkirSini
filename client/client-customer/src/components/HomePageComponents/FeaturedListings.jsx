import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchParkingSpaces } from "../../store/actions/index.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotesIcon from "@mui/icons-material/Notes";
const FeaturedListings = () => {
  const parkingSpaces = useSelector((state) => state.data.data);
  const reviews = useSelector((state) => state.reviewDetail.reviewDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchParkingSpaces());
  }, [dispatch]);
  console.log(parkingSpaces, ">>>>>>>>>>>>>>>>>");
  return (
    <section className="main-block featured-wrap">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <div className="title-block">
              <h2>Daftar Lahan Parkir Tersedia</h2>
              {/*<p>Tempat parkir dengan rating tinggi di sini</p>*/}

            </div>
          </div>
        </div>
        <br />

        <div className="row">
          {parkingSpaces.map((parkingSpace) => (
            <div
              className="col-md-6 col-lg-3 article-first"
              key={parkingSpace.id}
            >
              <div className="news-block">
                <img
                  src={parkingSpace.mainImg}
                  alt={parkingSpace.name}
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <div className="news-title">
                  <h5>{parkingSpace.name}</h5>

                  <p className="blog2-thumbnail-name ellipsis">{parkingSpace.subtitle}</p>

                  <hr />
                  <p className="blog2-thumbnail-name ellipsis">{parkingSpace.description}</p>
                  <p className="blog2-thumbnail-name"><LocationOnIcon /><span> {parkingSpace.city}</span></p>

                  <br />
                  <Link
                    to={`/detail/${parkingSpace.id}`}
                    className="btn-primary"
                  >
                    Lihat
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
