import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import "../index.css";
import logo from "../images/headerLogo.svg";

function Header({userEmail, onLogOut}) {


  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo" />
      <Switch>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </Route>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </Route>
          <Route exact path="/">
            <div className="header__menu">
              <p className="header__email">{userEmail}</p>
              <a className="header__logout" onClick={onLogOut}>
                Выйти
               </a>
            </div>
          </Route>
      </Switch>
    </header>
  );
}

export default Header;
