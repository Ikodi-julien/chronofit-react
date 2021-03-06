import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
// import PropTypes from "prop-types";

import "./appnav.scss";

const AppNav = () => {
  const location = useLocation();
  const [navMenuIsOpen, setNavMenuIsOpen] = useState(false);
  const slugs = {
    "/entrainement": "Entrainement",
    "/girls": "Les Girls",
    "/recap_entrainements": "Entrainements effectués",
    "/rounds": "Création de rounds",
  };
  return (
    <section className="appnav__container">
      <div className="appnav__title">
        {slugs[location.pathname]
          ? slugs[location.pathname]
          : "Titre pas prévu..."}
      </div>
      <button
        className="appnav__toggle training__button --transparent --icone --xl"
        onClick={() => setNavMenuIsOpen(!navMenuIsOpen)}
      >
        <i className="fas fa-bars"></i>
      </button>

      <div
        className={
          navMenuIsOpen
            ? "appnav__links__container --visible"
            : "appnav__links__container"
        }
      >
        <nav className="appnav__links">
          <button
            className="appnav__links__close"
            onClick={() => setNavMenuIsOpen(!navMenuIsOpen)}
          >
            <i className="fas fa-times"></i>
          </button>
          <NavLink
            to="/"
            className="appnav__links__link"
            onClick={() => setNavMenuIsOpen(false)}
          >
            <button
              type="button"
              className="training__button --m --flex1 --jc-left "
            >
              Accueil
            </button>
          </NavLink>
          <NavLink
            to="/girls"
            className="appnav__links__link"
            onClick={() => setNavMenuIsOpen(false)}
          >
            <button
              type="button"
              className="training__button --m --flex1 --jc-left "
            >
              Les Girls
            </button>
          </NavLink>
          <NavLink
            to="/entrainement"
            className="appnav__links__link"
            onClick={() => setNavMenuIsOpen(false)}
          >
            <button
              type="button"
              className="training__button --m --flex1 --jc-left "
            >
              Entrainements
            </button>
          </NavLink>
          <NavLink
            to="/rounds"
            className="appnav__links__link"
            onClick={() => setNavMenuIsOpen(false)}
          >
            <button
              type="button"
              className="training__button --m --flex1 --jc-left "
            >
              Rounds
            </button>
          </NavLink>
          <NavLink
            to="/recap_entrainements"
            className="appnav__links__link"
            onClick={() => setNavMenuIsOpen(false)}
          >
            <button
              type="button"
              className="training__button --m --flex1 --jc-left "
            >
              Récap entraînements
            </button>
          </NavLink>
          {/* <NavLink to="/connexion" className="appnav__links__link" onClick={() => toggleMenu()} >Connexion</NavLink> */}
        </nav>
      </div>
    </section>
  );
};

export default AppNav;
