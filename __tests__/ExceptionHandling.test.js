import React from 'react';
import { shallow, mount } from 'enzyme';
import Exception from '../src/components/Global/Exception/ExceptionHandling';

it('Initiated componentDidMount Lifecycle in Exception Component', () => {
    jest.spyOn(Exception.prototype, 'componentDidMount')
    shallow(<Exception />);
    expect(Exception.prototype.componentDidMount.mock.calls.length).toBe(1)
});

it("Invoke Exception with all valid props", () => {
    const wrapper = shallow(<Exception message="Uncaught exception occurred" />);
    wrapper.update();
    expect(wrapper.state().errorMessage).toEqual("Uncaught exception occurred");
});

it("Invoke Exception without props", () => {
    const wrapper = shallow(<Exception />);
    wrapper.update();
    expect(wrapper.state().errorMessage).toEqual("Unknown error occured");
});