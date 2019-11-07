import React, { Component } from 'react'
import AddAddressAction from './AddAddressAction';

//Root component for the application
class AddAddress extends Component {
    render() {
        return (
            <div>
                {/* Display rating in a modal*/}
                <AddAddressAction>
                    <div className="modal-wrapper">
                        <div className="formContainer">
                            <form id="addUser">
                                <div>
                                    <label htmlFor="firstname">First Name</label>
                                    <input type="text" name="firstname" placeholder="e.g. Joe" required />
                                </div>
                                <div>
                                    <label htmlFor="lastname">Last Name</label>
                                    <input type="text" name="lastname" placeholder="e.g. Jerald" required />
                                </div>
                                <div>
                                    <label htmlFor="department">Department</label>
                                    <input type="text" name="department" placeholder="e.g. Technology" required />
                                </div>
                                <div>
                                    <label htmlFor="phone">Phone Number</label>
                                    <input type="number" name="phone" placeholder="e.g. +61466816567" required />
                                </div>
                            </form>
                        </div>
                    </div>
                </AddAddressAction>
            </div>
        )
    }
}
export default AddAddress;