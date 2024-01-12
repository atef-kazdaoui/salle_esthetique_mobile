import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SigninForm from './Home/Home';


ReactDOM.render (
  <Router>
    <div className="App">
    <SigninForm />
    


      <Routes>
       
        <Route path="/" element={<SigninForm />} />
      </Routes>
    </div>
  </Router>,
  document.getElementById ('root')
);
