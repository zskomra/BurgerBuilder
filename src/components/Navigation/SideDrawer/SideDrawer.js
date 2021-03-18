import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationsItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {

    return (
        <div className={classes.SideDrawer}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                 <NavigationsItems />
            </nav>
        </div>
    );
};

export default sideDrawer;