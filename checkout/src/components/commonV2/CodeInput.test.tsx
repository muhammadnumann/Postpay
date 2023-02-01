import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';

configure({ adapter: new Adapter() });
import CodeInput from './CodeInput';

describe('CodeInput', () => {
  it('should be amounted properly', () => {
    const wrapper = mount(
      <CodeInput
        format="55-555-5555"
        onComplete={() => {}}
        predefinedCode="555555555"
      />
    );
    const inputNode = wrapper
      .getDOMNode()
      .querySelector('input[type="text"]') as HTMLInputElement;
    expect(inputNode).not.toBeNull();
    expect(inputNode.value).toBe('555555555');
  });

  it('should change value when typing', async () => {
    let text = '';
    const onChange = (_text: string) => (text = _text);
    const onComplete = jest.fn();
    const wrapper = mount(
      <CodeInput
        format="55-555-5555"
        onComplete={onComplete}
        onChange={onChange}
        predefinedCode=""
      />
    );

    const lastCodeInput = wrapper.find('.code').first();
    lastCodeInput.simulate('click');

    const input = wrapper.find('input[type="text"]');
    input.simulate('click');

    await new Promise(resolve => setTimeout(resolve, 0));

    input.simulate('keydown', { key: '5' });
    input.simulate('keydown', { key: '5' });
    input.simulate('keydown', { key: '5' });
    input.simulate('keydown', { key: '4' });
    input.simulate('keydown', { key: '4' });
    input.simulate('keydown', { key: '4' });
    input.simulate('keydown', { key: '3' });
    input.simulate('keydown', { key: '3' });
    input.simulate('keydown', { key: 'Backspace' });
    input.simulate('keydown', { key: 'Backspace' });

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(text).toEqual('555444');

    input.simulate('keydown', { key: '1' });
    input.simulate('keydown', { key: '1' });
    input.simulate('keydown', { key: '1' });

    expect(text).toEqual('555444111');
    expect(onComplete).toBeCalled();
  });

  it('always focus on the first input when click', async () => {
    const wrapper = mount(
      <CodeInput
        format="55-555-5555"
        onComplete={() => {}}
        onChange={() => {}}
        predefinedCode="555444333"
        className="code-input"
      />
    );

    const input = wrapper.find('input[type="text"]');
    act(() => {
      input.simulate('focus');
      wrapper
        .find('.code-input')
        .first()
        .simulate('click');
    });
    wrapper.update();
    const firstCodeInput = wrapper.find('.code').first();
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(firstCodeInput.hasClass('active')).toBeTruthy();
  });
});
