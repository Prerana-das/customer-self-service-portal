import { baseURL } from "../constants";
import commonToast from '../Utilities/CommonToast';
import axios from "axios"; 

export const request = {};

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

request.get = async (path, params = {}) => {
  let response = await axios.get(baseURL + path + new URLSearchParams(params));
  if (response.status === 200 || response.status === 201) {
    return response.data;
  } else {
    return false;
  }
};

request.post = async (path, params) => {
  try {
    let response = await axios.post(baseURL + path, params, {
        headers: {
            "Content-Type": "multipart/form-data",
            accept: "application/json",
        },
    });
    return response.data;

  } catch (error) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.values(errors).forEach((fieldErrors) => {
            fieldErrors.forEach((message) => {
                commonToast.error(message);
            });
        });
    }
    else{
      commonToast.error('An error occurred. Please try again.');
    }
  }
};

request.requestJsonPost = async (path, params) => {
  try {
    let response = await axios.post(baseURL + path, params, {
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
    });
    return response.data;

  } catch (error) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.values(errors).forEach((fieldErrors) => {
            fieldErrors.forEach((message) => {
                commonToast.error(message);
            });
        });
    }
    else{
      commonToast.error('An error occurred. Please try again.');
    }
  }
};


request.put = async (path, params) => {
  try {
    let response = await axios.put(baseURL + path, params, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });

    return response.data;
    
  }catch (error) {
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors;
      for (const errorMessage of Object.values(errors)) {
          return commonToast.error(errorMessage);
      }
    }
    else{
      commonToast.error('An error occurred. Please try again.');
    }
  }
};

request.delete = async (path, params) => {
  let response = await axios.delete(baseURL + path, params, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });
  return await response.data;
};


request.getAll = async (path) => {
  let response = await axios.get(baseURL + path);

  if (response.status === 200 || response.status === 201) {
    return response.data;
  } else {
    return false;
  }
};
