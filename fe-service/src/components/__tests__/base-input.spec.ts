import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import BaseInput from '../BaseInput.vue';

describe('BaseInput.vue', () => {
  it('renders label and placeholder correctly', () => {
    const titleLabel = 'title';
    const titlePlaceholder = 'title placeholder';
    const wrapper = mount(BaseInput, {
      props: {
        label: titleLabel,
        placeholder: titlePlaceholder,
        modelValue: '',
      },
    });

    expect(wrapper.find('label').text()).toBe(titleLabel);
    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe(titlePlaceholder);
    expect(input.element.value).toBe('');
  });

  it('emits update:modelValue event when input changes', async () => {
    const titleValue = 'Awesome title';
    const wrapper = mount(BaseInput, {
      props: {
        label: 'title',
        placeholder: 'title placeholder',
        modelValue: '',
      },
    });

    const input = wrapper.find('input');
    await input.setValue(titleValue);

    const emitted = wrapper.emitted('update:modelValue');
    expect(emitted).toBeTruthy();
    expect(emitted?.[0]).toEqual([titleValue]);
  });
});
