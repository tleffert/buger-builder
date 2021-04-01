import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import styles from './Layout.module.css';

class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    sideDrawrClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return (
            <Fragment>
                <Toolbar
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuthenticated={this.props.isAuthenticated}
                />
                <SideDrawer
                    isAuthenticated={this.props.isAuthenticated}
                    closed={this.sideDrawrClosedHandler}
                    open={this.state.showSideDrawer}
                />
                <main className={styles.content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);
