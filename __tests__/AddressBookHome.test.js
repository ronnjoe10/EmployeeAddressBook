import React from "react"
import { AddressBookHome } from '../src/components/AddressBook/AddressBookHome';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import * as JsonConstant from '../data_assets/TestJsonData';
import Store from '../src/config/Store'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
    const props = {
        addData: jest.fn(),
        store: Store,
        dataStore: JsonConstant.AddressHomeData.data
    }
    const enzymeWrapper = shallow(<AddressBookHome {...props} />)
    return {
        props,
        enzymeWrapper
    }
}
describe('components', () => {
    describe('AddressBookHome', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup()
            expect(enzymeWrapper.state().isLoaded).toBe(false);
            expect(enzymeWrapper.state().AddressList).toEqual(null);
        })
        it("Invoke AddressBookHome Home with correct data to callback function", () => {
            const { enzymeWrapper } = setup()
            enzymeWrapper.instance().handleCallback(JsonConstant.AddressHomeData);
            enzymeWrapper.update();
            expect(enzymeWrapper.state().isLoaded).toBe(true);
            enzymeWrapper.update();
            expect(enzymeWrapper.state().AddressList).toEqual(JsonConstant.AddressHomeData.data);
        });
    })
})
