import 'bootstrap/dist/css/bootstrap.min.css'
// import { Navbar, Container, Nav, Form, Row, Col, Button } from 'react-bootstrap'
// import ProductCard from './components/productCard'
// import LoadingState from './components/LoadingState';
// import { supabase } from './supabaseClient'
import Index from './pages/Index'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Create the user interface (Navbar, Form to create products, product card)
// Setup supabase, create a table for our products
// Implement the CRUD logic for the products


function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* <Route path="/home" element={<Home />} /> */}
            {/* <Route path="/create" element={<Create />} /> */}
            {/* <Route path="/:id" element={<Update />} /> */}
          </Routes>
        </Router>
    </>
  );
}

export default App
