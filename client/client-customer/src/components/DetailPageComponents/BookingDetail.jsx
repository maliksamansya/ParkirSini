import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageSlider from "./ImageSlider.jsx";
import MapComponent from "../MapComponent.jsx";
import {
  addParkingSpaceReview,
  fetchParkingSpaceRelation,
  fetchParkingSpacesDetail,
} from "../../store/actions/index.js";
import Talk from "talkjs";
import { Rating } from "@mui/material";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-identicon-sprites";
import { useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const BookingDetail = () => {
  const dispatch = useDispatch();
  const parkingSpace = useSelector((state) => state.detail.detail);
  const reviews = useSelector((state) => state.reviewDetail.reviewDetail);
  const { id } = useParams();
  const [isReady, setIsReady] = useState(false);
  const facilities = useSelector(
    (state) => state.facilityDetail.facilityDetail
  );
  const relation = useSelector((state) => state.relation.relation);
  // console.log(reviews);
  // console.log(facilities)
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchParkingSpaceRelation(id));
      setTimeout(() => {
        setIsReady(true);
      }, 500);
    };

    fetchData();
  }, [dispatch, id]);

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handlePublishReview = () => {
    // Check if the rating and review text meet the minimum requirements
    if (rating === 0 || reviewText.length < 10) {
      alert("Minimal 10 karakter untuk melakukan review.");
      return;
    }

    // Dispatch an action to submit the review
    dispatch(addParkingSpaceReview(parkingSpace.id, reviewText, rating));

    // Clear the rating and review text inputs
    setRating(0);
    setReviewText("");
  };

  const getAvatarUrl = (id) => {
    return createAvatar(style, { seed: id.toString() });
  };

  const getInitials = (name) => {
    const parts = name.split(" ");
    let initials = "";
    if (parts.length > 1) {
      initials = parts[0][0] + parts[parts.length - 1][0];
    } else if (parts.length === 1) {
      initials = parts[0][0];
    }
    return initials.toUpperCase();
  };

  //////////////// TALK JS START /////////////////
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));
  }, []);

  const sendMessage = () => {
    if (talkLoaded) {
      const currentUser = new Talk.User({
        id: "4", // <-- customerId from access_token
        name: "Benzema",
        email: "ronaldo@example.com",
        photoUrl: "https://shorturl.at/avJM3",
        role: "default",
      });

      const otherUser = new Talk.User({
        id: relation.Landlord.id + 30,
        name: relation.Landlord?.username,
        email: relation.Landlord.email,
        welcomeMessage: `Selamat datang di ${relation.name}. Terimakasih sudah menghubungi kami, akan kami reply segera. Tunggu ya...`,
        photoUrl: "https://shorturl.at/avJM3",
        role: "default",
      });

      const session = new Talk.Session({
        appId: "tgKqA2yS",
        me: currentUser,
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createChatbox(conversation);
      chatbox.mount(chatboxEl.current);
    }
  };
  ///////////////// TALK JS END ////////////////////
  if (!relation || !isReady) {
    return <div></div>;
  }
  console.log(reviews);
  return (
    <>
      <section className="gray-dark booking-details_wrap" ref={chatboxEl}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 responsive-wrap">
              <div className="booking-checkbox_wrap">
                <ImageSlider relation={relation} parkingSpace={parkingSpace} />

                <div className="booking-checkbox">
                  <p>{parkingSpace.description}</p>
                  <hr />
                </div>
                <h3>Fasilitas:</h3>
                <br />
                <div className="row">
                  {/* Check if FacilityParkings exists */}
                  {relation.FacilityParkings &&
                    relation.FacilityParkings.map((facilityParking) => {
                      // Find the corresponding facility using facilityId
                      const facility = facilities.find(
                        (f) => f.id === facilityParking.facilityId
                      );
                      if (!facility) return null; // Handle case when facility is not found
                      return (
                        <div className="col-md-4" key={facility.id}>
                          <label className="custom-checkbox">
                            <span className="custom-control-description">
                              <CheckCircleIcon /> {facility.name}
                            </span>
                          </label>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="booking-checkbox_wrap booking-your-review">
                <h5>Beri ulasan untuk lahan parkir ini</h5>
                <hr />
                <div className="customer-review_wrap">
                  <div className="customer-content-wrap">
                    <div>
                      <span></span>
                      <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                          setRating(newValue);
                        }}
                      />

                      {/*<div className="customer-review">*/}
                      {/*  <input*/}
                      {/*    type="radio"*/}
                      {/*    name="rating"*/}
                      {/*    value="1"*/}
                      {/*    checked={rating === 1}*/}
                      {/*    onChange={handleRatingChange}*/}
                      {/*  />*/}
                      {/*  <input*/}
                      {/*    type="radio"*/}
                      {/*    name="rating"*/}
                      {/*    value="2"*/}
                      {/*    checked={rating === 2}*/}
                      {/*    onChange={handleRatingChange}*/}
                      {/*  />*/}
                      {/*  <input*/}
                      {/*    type="radio"*/}
                      {/*    name="rating"*/}
                      {/*    value="3"*/}
                      {/*    checked={rating === 3}*/}
                      {/*    onChange={handleRatingChange}*/}
                      {/*  />*/}
                      {/*  <input*/}
                      {/*    type="radio"*/}
                      {/*    name="rating"*/}
                      {/*    value="4"*/}
                      {/*    checked={rating === 4}*/}
                      {/*    onChange={handleRatingChange}*/}
                      {/*  />*/}
                      {/*  <input*/}
                      {/*    type="radio"*/}
                      {/*    name="rating"*/}
                      {/*    value="5"*/}
                      {/*    checked={rating === 5}*/}
                      {/*    onChange={handleRatingChange}*/}
                      {/*  />*/}
                      {/*</div>*/}
                    </div>
                    <div className="your-comment-wrap">
                      <textarea
                        name="#"
                        className="your-rating-content"
                        placeholder="Berikan komentarmu"
                        value={reviewText}
                        onChange={handleReviewTextChange}
                      ></textarea>
                      <h6 className="your-rating-notify">
                        minimal 10 karakter
                      </h6>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="your-rating-btn">
                          <button
                            className="btn btn-danger btn-block"
                            onClick={handlePublishReview}
                          >
                            Kirim Ulasan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="booking-checkbox_wrap my-4">
                <h4>{reviews.length} Ulasan</h4>
                <hr />
                {reviews.map((review) => (
                  <div className="customer-review_wrap" key={review.id}>
                    {/*  <div className="customer-img">*/}
                    {/*  /!*  <div dangerouslySetInnerHTML={{__html: getAvatarUrl(review.Customer?.id)}} />*!/*/}

                    {/*  <div className="avatar" style={{background: '#'+Math.floor(Math.random()*16777215).toString(16)}}>*/}
                    {/*    {getInitials(review.Customer?.username)}*/}
                    {/*  </div>*/}
                    {/*</div>*/}

                    <div
                      className="customer-img"
                      style={{
                        position: "relative",
                        width: "100px",
                        height: "100px",
                      }}
                    >
                      <div
                        className="avatar"
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: "90%",
                          height: "90%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "50px",
                          background:
                            "#" +
                            Math.floor(Math.random() * 16777215).toString(16),
                        }}
                      >
                        {getInitials(review.Customer?.username)}
                      </div>
                    </div>

                    <div className="customer-content-wrap">
                      <div className="customer-content">
                        <div className="customer-review">
                          <h5>{review.Customer?.username} </h5>
                        </div>
                        <div className="customer-rating customer-rating-red">
                          {review.rating}
                        </div>
                      </div>
                      <p className="customer-text">{review.review}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-4 responsive-wrap">
              <div className="contact-info">
                <MapComponent
                  latitude={parkingSpace.mapLong}
                  longitude={parkingSpace.mapLat}
                />
                {/*{parkingSpace.mapLat}*/}
                {/*{parkingSpace.mapLong}*/}
                <div className="address">
                  <span className="icon-location-pin"></span>
                  <p>{parkingSpace.city}</p>
                </div>
                <div className="address">
                  <span className="icon-screen-smartphone"></span>
                  <p>Pemilik: {relation.Landlord?.username}</p>
                  <p>
                    {relation.Landlord ? relation.Landlord.phoneNumber : ""}
                  </p>
                </div>
                <div className="address">
                  <span className="icon-clock"></span>
                  <p>Senin - Minggu</p>
                  <p>00:00 am - 23:59 pm </p>
                  <a href="#" className="featured-open">
                    OPEN NOW
                  </a>
                </div>
                <a
                  type="button"
                  onClick={sendMessage}
                  className="btn btn-outline-danger btn-contact"
                  data-bs-toggle="modal"
                  data-bs-target="#modalTalkJsResa"
                >
                  Chat Pemilik Lahan
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="modalTalkJsResa"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title fs-5" id="exampleModalLabel">
                Send A Message
              </h4>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                X
              </button>
            </div>
            <div className="modal-body">
              <div ref={chatboxEl} style={{ height: "80vh" }} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetail;
