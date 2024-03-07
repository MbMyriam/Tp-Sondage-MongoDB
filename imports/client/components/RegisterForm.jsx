import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base'

export const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username)

    Accounts.createUser({
      username: username,
      email: email,
      password: password,
    }, function (error) { console.log(error); });
  };

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
        <label htmlFor="email">Email</label>

        <input
          type="text"
          placeholder="Email"
          name="email"
          required
          onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>

        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit" >Register</button>
      </form>
    </div>
  );
};
