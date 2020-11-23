// Recibe el error de firebase y lo formatea.
const formatError = error => {
  let message = '';
  switch (error) {
    case 'EMAIL_NOT_FOUND':
      message = 'Email Incorrecto';
      break;
    case 'INVALID_PASSWORD':
      message = 'Contraseña Incorrecta';
      break;
    case 'USER_DISABLED':
      message = 'La cuenta está deshabilitada';
      break;
    default:
      break;
  }
  return message;
}

// Formatea la respuesta porque el ID viene como llave
const formatResponse = response => {
  let formated = [];
  if(response.data){
    formated = Object.entries(response.data).map(item => ({ ...item[1], id: item[0] }));
  }
  return formated;
};

// Verifica que el  token no esté expirado
const checkExpiredToken = () => (new Date() / 1000) < localStorage.getItem('expiresIn');

const verifyToken = token => {
  if(token && checkExpiredToken()) {
    return true;
  } else {
    throw new Error('No hay token o el token ha expirado');
  }
}

//Recibe la imagen y la codifica a Base64 para guardarlo en la base de datos.
const convertImageToBase64 = img => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(img)
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
}

export {
  formatError,
  formatResponse,
  checkExpiredToken,
  verifyToken,
  convertImageToBase64
}