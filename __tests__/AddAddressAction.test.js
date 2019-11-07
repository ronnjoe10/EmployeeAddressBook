import React from "react"
import { AddAddressAction } from '../src/components/AddressBook/AddAddressAction';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import * as JsonConstant from '../data_assets/TestJsonData';
import Store from '../src/config/Store'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
    const props = {
        closeModal: jest.fn(),
        addData: jest.fn(),
        store: Store,
        popupState: true,
        dataStore: JsonConstant.AddressHomeData.data
    }
    const enzymeWrapper = shallow(<AddAddressAction {...props} />)
    return {
        props,
        enzymeWrapper
    }
}
describe('components', () => {
    describe('AddAddressAction', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup()
            expect(enzymeWrapper.state().isSubmit).toBe(false)
        })
    })
})
