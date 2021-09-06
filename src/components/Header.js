import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <div className="header">
            <div className="container">
                <div className="nav-links">
                    <Link to="/">Home</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link to="/create">Add Activity!</Link>
                </div>
                <h1>{props.children}</h1>
                <h2>{props.subtitle}</h2>
                
            </div>
        </div>
    );
}
Header.defaultProps = {
    subtitle: "Get active after work!"
};

export default Header;