import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';


const withErrorHanlder = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        }
        
        componentDidMount () {
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            });
            this.responseInterceptor  = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
                console.log(error);
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        componentWillUnmount () {
            console.log('will unmount', this.requestInterceptor, this.responseInterceptor);
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }


        render () {
            return (
                <Auxiliary>
                    <Modal show={this.state.error}
                    modalClosed={this.errorConfirmedHandler} >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }
}


export default withErrorHanlder;