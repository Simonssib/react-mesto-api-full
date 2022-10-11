import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../index.css";

const Register = ({ onRegister }) => {
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
    onRegister(email, password);
  };

  return (
      <div className="register">
        <form className="register__form" onSubmit={handleSubmit}>
          <h1 className="register__title">Регистрация</h1>
          <input
            id="email"
            name="email"
            type="text"
            className="register__input"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
          />
          <input
            id="password"
            name="password"
            type="password"
            className="register__input"
            placeholder="Пароль"
            value={password}
            onChange={handleChangePassword}
          />
          <button className="register__btn" type="submit">
            Зарегистрироваться
          </button>
          <Link to='/sign-in' className="register__log-in">Уже зарегистрированы? Войти</Link>
        </form>
      </div>
  );
};

export default Register;
