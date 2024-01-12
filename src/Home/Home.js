import React, {useState} from 'react';
import './Home.css'; // Importez votre feuille de style CSS personnalisée
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const {ipcRenderer} = window.require ('electron');

const SigninForm = () => {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const navigate = useNavigate ();

  const handleSubmit = event => {
    event.preventDefault ();
    const data = {
      adresse_email: email,
      password: password,
    };
    axios
      .post ('http://localhost:5000/users/login', data)
      .then (response => {
        // Traitez la réponse de l'API ici
        console.log (response.data);
        console.log (response.data.message);
        const token = response.data.token;

        if (token) {
          console.log (token);
          localStorage.setItem ('token', token);
         ipcRenderer.send ('redirect', 'client.html');

        }
      })
      .catch (error => {
        // Traitez les erreurs de l'API ici
        console.error (error);
      });
  };

  return (
    <div className="container">
      <h1>Connexion</h1>

      <form onSubmit={handleSubmit} className="form-connexion">
        <div className="form-group">
          <label htmlFor="email">Adresse e-mail :</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={event => setEmail (event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={event => setPassword (event.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Connexion
        </button>
      </form>
    </div>
  );
};

export default SigninForm;
