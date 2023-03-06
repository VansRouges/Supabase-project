import { Card, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

function ProductCard(){
    const [ editing, setEditing ] = useState(false)

    return (
        <Card style={{width: "18rem"}}>
            <Card.Body>
                { editing === false ? 
                    <>
                        <Card.Title>Product Name</Card.Title>
                        <Card.Title>Product Description</Card.Title>
                        <Button variant='danger'>Delete Product</Button>
                        <Button variant='secondary' onClick={() => setEditing(true)}>Edit Product</Button>
                    </>
                :
                <>
                    <h4>Editing Product</h4>
                </>
            }
            </Card.Body>
        </Card>
    )

}

export default ProductCard