import type { Meta, StoryObj } from '@storybook/react';

import BookDialog from './BookDialog';


const meta = {
  title: 'Reading book club/Book dialog',
  component: BookDialog,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    modalTitle: {
      control: 'text'
    },
    children: {
      control: 'text'
    },
    setIsOpen: {
      control: 'function'
    },
    addToFavourites:{
      control: 'function'
    }

  },
} satisfies Meta<typeof BookDialog>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Open: Story = {
  args: {
    isOpen: true,
    setIsOpen: undefined,
    children: null,
    modalTitle: "I'm an open modal",
    closeButtonText: "Close",
    addToFavourites: null
  },
};