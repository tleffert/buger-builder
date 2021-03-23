import React, { Fragment, Component } from 'react';

import Modal from  '../UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axiosInstance) => {
    return class extends Component {

        state = {
            error: null
        }

        componentDidMount() {
            axiosInstance.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            axiosInstance.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            });
        }

         render() {
            return (
                <Fragment>
                    <Modal
                        show={this.state.error}
                        clicked={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }
}

export default withErrorHandler;
