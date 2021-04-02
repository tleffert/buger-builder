import React, { Fragment } from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';

import styles from './SideDrawer.module.css';

const sideDrawer = (props) => {

    let attachedClasses = [styles.SideDrawer, styles.Close];

    if (props.open) {
        attachedClasses = [styles.SideDrawer, styles.Open];
    }

    return (
        <Fragment>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated}/>
                </nav>
            </div>
        </Fragment>

    );
}

export default sideDrawer;
