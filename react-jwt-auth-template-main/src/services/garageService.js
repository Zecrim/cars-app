const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}`;


const index = async (userId) => {
    try {
      const res = await fetch(`${BASE_URL}/${userId}/garages`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

const show = async (userId, garageId) => {
try {
    const res = await fetch(`${BASE_URL}/${userId}/garages/${garageId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
    } catch (error) {
        console.log(error);
    }
};

const create = async (userId, formData) => {
    try {
        // console.log('userid: '+userId+' formdata '+formData)
        // console.log(`fetching to: ${BASE_URL}/${userId}/garages/`)
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
      console.log(error);
    }
  };

  export {
    index,
    show,
    create,
  }