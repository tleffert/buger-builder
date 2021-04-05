import React, { Fragment, Component, useState } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import styles from './Layout.module.css';

class Layout extends Component {

    const [sideDrawerIsVisible, setDrawerVisibility] = useState(false);

    state = {
        showSideDrawer: true
    }

    const sideDrawrClosedHandler = () => {
        setDrawerVisibility(false);
    }

    const sideDrawerToggleHandler = () => {
        setDrawerVisibility(!sideDrawerIsVisible);
    }

    return (
        <Fragment>
            <Toolbar
                drawerToggleClicked={sideDrawerToggleHandler}
                isAuthenticated={props.isAuthenticated}
            />
            <SideDrawer
                isAuthenticated={props.isAuthenticated}
                closed={sideDrawrClosedHandler}
                open={sideDrawerIsVisible}
            />
            <main className={styles.content}>
                {props.children}
            </main>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);
