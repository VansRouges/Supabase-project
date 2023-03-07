import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container, Nav, Form, Row, Col, Button, Card } from 'react-bootstrap'
import ProductCard from './productCard'
import LoadingState from './LoadingState';
import { supabase } from '../supabaseClient'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { v4 as uuidv4 } from 'uuid'

// https://ibzmirkpbfkfxwvcielp.supabase.co/storage/v1/object/public/images/a6e3eb04-f19f-4d25-90c9-54a2affa3bd8/199df7ed-d778-4163-9a2c-4618eda95589

const CDNURL = "https://ibzmirkpbfkfxwvcielp.supabase.co/storage/v1/object/public/images/"

const Home = () => {
    const user = useUser();
    const supaclient = useSupabaseClient();
    const [ images, setImages ] = useState([])

    async function signOut(){
      const { error } = await supaclient.auth.signOut();
    }

    

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

    async function uploadImage(e){
            let file = e.target.files[0];
      
            const { data, error } = await supabase
              .storage
              .from('images')
              .upload(user.id + "/" + uuidv4(), file)
      
              if(data){
                getImages();
              } else{
                console.log(error);
              }
          }
  
      async function getImages() {
        const { data, error } = await supabase
          .storage
          .from('images')
          .list(user?.id + "/", {
            limit: 100,
            offset: 0,
            sortBy: { column: "name", order: "asc"}
          })
  
          if(data !== null){
            setImages(data);
          } else{
            console.log(error)
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
                  <Navbar.Brand>STORE PRODUCTS</Navbar.Brand>
                  <Nav>
                    <Nav.Item className='p-2'>Current user: {user.email}</Nav.Item>
                    <Nav.Item className='p-2'>Created by Vance sama</Nav.Item>
                    <Button variant='danger' onClick={() => signOut()}>Sign Out</Button>
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
                    <Form.Label>Upload Product Image</Form.Label>
                    <Form.Control type='file' accept='image/png, image/jpeg' onChange={(e) => uploadImage(e)} />
                    {/* 
                      to get an image: CDNURL + user.id + "/" + image.name
                      images: [image1, image2, image3]
                     */}
                    <br />
                    <Button onClick={() => createProduct()}>Create Product in Supabase DB</Button>
                  </Col>
                </Row>
                <hr />
                <h3>Current Database Items</h3>
                <Row xs={1} md={3} className='g-4'>
                  {images.map((image) => {
                    return(
                      <Col>
                        <Card>
                          <Card.Img variant="top" src={CDNURL + user.id + "/" + image.name } />
                          <Card.Body>
                            <Button variant='danger'>Delete Image</Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                  })}
                </Row>
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