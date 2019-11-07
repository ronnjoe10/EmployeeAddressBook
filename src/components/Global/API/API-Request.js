import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Exception from '../Exception/ExceptionHandling';

//Root component for the application
class API extends Component {
    constructor(props) {
        super(props);
        const propsData = this.props.request;
        this.state = {
            error: false,
            errorMessage: null,
            url: ((propsData) ? propsData.url : false) || null,
            method: ((propsData) ? propsData.method : false) || "get",
            type: ((propsData) ? propsData.responseType : false) || "json",
            data: this.props.data || null,
            callBack: this.props.callBack || null
        }
        this.handleAPIRequest = this.handleAPIRequest.bind(this)
    }
    // This method is invoked immediately after a component is mounted
    componentDidMount() {
        //Request processed only on url exist in props
        if (this.state.url) {
            this.handleAPIRequest();
        } else {
            this.setState({
                error: true,
                errorMessage: "URL should not be empty"
            })
        }
    }
    //Handles API request
    handleAPIRequest() {
        const { url, method, type, data } = this.state
        const __this = this;
        if (url) {
            Axios({
                method: method,
                url: url,
                data: data,
                responseType: type
            }).then(function (response) {
                if (__this.state.callBack) {
                    __this.state.callBack(response.data);
                }
            }).catch(function (error) {
                __this.setState({
                    error: true,
                    errorMessage: error.message
                })
            });
        }
    }
    render() {
        const { error, errorMessage } = this.state;
        if (error) {
            return (
                <Exception message={errorMessage} />
            )
        }
        return (
            <div>{this.props.children}</div>
        )
    }
}
//Props validation
API.propTypes = {
    request: PropTypes.object.isRequired,
    data: PropTypes.object,
    callBack: PropTypes.func
}
export default API;