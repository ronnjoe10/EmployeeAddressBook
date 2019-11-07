import React from 'react';
import { shallow, mount } from 'enzyme';
import API from '../src/components/Global/API/API-Request'
import * as Constants from '../src/components/Global/Constants/Constants';
const requestParams = Constants.GetMethod('/surveys');

it('Initiated componentDidMount Lifecycle', () => {
    jest.spyOn(API.prototype, 'componentDidMount')
    shallow(<API />);
    expect(API.prototype.componentDidMount.mock.calls.length).toBe(1)
});

it("Invoke API with valid props", () => {
    const wrapper = shallow(<API request={requestParams} />);
    wrapper.update();
    expect(wrapper.state().error).toBe(false);
});
it("Invoke API without URL", () => {
    requestParams.url = "";
    const wrapper = shallow(<API request={requestParams} />);
    wrapper.update();
    expect(wrapper.state().error).toBe(true);
});