import type { Meta, StoryObj } from '@storybook/react';
import { ReactTable } from './ReactTable';

const meta = {
  title: 'Reading book club/React table',
  component: ReactTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ReactTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadedData: Story = {
  args: {
    data: [
      {
        "url": "https://www.anapioficeandfire.com/api/books/1",
        "name": "A Game of Thrones",
        "isbn": "978-0553103540",
        "authors": [
          "George R. R. Martin"
        ],
        "numberOfPages": 694,
        "publisher": "Bantam Books",
        "country": "United States",
        "mediaType": "Hardcover",
        "released": "1996-08-01T00:00:00",
        "characters": [
          "https://www.anapioficeandfire.com/api/characters/2",
          "https://www.anapioficeandfire.com/api/characters/12"
        ],
        "povCharacters": [
          "https://www.anapioficeandfire.com/api/characters/148",
          "https://www.anapioficeandfire.com/api/characters/208"
        ]
      },
      {
        "url": "https://www.anapioficeandfire.com/api/books/2",
        "name": "A Clash of Kings",
        "isbn": "978-0553108033",
        "authors": [
          "George R. R. Martin"
        ],
        "numberOfPages": 768,
        "publisher": "Bantam Books",
        "country": "United States",
        "mediaType": "Hardback",
        "released": "1999-02-02T00:00:00",
        "characters": [
          "https://www.anapioficeandfire.com/api/characters/2",
          "https://www.anapioficeandfire.com/api/characters/12"
        ],
        "povCharacters": [
          "https://www.anapioficeandfire.com/api/characters/148",
          "https://www.anapioficeandfire.com/api/characters/208"
        ]
      }
    ],
    columns: [
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Authors",
        accessor: "authors"
      },
      {
        Header: "isbn",
        accessor: "isbn"
      },
      {
        Header: "Number of pages",
        accessor: "numberOfPages"
      },
      {
        Header: "Publisher",
        accessor: "publisher"
      },
      {
        Header: "Country",
        accessor: "country"
      },
      {
        Header: "Media Type",
        accessor: "mediaType"
      },
      {
        Header: "Released",
        accessor: Date
      }
    ],
    globalSearch: true
  }
};
