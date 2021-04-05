import React, { Fragment, Component } from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {

    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div
                className={styles.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </Fragment>
    );

};

export default React.memo(Modal, (prevProps, nextProps) => {
    return nextProps.show === prevProps.show && prevProps.children === nextProps.children;
});
