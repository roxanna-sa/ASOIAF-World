import type { Meta, StoryObj } from '@storybook/react';

import BookDialog from './BookDialog';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Reading book club/Book dialog',
  component: BookDialog,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   isOpen: { control: boolean };
  //   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  //   children?: React.ReactNode;
  //   modalTitle?: string;
  //   closeButtonText?: string;
  //   addToFavourites?: any;
  // },
} satisfies Meta<typeof BookDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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