import React, { Fragment, Component, useState, useEffect } from 'react';

import Modal from  '../UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axiosInstance) => {
    return (props) => {

        const [error, setError] = useState(null);

        const reqInterceptor = axiosInstance.interceptors.request.use(req => {
            setError(null);
            return req;
        });

        const resInterceptor = axiosInstance.interceptors.response.use(res => res, error => {
            setError(error);
        });

        const errorConfirmedHandler = () => {
            setError(null);
        }

        useEffect(() => {
            axiosInstance.interceptors.request.eject(reqInterceptor);
            axiosInstance.interceptors.response.eject(resInterceptor);
        }, [reqInterceptor, resInterceptor]);

        return (
            <Fragment>
                <Modal
                    show={error}
                    clicked={errorConfirmedHandler}
                >
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    }
}

export default withErrorHandler;
