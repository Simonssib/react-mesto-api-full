import React, { useState } from "react";
import "../index.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  function handleChangeEmail (e) {
        setEmail (e.target.value)
    }

  function handleChangePassword (e) {
        setPassword (e.target.value)
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password)
    .catch(err => console.log(err));
  };

  return (      
      <section className="login">
        <form className="login__form" onSubmit={handleSubmit}>
          <h1 className="login__title">Вход</h1>
          <input
            id="email"
            name="email"
            className="login__input"
            type="text"
            placeholder="Email"
            value={email}
            required
            onChange={handleChangeEmail}
          />
          <input
            id="password"
            name="password"
            className="login__input"
            type="password"
            placeholder="Пароль"
            value={password}
            required
            onChange={handleChangePassword}
          />
          <button className="login__btn" type="submit">
            Войти
          </button>
        </form>
      </section>
  );
};

export default Login;
