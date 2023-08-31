import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {fetchCustomers, fetchParkingSpaceRelation} from "../store/actions/index.js";
import {useDispatch, useSelector} from "react-redux";

const About = () => {
  // const relation = useSelector((state) => state.relation.relation);
  // const dispatch = useDispatch();
  // const [isReady, setIsReady] = useState(false);
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await dispatch(fetchParkingSpaceRelation(id));
  //     await dispatch(fetchCustomers());
  //     setTimeout(() => {
  //       setIsReady(true);
  //     }, 500);
  //   };
  //
  //   fetchData();
  // }, [dispatch, id]);
  //
  // if (!relation || !isReady) {
  //   return <div></div>;
  // }
  // console.log(relation)
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="titile-block title-block_subpage text-center mb-4">
            <h2>Tentang Kami</h2>
            {/*<h4>Saldo pemilik lahan: Rp. {relation.Landlord.amount.toLocaleString('id-ID')}</h4>*/}
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-4 text-center mb-5">
          <img src="images/clip2.jpg" alt="lahan parkir mobil" style={{ width: "100%", marginBottom: '20px' }} />
          <p>Parkirsini adalah perusahaan teknologi Indonesia dengan misi menurunkan perselisihan sosial dan terganggunya ketertiban umum dikarenakan penggunaan lahan yang tidak sesuai peruntukannya. Selain itu juga membuka lapangan usaha baru dan memberdayakan lahan-lahan tidur atau lahan tidak terpakai agar memiliki nilai tambah kepada masyarakat.</p>

          <p>Memudahkan rekan-rekan pemilik usaha penyewaan lahan parkir dalam melihat data penyewaan lahan parkirnya, sehingga waktu dan fokus pikirannya dapat digunakan kepada kegiatan yang lain.</p>
        </div>

        <div className="col-md-4 text-center mb-5">
          <p>Dengan kehadiran Parkirsini, masyarakat yang membutuhkan lahan parkir bagi keperluan tetap maupun keperluan sementara bisa mendapatkan solusi secara cepat dan mendapatkan harga yang transparan.</p>

          <img src="images/clip1.jpg" alt="memajukan umkm" style={{ width: "100%" }} />



          <p>Dengan adanya orang yang menyewa lahan parkir secara tetap untuk durasi yang cukup panjang, membuka peluang usaha bagi UMKM untuk memperluas pemasaran produk dan jasa yang dimiliki. Usaha makanan kecil, cuci mobil, merupakan contoh usaha yang sering dijumpai di tempat penitipan kendaraan diharapkan tumbuh bersama mitra-mitra pemilik lahan parkir.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
