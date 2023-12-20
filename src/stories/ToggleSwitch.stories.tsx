import type { Meta, StoryObj } from '@storybook/react';
import ToggleSwitch from './ToggleSwitch';


const meta = {
  title: 'Reading book club/Toggle Switch',
  component: ToggleSwitch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof ToggleSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Normal: Story = {
  args: {
    text: 'Hola',
    darkMode: false,
    setDarkMode: null
  },
};