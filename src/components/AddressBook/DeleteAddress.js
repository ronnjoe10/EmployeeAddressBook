import React, { Component } from 'react'
import PropTypes from 'prop-types';

//Root component for the application
class DeleteAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            contentsList: null,
            error: false,
            errorMessage: "No records found",
            addAddress: false,
            deleteAddress: false,
        }
        this.getDisplayData = this.getDisplayData.bind(this);
        this.handleButtonAdd = this.handleButtonAdd.bind(this);
        this.handleButtonDelete = this.handleButtonDelete.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }
    render() {
        if (this.props.displayType == "modal") {
            return (
                <div >
                    {postRatings}
                    {/* Display rating in a modal*/}
                    <ModalPopup open={isOpen}>
                        <div style={styles.modalWrapper}>
                            <div style={styles.ratingHeader}>{ratingTitle} </div>
                            <div style={styles.ratingContent}>
                                <div style={styles.avgTitle}>{avgRatingTitle}</div>
                                {ratingList}
                                {getAvgRatingsRes}
                            </div>
                        </div>
                    </ModalPopup>
                </div>
            )
        }
    }
}
export default DeleteAddress;