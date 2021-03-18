import React from 'react';
import foodLogo from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={foodLogo} alt='mylogo'/>
    </div>

);

export default logo;