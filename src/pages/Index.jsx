import { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { supabase } from '../supabaseClient';
import Home from '../components/Home';

const Index = () => {
    const [ email, setEmail ] = useState("")
    const user = useUser();
    const supabase = useSupabaseClient();

    async function magicLinkLogin(){
        const { data, error } = await supabase.auth.signInWithOtp({
            email: email
        });

        if(error){
            alert("Error Communicating with supabase, make sure to use a real email address");
            console.log(error)
        } else {
            alert("Check your email for a Supabase Magic Link to log in")
        }
    }

    return (
        <Container align="center" className='container-sm mt-4'>
            {/* 
                if the user exists: show them the images / upload images page
                if the don't exist: show them login page
            */}
            {
                user === null ?
                <>
                    <h1>Welcome to ImageWall</h1>
                    <Form>
                        <Form.Group className='mb-3' style={{maxWidth: "500px"}}>
                            <Form.Label>Enter an Email to sign in with a Supabase Magic Link</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant='success' onClick={() => magicLinkLogin()}>Get Magic Link</Button>
                    </Form>
                </>
                :
                <Home />
                
            }
        </Container>
    )
}

export default Index