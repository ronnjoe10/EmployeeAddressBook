import React from "react"
import { AddressBookDashboard } from '../src/components/AddressBook/AddressBookDashboard';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import * as JsonConstant from '../data_assets/TestJsonData';
import Store from '../src/config/Store'

const flushPromises = () => new Promise(setImmediate);

Enzyme.configure({ adapter: new Adapter() })

function setup() {
    const props = {
        openModal: jest.fn(),
        deleteUser: jest.fn(),
        store: Store,
        popupState: false,
        dataStore: JsonConstant.AddressHomeData.data
    }
    const enzymeWrapper = shallow(<AddressBookDashboard {...props} />)
    return {
        props,
        enzymeWrapper
    }
}
describe('components', () => {
    describe('AddressBookDashboard', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup()
            enzymeWrapper.update();
            expect(enzymeWrapper.state().initialData).toEqual(JsonConstant.AddressHomeData.data)
            expect(enzymeWrapper.state().processedData).toEqual([]);
        })
        it("Handle sort", async () => {
            const { enzymeWrapper } = setup()
            //enzymeWrapper.find('[name="search"]').value = "ase";
            enzymeWrapper.find('.sort-icons').first().simulate('click', { currentTarget: { dataset: { name: 'firstName' } } })
            //enzymeWrapper.instance().handleChange();
            await flushPromises();
            enzymeWrapper.update();
            expect(enzymeWrapper.state().sortOrder).toEqual("descending");
            expect(enzymeWrapper.state().sortBy).toEqual("firstName");
        });
        it("Get Sorted Data", async () => {
            const { enzymeWrapper } = setup()
            enzymeWrapper.instance().getSortData(JsonConstant.AddressHomeData.data);
            await flushPromises();
            enzymeWrapper.update();
            expect(enzymeWrapper.state().processedData).toEqual(JsonConstant.AddressBookSortedData.data);
        });
    })
})
