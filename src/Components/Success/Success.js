import React from 'react';
import { Link } from 'react-router-dom';
import './success.css';

const Success = (props) =>
    <div className="success-wrapper">
        <i className="far fa-check-circle"></i>
        <p>{props.successMessage}</p>
        <Link to='/'>
            <div className="home-link">{props.linkText}</div>
        </Link>
    </div>

export default Success;