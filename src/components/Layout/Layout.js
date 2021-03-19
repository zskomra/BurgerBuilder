import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { render } from 'react-dom';

class Layout extends Component {
    state ={
        showSideDrawer: false
    }

    showSideDrawerHandler = () => {
        this.setState({showSideDrawer:false});
    }

    hideSideDrawerHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
        // this.setState({showSideDrawer:true});
    }

    render() {

    return (
    <Auxiliary>
        <Toolbar showSideDrawer={this.hideSideDrawerHandler}/>
        <SideDrawer 
        closed={this.showSideDrawerHandler} 
        open={this.state.showSideDrawer}/>
        <main className={classes.Content}>
            {this.props.children} 
        </main>
    </Auxiliary>
    )
}};

export default Layout;