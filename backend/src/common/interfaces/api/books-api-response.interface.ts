interface IDescription {
  volumeInfo?: { description?: string };
  description?: string;
}

interface BooksApiResponse {
  items: IDescription[];
}

export type { BooksApiResponse };
