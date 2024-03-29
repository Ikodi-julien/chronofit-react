import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { AUTH_URL } from '../../settings'
import { useEffect } from 'react'
import './landing.scss'

const Landing = ({ getMe, isUserLoggued, logout, nickname }) => {
    useEffect(() => getMe())
    return (
        <section className="landing__container">
            <header className="landing__header">
                {isUserLoggued && (
                    <>
                        <div className="landing__connected">
                            <span>Connecté : {nickname}</span>
                            <a href={`${AUTH_URL}/?app=chronofit`}>
                                Mon profil
                            </a>
                        </div>
                    </>
                )}
                <div className="landing__row">
                    <h1 className="landing__title">CHRONOFIT</h1>
                    {!isUserLoggued ? (
                        <a
                            className="header__button"
                            href={`${AUTH_URL}/?app=chronofit`}
                        >
                            Connexion
                        </a>
                    ) : (
                        <div
                            className="header__button"
                            onClick={() => logout()}
                        >
                            Déconnexion
                        </div>
                    )}
                </div>
            </header>

            <div className="landing__links">
                <Link className="landing__button" to="/girls">
                    Les Girls
                </Link>
                <Link className="landing__button" to="/entrainement">
                    WODs
                </Link>
                <Link className="landing__button" to="/rounds">
                    Création de rounds
                </Link>
                {isUserLoggued && (
                    <Link className="landing__button" to="/recap_entrainements">
                        Historique
                    </Link>
                )}
            </div>
            <Footer />
        </section>
    )
}

export default Landing
