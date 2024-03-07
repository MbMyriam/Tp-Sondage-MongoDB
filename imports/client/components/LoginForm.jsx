import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';



export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
  };


  const handleClick = e => {

    console.log("User id : " + Meteor.userId())
  }


  return (
    <div>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username">Username</label>

        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          onChange={e => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>

        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit" onClick={handleClick} >Connexion</button>

      </form>
    </div>
  );
};
