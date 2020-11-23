import React, { useState, useEffect } from 'react';

import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import ModalProduct from './ModalProduct';
import Product from './Product';

import { getProducts, deleteProducts } from '../../services';

const Products = () => {
  // Hook de estado para los productos
  const [ products, setProducts ] = useState([])
  // Hook de estado para el modal
  const [ show, setShow ] = useState(false);
  // Hook de estado para cambiar el formulario de Editar o Agregar producto
  const [ edit, setEdit ] = useState({ isEdit: false, product: {} })
  // Hook de estado para el filtrado de categorías
  const [ filter, setFilter ] = useState('');
  // Hook de estado donde se guardan todos los productos filtrados
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Hace la llamada a la API para traer los productos y lo guarda en el estado del componente
  const fetch = async () => {
    try{
      const data = await getProducts();
      setProducts(data);
    } catch(e) {
      console.error(e);
    }
  }

  // hace un llamado a fetch cuando se renderiza el componente por primera vez
  useEffect(() => fetch(), []);

  // Filtra los productos por categoría cada vez que cambien las variables filter y products
  useEffect(() => {
    setFilteredProducts(
      products.filter(
        product => product.category.toLowerCase().indexOf(filter) !== -1
      )
    );
  }, [filter, products])

  // Cambia el formulario a editar Producto
  const changeEditModal = product => {
    setEdit({ isEdit: true, product });
    setShow(true);
    
  }

  // Verifica si es true la propiedad IsEdit, si lo es muestra el Modal para editar un producto, de lo contrario muestra el modal para agregar un producto
  const ChangeModal = () => {
    if(edit.isEdit) {
      return <ModalProduct isEdit show={ show } product={ edit.product } handleClose={ handleClose } fetch={ fetch } />
    } else {
      return <ModalProduct show={ show }  handleClose={ handleClose } fetch={ fetch } />
    }
  }

  // Cierra el modal
  const handleClose = () => {
    setShow(false);
    setEdit({ isEdit: false, product: {} });
  };

  // Hace el llamado a la API para borrar el producto y lo saca del array de products para que se se muestre el cambio en pantalla
  const deleteProduct = async id => {
    try {
      await deleteProducts(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  return(
    <Container fluid>
      <Row>
        <Col>
          <Row className="justify-content-between">
            <Col md={ 4 } >
              <Form.Group>
                <Form.Label> Filtrar por Categoría:</Form.Label>
                <Form.Control
                  name="filterCategory"
                  onChange={ e => setFilter(e.target.value.toLowerCase()) }
                />
              </Form.Group>
            </Col>
            <Col md={ 3 } lg={ 2 } className="align-self-center">
              <Button block variant="success" onClick={ () => setShow(true) }> Agregar nuevo producto </Button>
            </Col>
          </Row>
        </Col>
        <Col md={ 12 }>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              { filteredProducts ? filteredProducts.map(product => <Product key={ product.id } product={ product } changeEditModal={ changeEditModal } deleteProduct={ deleteProduct } /> ) : null }
            </tbody>
          </Table>
        </Col>
        { show ? <ChangeModal />: null }
      </Row>
    </Container>
  );
};

export default Products;