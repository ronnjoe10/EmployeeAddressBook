import React, { Component } from 'react'
import PropTypes from 'prop-types';
import AddAddress from './AddAddressForm'
import { connect } from 'react-redux'

//Root component for the application
export class AddressBookDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteAddress: false,
            initialData: this.props.dataStore,
            processedData: [],
            sortBy: "firstName",
            sortOrder: "ascending"
        }
        this.getDisplayData = this.getDisplayData.bind(this);
        this.handleButtonDelete = this.handleButtonDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getSortData = this.getSortData.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }
    componentDidMount() {
        this.getSortData(this.state.initialData);
    }
    //Update props after the store update on add or delete
    componentWillReceiveProps(newProps) {
        console.log(newProps);
        this.setState({
            initialData: newProps.dataStore
        }, () => {
            this.handleChange();
        });
    }
    //Deletes the record
    handleButtonDelete() {
        var checkedRecords = document.querySelectorAll("input[type=checkbox]:checked");
        var deleteIds = [];
        if (checkedRecords.length > 0) {
            checkedRecords.forEach(item => deleteIds.push(item.getAttribute("data-id")));
        }
        this.props.deleteUser(deleteIds);
    }
    //Initiates the sort by checking the previous state
    handleSort(e) {
        let sortName = e.currentTarget.dataset.name;
        console.log(sortName);
        this.setState({
            sortOrder: (this.state.sortBy === sortName) ?
                ((this.state.sortOrder === "descending") ? "ascending" : "descending") : "ascending",
            sortBy: sortName
        }, () => {
            this.getSortData(this.state.processedData);
        });
    }
    //Sorts the data
    getSortData(sortData) {
        const { sortBy, sortOrder } = this.state
        let __this = this;
        const promiseSort = new Promise(function (resolve, reject) {
            let filteredSortData = sortData.sort((a, b) => {
                switch (sortOrder) {
                    case "ascending":
                        if (a[sortBy] < b[sortBy]) { return -1; }
                        if (a[sortBy] > b[sortBy]) { return 1; }
                        return 0;
                    case "descending":
                        if (a[sortBy] > b[sortBy]) { return -1; }
                        if (a[sortBy] < b[sortBy]) { return 1; }
                        return 0;
                }
            })
            resolve(filteredSortData);
            reject(new Error("Error processing transaction records!"));
        });
        promiseSort.then(function (filteredSortData) {
            __this.setState({
                processedData: filteredSortData
            })
        });
        promiseSort.catch(function (error) {
            console.log(error);
        });
    }
    //Handles search event
    handleChange(e) {
        let searchVal = (document.querySelector("input[name=search]").value).toLowerCase();
        //let searchVal = (e.target.value).toLowerCase();
        let __this = this;
        if (searchVal != "") {
            const promiseFilter = new Promise(function (resolve, reject) {
                let filteredData = __this.state.initialData.filter((item) => (
                    (item.firstName.toLowerCase().includes(searchVal)) ||
                    (item.lastName.toLowerCase().includes(searchVal))) ||
                    (item.department.toLowerCase().includes(searchVal))
                )
                resolve(filteredData);
                reject(new Error("Error processing transaction records!"));
            });
            promiseFilter.then(function (filteredData) {
                __this.getSortData(filteredData);
            });
            promiseFilter.catch(function (error) {
                console.log(error);
            });
        } else {
            this.setState({
                processedData: this.state.initialData
            })
        }
    }
    //Process the data list and display the records
    getDisplayData() {
        const data = this.state.processedData;
        if ((data) && (data.length > 0)) {
            const displayData = data.map((data, index) => (
                <div className="address-list" key={index}>
                    <div>
                        <input type="checkbox" data-id={data.id} onClick={this.handleCheckbox} />
                    </div>
                    <div>{data.firstName}</div>
                    <div>{data.lastName}</div>
                    <div>{data.department}</div>
                    <div>{data.phone}</div>
                </div>
            ))
            return displayData;
        } else {
            console.log("Data props is missing or empty");
            return <div className="emptyRecords"><h3>No records found</h3></div>;
        }
        // }
    }
    render() {
        const { sortBy, sortOrder } = this.state;
        let result = this.getDisplayData();
        let addAddressComponent = "";
        if (this.props.popupState) {
            addAddressComponent = <AddAddress />
        }
        const ascendingSortIcon = <div className="sort-by-asc">&nbsp;</div>;
        const descendingSortIcon = <div className="sort-by-desc">&nbsp;</div>;
        let neutralSortIcon = <div className='sort-by-neutral'>&nbsp;</div>;
        let sortIconFirstName = ((sortBy === "firstName") ? ((sortOrder == "ascending") ? ascendingSortIcon : descendingSortIcon) : neutralSortIcon);
        let sortIconLastName = ((sortBy === "lastName") ? ((sortOrder == "ascending") ? ascendingSortIcon : descendingSortIcon) : neutralSortIcon);
        let sortIconDepartment = ((sortBy === "department") ? ((sortOrder == "ascending") ? ascendingSortIcon : descendingSortIcon) : neutralSortIcon);
        return (
            <div>
                {addAddressComponent}
                <div className="address-names">
                    <div className="filter-block">
                        <div>
                            <input type="text" name="search" placeholder="Search by Name and Department" onChange={this.handleChange} />
                            <button data-type="expand" onClick={() => this.props.openModal()}>Add</button>
                            <button data-type="collapse" onClick={this.handleButtonDelete}>Delete</button>
                        </div>
                    </div>
                    <div>
                        <div className="address-list address-list-header">
                            <div>&nbsp;</div>
                            <div data-name="firstName" className="sort-icons" onClick={this.handleSort}>First Name
                            {sortIconFirstName}
                            </div>
                            <div data-name="lastName" className="sort-icons" onClick={this.handleSort}>Last Name
                            {sortIconLastName}
                            </div>
                            <div data-name="department" className="sort-icons" onClick={this.handleSort}>Department
                            {sortIconDepartment}
                            </div>
                            <div>Phone Number</div>
                        </div>
                        {result}
                    </div>
                </div>
            </div>
        )
    }
}
//Validating Proptypes
AddressBookDashboard.propTypes = {
    popupState: PropTypes.bool,
    dataStore: PropTypes.array,
    openModal: PropTypes.func,
    deleteUser: PropTypes.func
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
        openModal: () => {
            dispatch({ type: "OPEN", status: true })
        },
        deleteUser: (item) => {
            dispatch({ type: "DELETE", userData: item })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddressBookDashboard)

