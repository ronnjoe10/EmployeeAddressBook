import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        console.log("Error Occured");
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        logErrorToMyService(error, info);
        console.log(error);
    }

    render() {
        console.log(this.state.hasError);
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}
export default ErrorBoundary;