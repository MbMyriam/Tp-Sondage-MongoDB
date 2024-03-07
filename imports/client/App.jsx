import React from 'react';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { SondageForm } from './components/SondageForm';

export const App = () => (
  <div>
    <h1>Tp Sondage MongoDB!</h1>
    <RegisterForm/>
    <br/>
    <LoginForm/>
    <br/>
    <SondageForm/>
  </div>
  
);
