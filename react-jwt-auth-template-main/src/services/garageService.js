const BASE_URL = '/api';

// Garage Index
const index = async (userId) => {
    try {
      const res = await fetch(`${BASE_URL}/${userId}/garages`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      throw err;
    }
  };

// Garage show
const show = async (userId, garageId) => {
try {
    const res = await fetch(`${BASE_URL}/${userId}/garages/${garageId}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
    } catch (error) {
      throw err;
    }
};

// Garage create
const create = async (userId, formData) => {
    try {
      const res = await fetch(`${BASE_URL}/${userId}/garages/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return res.json();
    } catch (error) {
      throw err;
    }
  };

  // Car create
const createCar = async (userId, garageId, formData) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/garages/${garageId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (error) {
    throw err;
  }
};

// Car show
const carShow = async (userId, garageId, carId) => {
  try {
      const res = await fetch(`${BASE_URL}/${userId}/garages/${garageId}/${carId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
      } catch (error) {
          throw err;
      }
  };
  // Delete car
  const deleteCar = async (userId, garageId, carId) => {
    try {
      const res = await fetch(`${BASE_URL}/${userId}/garages/${garageId}/${carId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      throw err;
    }
  };

  // Update Car
  const updateCar = async (userId, garageId, carId, formData) => {
    try {
      const res = await fetch(`${BASE_URL}/${userId}/garages/${garageId}/${carId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return res.json();
    } catch (error) {
      throw err;
    }
  }


  // Car Comment Create
  const createCarComment = async (userId, garageId, carId, formData) => {
    try {
      const res = await fetch(`${BASE_URL}/${userId}/garages/${garageId}/${carId}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return res.json();
    } catch (error) {
      throw err;
    }
  };

  const deleteCarComment = async (userId, garageId, carId, commentId, formData) => {
    try {
      const res = await fetch(`${BASE_URL}/${userId}/garages/${garageId}/${carId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return res.json();
    } catch (error) {
      throw err;
    }
  };

  const updateCarComment = async (userId, garageId, carId, commentId, formData) => {
    try {
      const res = await fetch(`${BASE_URL}/${userId}/garages/${garageId}/${carId}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return res.json();
    } catch (error) {
      throw err;
    }
  };

  const deleteGarage = async (userId, garageId) => {
    try {
      const res = await fetch(`${BASE_URL}/${userId}/garages/${garageId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      throw err;
    }
  };

  const updateGarage = async (userId, garageId, formData) => {
    try {
      const res = await fetch(`${BASE_URL}/${userId}/garages/${garageId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return res.json();
    } catch (error) {
      throw err;
    }
  }

  export {
    index,
    show,
    create,
    createCar,
    carShow,
    deleteCar,
    updateCar,
    createCarComment,
    deleteCarComment,
    updateCarComment,
    deleteGarage,
    updateGarage
  }