import type { Meta, StoryObj } from '@storybook/react';
import PopOver from './PopOver';
import { PopOverOptions } from '../utils/PopOverConfig';



// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Reading book club/PopOver',
  component: PopOver,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    options: {
      label: 'Options',
    }
  },
} satisfies Meta<typeof PopOver>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Open: Story = {
  args: {
    options: PopOverOptions
  },
};