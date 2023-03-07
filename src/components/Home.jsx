import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container, Nav, Form, Row, Col, Button } from 'react-bootstrap'
import ProductCard from './productCard'
import LoadingState from './LoadingState';
import { supabase } from '../supabaseClient'

const Home = () => {
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState("");
    const [products, setProducts ] = useState([])
  
    const [showComponent1, setShowComponent1] = useState(true)
  
      useEffect(() => {
          const timeoutId = setTimeout(() => {
              setShowComponent1(false);
          }, 1500);
  
          return () => {
              clearTimeout(timeoutId)
          };
      }, []);
  
      useEffect(() => {
        getProducts();
      }, [])
  
      async function getProducts(){
        try{
          const { data, error } = await supabase
            .from("products")
            .select("*")
            .limit(10)
          if (error) throw error;
          if(data != null){
            setProducts(data) //returns an array [product1, product2]
          }
        } catch(error){
          alert(error.message)
        }
        finally{
  
        }
      }
  
      async function createProduct() {
        try{
          const { data, error } = await supabase
            .from("products")
            .insert({
              name: name,
              description: description
            })
            .single()
            
          if (error) throw error;
          window.location.reload();
        } catch(error){
          alert(error.message)
        }
      }
  
      if(showComponent1){
          return <LoadingState />
      } else {
        console.log(products)
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
                    <Button onClick={() => createProduct()}>Create Product in Supabase DB</Button>
                  </Col>
                </Row>
                <hr />
                <h3>Current Database Items</h3>
                <Row xs={1} lg={3} className='g-4'>
                  {products.map((product) => (
                    <Col>
                      <ProductCard product={product} />
                    </Col>
                  ))}
                </Row>
              </Container>
            </>
          )
      }
}

export default Home