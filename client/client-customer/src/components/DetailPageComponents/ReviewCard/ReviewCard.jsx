function ReviewCard() {
  return (
    <>
      <div className="customer-review_wrap">
        <div className="customer-img">
          <img src="images/customer-img1.jpg" className="img-fluid" alt="#" />
          <p>Amanda G</p>
          <span>35 Reviews</span>
        </div>
        <div className="customer-content-wrap">
          <div className="customer-content">
            <div className="customer-review">
              <h5>Best noodles in the Newyork city</h5>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span className="round-icon-blank"></span>
              <p>Reviewed 2 days ago</p>
            </div>
            <div className="customer-rating">8.0</div>
          </div>
          <p className="customer-text">
            I love the noodles here but it is so rare that I get to come here.
            Tasty Hand-Pulled Noodles is the best type of whole in the wall
            restaurant. The staff are really nice, and you should be seated
            quickly. I usually get the hand pulled noodles in a soup. House
            Special #1 is amazing and the lamb noodles are also great. If you
            want your noodles a little chewier, get the knife cut noodles, which
            are also amazing. Their dumplings are great dipped in their chili
            sauce.{" "}
          </p>
          <p className="customer-text">
            I love how you can see into the kitchen and watch them make the
            noodles and you can definitely tell that this is a family run
            establishment. The prices are are great with one dish maybe being
            $9. You just have to remember to bring cash.
          </p>
          <ul>
            <li>
              <img src="images/review-img1.jpg" className="img-fluid" alt="#" />
            </li>
            <li>
              <img src="images/review-img2.jpg" className="img-fluid" alt="#" />
            </li>
            <li>
              <img src="images/review-img3.jpg" className="img-fluid" alt="#" />
            </li>
          </ul>
          <span>28 people marked this review as helpful</span>
          <a href="#">
            <span className="icon-like"></span>Helpful
          </a>
        </div>
      </div>
      <hr />
    </>
  );
}

export default ReviewCard;
