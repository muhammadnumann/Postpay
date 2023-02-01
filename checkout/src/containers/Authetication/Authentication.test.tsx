import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';

import { CheckoutState } from '@/constants';
import checkoutJson from '../../mocks/checkout.json';
import Authentication from './Authentication';
import { CheckoutContextProvier } from '@/contexts/Checkout';

configure({ adapter: new Adapter() });

describe('Authentication container', () => {
  it('extract and fill phone number +971 555444333', async () => {
    checkoutJson.order.billingAddress.phone = '00971 555 444 333';

    let wrapper = mount(
      <MockedProvider>
        <MemoryRouter>
          <CheckoutContextProvier
            overrideValue={{
              checkoutNode: checkoutJson,
              checkoutState: CheckoutState.SendCode,
            }}
          >
            <Authentication />
          </CheckoutContextProvier>
        </MemoryRouter>
      </MockedProvider>
    );

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(wrapper.text().includes('+971')).toBe(true);
    const inputNode = wrapper
      .getDOMNode()
      .querySelector('input[type="text"]') as HTMLInputElement;
    expect(inputNode.value).toBe('555444333');
  });

  it('extract and fill phone number 0555111111', async () => {
    checkoutJson.order.billingAddress.phone = '0555111111';

    let wrapper = mount(
      <MockedProvider>
        <MemoryRouter>
          <CheckoutContextProvier
            overrideValue={{
              checkoutNode: checkoutJson,
              checkoutState: CheckoutState.SendCode,
            }}
          >
            <Authentication />
          </CheckoutContextProvier>
        </MemoryRouter>
      </MockedProvider>
    );

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(wrapper.text().includes('+971')).toBe(true);
    const inputNode = wrapper
      .getDOMNode()
      .querySelector('input[type="text"]') as HTMLInputElement;
    expect(inputNode.value).toBe('555111111');
  });

  it('doesnt fill any phone number when phone number format is incorrect', async () => {
    checkoutJson.order.billingAddress.phone = '123456656565656';

    let wrapper = mount(
      <MockedProvider>
        <MemoryRouter>
          <CheckoutContextProvier
            overrideValue={{
              checkoutNode: checkoutJson,
              checkoutState: CheckoutState.SendCode,
            }}
          >
            <Authentication />
          </CheckoutContextProvier>
        </MemoryRouter>
      </MockedProvider>
    );

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(wrapper.text().includes('+971')).toBe(true);
    const inputNode = wrapper
      .getDOMNode()
      .querySelector('input[type="text"]') as HTMLInputElement;
    expect(inputNode.value).toBe('');
  });
});
