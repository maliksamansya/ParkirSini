// const baseURL = "https://parkir-sini.maliksamansya.site"
const baseURL = "http://localhost:3000"


// parkir-sini.maliksamansya.site
export const fetchParkingSpaces = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}/parkingSpace`)
      const data = await response.json()
      const action = {
        type: "parkingSpace/fetch",
        payload: data
      }
      dispatch(action)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}

export const fetchCustomers = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}/pub/customers`)
      const data = await response.json()
      const action = {
        type: "customers/fetch",
        payload: data
      }
      dispatch(action)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}

export const fetchReviewDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}/review/` + id)
      const data = await response.json()
      const action = {
        type: "reviewDetail/fetch",
        payload: data
      }
      dispatch(action)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}

export const fetchFacilityDetail = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}/owner/facility/`)
      const data = await response.json()
      const action = {
        type: "facilityDetail/fetch",
        payload: data
      }
      dispatch(action)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}

export const fetchParkingSpaceRelation = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}/pub/spaces/` + id)
      const data = await response.json()
      const action = {
        type: "facilityParkingSpaceRelation/fetch",
        payload: data
      }
      dispatch(action)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}

export const fetchParkingSpacesByLandlord = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${baseURL}/owner/spaces`, {
        headers: {
          'Content-Type': 'application/json',
          'access_token': `${token}`
        },
      });

      const data = await response.json();
      const action = {
        type: "parkingSpaceByLandlord/fetch",
        payload: data,
      };

      console.log(response);
      dispatch(action);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};


export const fetchParkingSpacesDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}/parkingSpace/` + id)
      const data = await response.json()
      const action = {
        type: "parkingSpaceDetail/fetch",
        payload: data
      }
      dispatch(action)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}

// export const addParkingSpaces = (name, subtitle, description, city, stock, mapLong, mapLat, price, mainImg, images, facilities) => {
export const addParkingSpaces = (name, subtitle, description, city, stock, mapLong, mapLat, price, images, facilities) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("access_token");
      // console.log('---> ini di actions 491', name, subtitle, description, city, stock, mapLong, mapLat, price, images, facilities)

      const formData = new FormData();
      formData.append('name', name);
      formData.append('subtitle', subtitle);
      formData.append('description', description);
      formData.append('city', city);
      formData.append('stock', stock);
      formData.append('mapLong', mapLong);
      formData.append('mapLat', mapLat);
      formData.append('price', price);

      images.forEach((image) => {
        formData.append('images', image);
      });

      facilities.forEach((facility) => {
        formData.append('facilities', facility);
      });


      // formData.append('facilities', JSON.stringify(facilities));


      // console.log('---> ini di actions 510', formData)

      const response = await fetch(`${baseURL}/admin/parking-space-transaction`, {
        method: 'POST',
        headers: {
          'access_token': `${token}`
        },
        body: formData
        // body: formData,
      });

      // console.log('---> ini di actions 518', formData)
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }

      console.log(response);
      const data = await response.json();
      console.log(data);

      dispatch(fetchParkingSpacesByLandlord());

    } catch (error) {
      console.log(error);
    }
  };
};


export const addParkingSpaceReview = (parkingSpaceId, review, rating) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${baseURL}/review/` + parkingSpaceId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access_token': `${token}`
        },
        body: JSON.stringify({
          review, rating
        }),
      })
      console.log(response)
      const data = await response.json();
      console.log(data);

      dispatch(fetchReviewDetail(parkingSpaceId))

    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchLandlords = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}/landlords`)
      const data = await response.json()
      const action = {
        type: "landlords/fetch",
        payload: data
      }
      dispatch(action)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}

export const fetchSaldo = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${baseURL}/admin/landlord-data`, {
        headers: {
          'Content-Type': 'application/json',
          'access_token': `${token}`
        },
      });
      const data = await response.json();
      const action = {
        type: "saldo/fetch",
        payload: data
      };
      dispatch(action);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};


export const fetchLandlordDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}/landlords/` + id)
      const data = await response.json()
      const action = {
        type: "landlordDetail/fetch",
        payload: data
      }
      dispatch(action)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}

export const updateParkingSpace = (landlordId, parkingSpaceId, customerId, newStatus, phoneNumber) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}/landlords/${landlordId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parkingSpaces: {
            [parkingSpaceId]: {
              status: newStatus
            }
          },
          phoneNumber
        })
      });

      // Assuming you have a fetchLandlords() action to update the landlords data
      dispatch(fetchLandlords());
    } catch (error) {
      console.log(error);
    }
  };
};


export const newLandlord = (email, password, username, phoneNumber, address) => {

  return async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}/admin/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          username,
          phoneNumber,
          address
        }),
      })
      if (!response.ok)
        console.log(response)
      dispatch(fetchLandlords())

    } catch (error) {
      console.log(error)
    }
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        const access_token = data.access_token;
        localStorage.setItem('access_token', access_token);
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid email or password' });
      }

    } catch (error) {
      console.log(error);
    }
  };
};

export const loginCustomer = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}/pub/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        const access_token = data.access_token;
        localStorage.setItem('access_token', access_token);
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid email or password' });
      }

    } catch (error) {
      console.log(error);
    }
  };
};


export const registerCustomer = (email, password, username, phoneNumber, address) => {

  return async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}/pub/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          username,
          phoneNumber,
          address
        }),
      })
      if (response.ok) {
        const data = await response.json();
        console.log(data, "<<<<<<<< new customer")

      } else {
        throw new Error("Internal Server Error");
      }

    } catch (error) {
      console.log(error)
    }
  }
}

export const getBookingByCustomerId = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}/booking/bookingByCustomerId`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.access_token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data, "<<<<<<<< bookingss")
        // const access_token = data.access_token;
        // localStorage.setItem('access_token', access_token);
        dispatch({ type: 'booking/fetch', payload: data.bookings });
      } else {
        throw new Error("Internal Server Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchParkingSpacesImages = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseURL}/admin/parking-space/` + id)
      const data = await response.json()
      const action = {
        type: "parkingSpaceImages/fetch",
        payload: data
      }
      dispatch(action)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
}

