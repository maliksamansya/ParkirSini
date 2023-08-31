import React from 'react';
import { useNavigate } from 'react-router-dom';

const DetailedItem = () => {
  const navigate = useNavigate();

  return (
    <section className="main-block gray">
      <div className="container-fluid">

        <div className="row">
          <div className="col-md-6">

            <div className="grid">
              <figure className="effect-chico">
                <img src="https://cdn-images-1.medium.com/max/1000/1*V2DR9jxRNyhZKqqXPY1cSg.jpeg" alt="#" className="img-fluid" style={{ width: '100%', height: 'auto', marginTop: '10px', marginBottom: '10px' }} />
                <figcaption>
                  <div className="effect-caption-wrap">
                    <h2>Jakarta</h2>
                    {/*<p>1500+ Listings</p>*/}
                  </div>
                </figcaption>
              </figure>
            </div>

            <div className="grid">
              <figure className="effect-chico">
                <img src="https://i.misteraladin.com/blog/2019/07/08064709/Featured-image-patung-tetenger-Surabaya.jpg" alt="#" className="img-fluid" style={{ width: '100%', height: 'auto', marginTop: '60px', marginBottom: '10px' }} />
                <div className="effect-caption-wrap">
                  <h2>Surabaya</h2>
                  {/*<p>210+ Listings</p>*/}
                </div>
              </figure>
            </div>
          </div>

          <div className="col-md-6">
            <div className="grid">
              <figure className="effect-chico">
                <img src="https://img.antaranews.com/cache/730x487/2019/03/17/downloadfile.jpg.webp" alt="#" className="img-fluid" style={{ width: '100%', height: 'auto', marginTop: '10px', marginBottom: '10px' }} />
                <div className="effect-caption-wrap">
                  <h2>Bekasi</h2>
                  {/*<p>800+ Listings</p>*/}
                </div>
              </figure>
            </div>

            <div className="grid">
              <figure className="effect-chico">
                <img src="https://asset.kompas.com/crops/EW631WvubI3Nt_G43zyg8ZIAbRA=/3x0:744x494/750x500/data/photo/2020/11/20/5fb727a581578.png" alt="#" className="img-fluid" style={{ width: '100%', height: 'auto', marginTop: '60px', marginBottom: '10px' }} />
                <div className="effect-caption-wrap">
                  <h2>Bandung</h2>
                  {/*<p>800+ Listings</p>*/}
                </div>
              </figure>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default DetailedItem;
