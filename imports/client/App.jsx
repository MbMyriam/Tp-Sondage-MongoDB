import React from 'react';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';

export const App = () => (
  <div>
    <h1>Tp Sondage MongoDB!</h1>
    <RegisterForm/>
    <LoginForm/>
  </div>
  
);
