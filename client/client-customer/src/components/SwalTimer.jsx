import React, { useEffect } from 'react';
import swal from "sweetalert2";

const SwalTimer = ({msg}) => {
  useEffect(() => {
    let timerInterval;
    swal.fire({
      title: msg,
      html: '',
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        const span = swal.getHtmlContainer().querySelector('span');
        timerInterval = setInterval(() => {
          if(span) {
            span.textContent = swal.getTimerLeft();
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });
  }, []);

  return null;
};

export default SwalTimer;
