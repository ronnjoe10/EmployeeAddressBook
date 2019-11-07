import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Root component for the application
class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "Unknown error occured"
        }
    }
    // This method is invoked immediately after a component is mounted
    //Condition check for error message
    componentDidMount() {
        const errorMsg = (this.props.message) ? this.props.message : this.state.errorMessage
        console.log("ERROR -:- ", errorMsg);
        this.setState({
            errorMessage: errorMsg
        })
    }
    render() {
        return (
            <div>
                <h3>Error: {this.state.errorMessage}</h3>
            </div>
        );
    }
}
Error.propTypes = {
    message: PropTypes.string
}
export default Error;