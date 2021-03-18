import React from 'react';
import foodLogo from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={foodLogo} alt='mylogo'/>
    </div>

);

export default logo;