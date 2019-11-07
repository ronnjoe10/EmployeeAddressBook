import React, { Component } from 'react';

//Root component for the application
class Loader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="loader">
                <span className="load-spinner">&nbsp;</span>
                <h3>Loading...</h3>
            </div>
        );
    }
}
export default Loader;