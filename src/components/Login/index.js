import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Alert, Container, Row, Col, Form, Button } from 'react-bootstrap';

import { login } from '../../services';
import { formatError } from '../../utils';

const Login = () => {
  // Hook del react-router para el uso del historial
  const history = useHistory();
  // Hook de estado para el formulario
  const [ data, setData ] = useState({ email: '', password: '' });
  // Hook de estado para las alertas de errores
  const [ error, setError ] = useState(null);

  const onChange = e => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const auth = async () => {
    const { email, password } = data;
    // Verifica que los campos no esten vacíos para poder hacer la llamada a la API
    if(email !== '' && password !== ''){
      try {
        //Llama a la funcion login la cual hace la llamada a la API para iniciar sesión
        const response = await login(email, password);
        // una vez que termina guarda el token y la fecha de la expiración en el localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('expiresIn', response.expiresIn);
        //Redirecciona a la pagina principal
        history.push('/');
      } catch (e) {
        //Si captura algun error y es del firebase, lo formatea para mostrarlo en la alerta.
        const message = e.response ? formatError(e.response.data.error.message) : 'Ops un error ha ocurrido.';
        setError(message);
      }
    }
    else {
      setError('Complete todos los campos');
    }
  }

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        { error ?
          <Col md={ 8 }>
            <Alert variant="danger"> { error } </Alert>
          </Col>
        : null }
        <Col md={ 8 }>
          <Form.Group>
            <Form.Label> Email:</Form.Label>
            <Form.Control
              name="email"
              type="email"
              onChange={ onChange }
            />
          </Form.Group>
        </Col>
        <Col md={ 8 }>
          <Form.Group>
            <Form.Label> Contraseña:</Form.Label>
            <Form.Control
              name="password"
              type="password"
              onChange={ onChange }
            />
          </Form.Group>
        </Col>
        <Col md={ 8 }>
          <Button block onClick={ auth } >Enviar</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;