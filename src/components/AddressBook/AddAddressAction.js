import React, { Component } from 'react';
import PropTypes from 'prop-types';
import API from '../Global/API/API-Request'
import * as Constants from '../Global/Constants/Constants';
import { connect } from 'react-redux'

//Root component for the application
export class AddAddressAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmit: false,
            errorMessage: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitCallBack = this.handleSubmitCallBack.bind(this);
        this.submitFormData = this.submitFormData.bind(this);
        this.insertElement = this.insertElement.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }
    handleSubmit() {
        this.setState({
            isSubmit: true
        })
    }
    //Callback function after submiting the data
    handleSubmitCallBack(data) {
        if (data.success) {
            this.setState({
                isSubmit: false
            })
            this.props.closeModal();
            window.localStorage.getItem('addedData');
            let newUser = JSON.parse(window.localStorage.getItem('addedData'));
            this.props.addData(newUser);
        }
    }
    //Submit form data 
    submitFormData() {
        let myForm = document.getElementById('addUser');
        let formData = new FormData(myForm);
        let requestData = {
            id: Math.random().toPrecision(36).substr(2, 9),
            firstName: formData.get('firstname'),
            lastName: formData.get('lastname'),
            department: formData.get('department'),
            phone: formData.get('phone'),
        }
        window.localStorage.setItem('addedData', JSON.stringify(requestData));
        let requestParams = Constants.GetMethod('../../data_assets/MockResponse.json');
        let apiRequestStatus = <API request={requestParams} data={requestData} callBack={this.handleSubmitCallBack} />
        return apiRequestStatus;
    }
    //Dynamically creating error messages 
    insertElement(text) {
        let errorDiv = document.getElementById("errorMessage");
        var newDiv = document.createElement("li");
        var content = document.createTextNode(text);
        newDiv.appendChild(content);
        errorDiv.appendChild(newDiv);
    }
    //Form validation
    validateForm() {
        let myForm = document.querySelectorAll('#addUser input');
        document.getElementById("errorMessage").innerHTML = "";
        //Regex to include alphanumeric charecters
        let RegExString = /^[a-z0-9A-Z]+$/;
        //Regex to include only numbers allowing it to begin with +
        let RegExNumber = /^\+?[0-9]+$/
        let count = 0;
        for (let item of myForm) {
            if (item.value === "") {
                this.insertElement(`${item.name} should not be empty`);
                count++;
            } else if (item.type === "text") {
                if (!RegExString.test(item.value)) {
                    this.insertElement(`${item.name} should not have illegal charecters`)
                    count++;
                }
            } else if (item.type === "number") {
                if (!RegExNumber.test(item.value)) {
                    this.insertElement(`${item.name} should not have illegal charecters`)
                    count++;
                }
            }
        }
        if (count < 1) {
            return this.submitFormData();
        } else {
            //Display errors
            document.getElementById("formException").style.display = "flex";
        }
    }
    render() {
        const { isSubmit } = this.state;
        let apiRequest = ""
        if (isSubmit) {
            apiRequest = this.validateForm();
        }
        if (this.props.popupState) {
            return (
                <div>
                    <div className="modal">
                        <div className="modal-content">
                            <a className="close" onClick={() => this.props.closeModal()}>&times;</a>
                            <div className="formException" id="formException">
                                <ul id="errorMessage"></ul>
                            </div>
                            {this.props.children}
                            <div className="submitButton">
                                <button type="button" onClick={this.handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                    {apiRequest}
                </div >
            );
        }
        return null;
    }
}
//Props validation
AddAddressAction.propTypes = {
    popupState: PropTypes.bool,
    closeModal: PropTypes.func,
    addData: PropTypes.func
}

//Getting Current cart state
function mapStateToProps(state) {
    return {
        popupState: state.popupState,
        dataStore: state.dataStore
    }
}
//Acction items to perform as per user interaction
function mapDispatchToProps(dispatch) {
    return {
        closeModal: () => {
            dispatch({ type: "CLOSE", status: false })
        },
        addData: (item) => {
            dispatch({ type: "UPDATE", userData: item })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddAddressAction)