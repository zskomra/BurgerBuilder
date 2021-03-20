import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationsItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

    let activeClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        activeClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Auxiliary>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={activeClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                 <NavigationsItems />
            </nav>
        </div>
        </Auxiliary>
    );
};

export default sideDrawer;