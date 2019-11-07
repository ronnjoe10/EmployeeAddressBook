import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'
import AddressBookHome from './components/AddressBook/AddressBookHome';

class Router extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={AddressBookHome} />
            </Switch>
        )
    }
}
export default Router