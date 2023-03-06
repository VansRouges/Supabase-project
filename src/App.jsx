import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container, Nav, Form, Row, Col, Button } from 'react-bootstrap'
import ProductCard from './productCard'
import LoadingState from './LoadingState';

// Create the user interface (Navbar, Form to create products, product card)
// Setup supabase, create a table for our products
// Implement the CRUD logic for the products


function App() {
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState("");

  const [showComponent1, setShowComponent1] = useState(true)

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowComponent1(false);
        }, 4000);

        return () => {
            clearTimeout(timeoutId)
        };
    }, []);

    if(showComponent1){
        return <LoadingState />
    } else {
        return (
          <>
          <Navbar>
            <Container>
              <Navbar.Brand>Store Products</Navbar.Brand>
              <Nav>
                <Nav.Item>Created by Vance sama</Nav.Item>
              </Nav>
            </Container>
          </Navbar>
          <Container>
            <Row>
              <Col xs={12} md={8}>
                <h3>Create Product for Supabase Database</h3>
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type='text'
                  id='name'
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  type='text'
                  id='description'
                  onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <Button>Create Product in Supabase DB</Button>
              </Col>
            </Row>
            <hr />
            <h3>Current Database Items</h3>
            <Row xs={1} lg={3} className='g-4'>
              <Col>
                <ProductCard />
              </Col>
            </Row>
          </Container>
        </>
        )
    }
}

export default App
