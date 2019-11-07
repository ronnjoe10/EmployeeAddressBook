import React, { Component } from 'react';
import API from '../Global/API/API-Request'
import Loader from '../Global/Loader/Loader';
import * as Constants from '../Global/Constants/Constants';
import AddressBookDashboard from './AddressBookDashboard'
import { connect } from 'react-redux'

//HomePage component
export class AddressBookHome extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            AddressList: null
        }
        this.handleCallback = this.handleCallback.bind(this);
    }
    //Fetch from the api and convert Blob filetype to Json
    componentDidMount() {
        this._isMounted = true;
    }

    //Fetch from the api and set contents data
    handleCallback(data) {
        if (this._isMounted) {
            if ((data.data) && (data.data.length >= 0)) {
                this.props.addData(data.data);
                this.setState({
                    isLoaded: true,
                    AddressList: this.props.dataStore
                })
            }
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    //Renders the view 
    render() {
        const { isLoaded, AddressList } = this.state;
        let renderDashboard = <div className="emptyRecords"><h3>No records found</h3></div>;
        if (AddressList != null) {
            renderDashboard = <AddressBookDashboard />
        }
        if (!isLoaded) {
            let requestParams = Constants.GetMethod('../../data_assets/DataSource.json');
            return (
                <div>
                    <Loader />
                    <API request={requestParams} callBack={this.handleCallback} />
                </div>
            )
        } else {
            return (
                <section>
                    <div className="page-title">
                        <h1>Employee Address Book</h1>
                    </div>
                    {renderDashboard}
                </section>
            );
        }
    }
}
function mapStateToProps(state) {
    return {
        dataStore: state.dataStore
    }
}
//Acction items to perform as per user interaction
function mapDispatchToProps(dispatch) {
    return {
        addData: (item) => {
            dispatch({ type: "ADD", userData: item })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddressBookHome)