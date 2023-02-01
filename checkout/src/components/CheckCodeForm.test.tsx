import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CheckCodeForm from './CheckCodeForm';
import i18n from '@/lib/i18n-test';
import { I18nextProvider } from 'react-i18next';

configure({ adapter: new Adapter() });

describe('CheckCodeForm container', () => {
  it('prevent duplicate checkCode request', async () => {
    const submitFn = jest.fn();
    let wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <CheckCodeForm
          phoneNumber={{
            code: '+971',
            phoneNumber: '555333111',
          }}
          language="en"
          predefinedCode={''}
          submitFn={submitFn}
          isSubmitting={false}
          errorMessage=""
          retryAfter={-1}
          resendFn={() => {}}
          isResending={false}
          resendError={''}
          resendRetryAfter={-1}
        />
      </I18nextProvider>
    );

    await new Promise(resolve => setTimeout(resolve, 0));

    const lastCodeInput = wrapper.find('.code').first();
    lastCodeInput.simulate('click');

    const input = wrapper.find('input[type="text"]');
    input.simulate('keydown', { key: '5' });
    input.simulate('keydown', { key: '5' });
    input.simulate('keydown', { key: '5' });
    input.simulate('keydown', { key: '5' });

    expect(submitFn).toBeCalledTimes(1);
  });
});
