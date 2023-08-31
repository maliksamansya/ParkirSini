import { Link, useNavigate } from "react-router-dom";

function ParkingSpaceCard({ park }) {
  const navigate = useNavigate();

  function goToDetail() {
    navigate(`/detail/${park.id}`);
  }
  return (
    <>
      <div className="col-md-4 card-2">
        <div className="card">
          <img
            className="card-img-top"
            src={park.mainImg}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{park.name}</h5>
            <ul className="card-rating">
              <li>5.0</li>
              <li>62 ratings</li>
            </ul>
            <p className="card-text">{park.description}</p>
            <div className="card-bottom">
              <p>
                <i className="ti-location-pin"></i>
                {park.city}
              </p>
            </div>
            <button onClick={goToDetail} className="btn btn-outline-primary">
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ParkingSpaceCard;
