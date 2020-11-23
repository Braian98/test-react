import React, { useState } from 'react';

import { Alert, Form, Button, Modal } from 'react-bootstrap';

import { postProducts, updateProducts } from '../../../services';

const defaultState = ({
  name:'',
  price: 0,
  category:'',
  description: '',
  img: null,
  newImage: false
});

const ModalProduct = ({ isEdit = false, product = defaultState, show, handleClose, fetch }) => {
  // Hook de estado para el formulario
  const [data, setData] = useState(product);
  // Hook de estado para la alerta de error
  const [error, setError] = useState(null);

  const onChange = e => {
    const { name, value, type, files } = e.target;
    if(type !== 'file') {
      setData({
        ...data,
        [name]: value
      });
    } else {
      setData({
        ...data,
        img: files[0],
        newImage: true
      })
    }
  }

  const submit = async () => {
    try {
      // Verifica que todos los campos no esten vacíos
      if(verifyData()) {
        // Verifica si es true la propiedad isEdit, si lo es llama a la API para actualizar un producto, de lo contrario, agregar un producto
        isEdit ? await updateProducts(data, product.id) : await postProducts(data);
        // Cierra el modal
        handleClose();
        // Vuelve a llamar a la API para mostrar los cambios en la tabla
        fetch();
      } else {
        throw new Error('Complete todos los campos');
      }
    } catch (e) {
      // Si captura un error lo guarda en el estado para mostrarlo en la alerta de error
      setError(e.message);
    }
  }

  const verifyData = () => data.name !== '' && data.category !== '' && data.price > 0 && data.description !== '';

  return (
    <Modal show={ show } onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> { isEdit ? 'Actualizar producto': 'Nuevo Producto' } </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { error ? <Alert variant="danger"> { error } </Alert> : null }
        <Form.Group>
          <Form.Label> Nombre:</Form.Label>
          <Form.Control
            name="name"
            value={ data.name }
            onChange= { onChange }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Categoría:</Form.Label>
          <Form.Control
            name="category"
            value={ data.category }
            onChange= { onChange }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Descripción:</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            style={{ maxHeight: 200, minHeight:100 }}
            value={ data.description }
            onChange= { onChange }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Precio:</Form.Label>
          <Form.Control
            name="price"
            value={ data.price }
            type="number"
            min={0}
            onChange= { onChange }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Imagen:</Form.Label>
          <Form.Control
            name="img"
            type="file"
            onChange= { onChange }
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ handleClose }>Salir</Button>
        <Button onClick={ submit } >{ isEdit ? 'Actualizar' : 'Enviar' }</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalProduct;
