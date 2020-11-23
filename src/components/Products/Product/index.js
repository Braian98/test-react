import React from 'react';

import { Button, Row, Col, Image } from 'react-bootstrap';

const Product = ({ product, changeEditModal, deleteProduct }) => (
  <tr key={ product.id }>
    <td><Image src={ product.img } width={ 100 } height={ 100 } /></td>
    <td>{ product.name }</td>
    <td>{ product.category }</td>
    <td>{ product.description }</td>
    <td>${ product.price }</td>
    <td>
      <Row className="justify-content-md-between">
        <Col md={ 6 }>
          <Button variant="info" block onClick={ () => changeEditModal(product) } >Editar</Button>
        </Col>
        <Col md={ 6 }>
          <Button variant="danger" block onClick={ () => deleteProduct(product.id) }>Borrar</Button>
        </Col>
      </Row>
    </td>
  </tr>
);

export default Product;