import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SigninForm from './Home/Home';


function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninForm />} />
        <Route path="/about" element={<Bienvenue />} />
      </Routes>
    </Router>
  );
}

export default App;
