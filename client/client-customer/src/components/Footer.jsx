import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="main-block gray">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 responsive-wrap">
              <div className="location">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                <p>Jl. Soekarno-Hatta 42, Bandung</p>
              </div>
            </div>
            <div className="col-md-4 responsive-wrap">
              <div className="footer-logo_wrap">
                <img src="/images/footer-logo.png" alt="#" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-4 responsive-wrap">
              <ul className="social-icons">
                <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fa fa-envelope-o" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fa fa-phone" aria-hidden="true"></i></a></li>
              </ul>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="copyright">
                <p>Copyright © 2023 ParkirSini.com. All rights reserved</p>
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
