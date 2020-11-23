import axios from 'axios';

import { formatResponse, verifyToken, convertImageToBase64 } from '../utils';

const apiKey = 'AIzaSyAGQtn7z7nfZVPKzx6Mf_Mkgyw2wo-Lhr8';
const endpointAuth = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
const endpointProducts = 'https://test-lucas-594ea.firebaseio.com';

// Hace la llamada a la api y devuelve el token y la fecha de expiración
const login = async (email, password) => {
  const response = await axios.post(endpointAuth, {
    email,
    password,
    returnSecureToken: true
  });
  const expiresIn = (new Date() / 1000) + Number(response.data.expiresIn);
  return { token: response.data.idToken, expiresIn };
}

// Obtiene los productos, lo formatea y lo devuelve para mostrarlo en la tabla
const getProducts = async () => {
  const token = localStorage.getItem('token') || '';
  let productsFormated = [];
  if(verifyToken(token)) {
    const response = await axios.get(`${endpointProducts}/products.json?auth=${token}`);
    productsFormated = formatResponse(response);
  }
  return productsFormated;
}

// Guarda el producto en la base de datos
const postProducts = async data => {
  const token = localStorage.getItem('token') || '';
  delete data.newImage;
  if(verifyToken(token)) {
    const imgBase64 = data.img ? await convertImageToBase64(data.img) : data.img;
    await axios.post(`${endpointProducts}/products.json?auth=${token}`, {
      ...data,
      img: imgBase64
    });
  }
}

// Hace una peticion PATH para actualizar el producto
const updateProducts = async (data, id) => {
  const token = localStorage.getItem('token') || '';
  if(verifyToken(token)) {
    const imgBase64 = data.newImage ? await convertImageToBase64(data.img) : data.img;
    delete data.newImage;
    await axios.patch(`${endpointProducts}/products/${id}.json?auth=${token}`, {
      ...data,
      img: imgBase64
    });
  }
}

// Borra el producto de la base de datos
const deleteProducts = async id => {
  const token = localStorage.getItem('token') || '';
  if(verifyToken(token)) {
    await axios.delete(`${endpointProducts}/products/${id}.json?auth=${token}`);
  }
}

export {
  getProducts,
  postProducts,
  updateProducts,
  deleteProducts,
  login
};