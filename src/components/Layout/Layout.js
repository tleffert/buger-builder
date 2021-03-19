import React, { Fragment } from 'react';

const layout = ( props ) => (
    <Fragment>
        <div>Toolbar, sidedrawr, backdrop</div>
        <main>
            {props.children}
        </main>
    </Fragment>
);

export default layout;
