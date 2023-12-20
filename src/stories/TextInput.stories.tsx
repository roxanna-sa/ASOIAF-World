import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const meta = {
  title: 'Reading book club/Text Input',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    name: { control: 'text' },
    autoComplete: {
      options: ['on', 'off'],
      control: { type: 'select' },
    },
    className: { control: 'text' },
    onBlur: { control: 'function' },
    onChange: { control: 'function' },
    placeHolder: { control: 'text' },
    type: { control: 'text' },
    value: { control: 'text' },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Normal: Story = {
  args: {
    id: 'test',
    name: 'test',
    autoComplete: 'off',
    className: 'bg-blue-500',
    onBlur: null,
    onChange: null,
    placeHolder: 'placeholder',
    type: 'text',
    value: ''
  },
};