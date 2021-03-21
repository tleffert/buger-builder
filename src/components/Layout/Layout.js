import React, { Fragment } from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';

const layout = ( props ) => (
    <Fragment>
        <Toolbar/>
        <main className={styles.content}>
            {props.children}
        </main>
    </Fragment>
);

export default layout;
