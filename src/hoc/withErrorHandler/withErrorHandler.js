import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount () { 
            // clearing any errors when sending a request
            axios.interceptors.request.use(req => {
                this.setState( {error: null} );
                return req;
            })
            //handling error(s)
            axios.interceptors.response.use(res => res, error => {
                this.setState( {error: error} );
            });
        }

        // clearing error to null for backdrop 
        errorConfirmedHandler = () => {
            this.setState( {error: null} );
        }

        render () {
            return (
            <Aux>
                <Modal 
                    show={this.state.error} // only showing error is error is set to true 
                    closeModal={this.errorConfirmedHandler} > 
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>); 
        }
    } 
}

export default withErrorHandler;