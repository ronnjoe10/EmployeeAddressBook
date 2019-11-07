import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../Global/Constants/Constants';

//Root component for the application
class Header extends Component {
    render() {
        return (
            <header>
                {/* Redriect to home page on click of logo */}
                <Link to="/">
                    <div className="logo">
                        <img src={Constants.HomeLogoURL} alt="Culture Amp Logo" title="Culture Amp Logo" />
                    </div>
                </Link>
            </header>
        );
    }
}
export default Header;