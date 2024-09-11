/* eslint-disable no-useless-escape */
import { cloneDeep } from 'lodash';
import { commonSchema } from './common.schema';
import { BookStatus, Difficulty, Grade } from '../types/book/book.model.types';

const bookSchema = cloneDeep(commonSchema);

const bookBodyBase = {
  title: { type: 'string' },
  grade: { type: 'string', enum: Object.values(Grade) },
  difficulty: { type: 'string', enum: Object.values(Difficulty) },
  author: { type: 'string' },
  status: { type: 'string', enum: Object.values(BookStatus) },
}

const bookBody = {
  BookId: { type: 'integer' },
  ...bookBodyBase,
  createdBy: { type: 'integer' },
  updatedBy: { type: 'integer' },
  CreatedAt: { type: 'string' },
  UpdatedAt: { type: 'string' }
}

const bookQueryBody = {
  ...bookBodyBase,
  createdBy: { type: 'integer' },
  updatedBy: { type: 'integer' },
  createdByFrom: { type: 'integer' },
  createdByTo: { type: 'integer' }
}

const booksResponseItem = {
  title: { type: 'string' },
  userName: { type: 'string' },
  author: { type: 'string' },
  grade: { type: 'string', enum: Object.values(Grade) },
  status: { type: 'string', enum: Object.values(BookStatus) },
  subjectNames: { type: 'string' },
  CreatedAt: { type: 'string' },

};

const bookPostBody = {
  ...bookBodyBase,
  user: { type: 'integer' }
}

const bookBaseRequired = ['title', 'grade', 'difficulty', 'author', 'status']

const bookGetRequired = ['BookId', ...bookBaseRequired, 'createdBy', 'updatedBy', 'CreatedAt', 'UpdatedAt']

const bookPostRequired = [...bookBaseRequired, 'user']

const booksGetRequired = ['title', 'userName', 'author', 'grade', 'status', 'subjectNames', 'CreatedAt',]


bookSchema.response[200] = {
  type: 'object',
  properties: bookBody,
  required: bookGetRequired
}

bookSchema.params = {
  type: 'object',
  properties: {
    bookId: { type: 'string' },
  },
  required: ['bookId'],
};

const booksSchema = cloneDeep(commonSchema);

// booksSchema.response[200] = {
//   type: 'array',
//   items: {
//     type: 'object',
//     properties: booksResponseItem,
//     required: booksGetRequired,
//   },
//   totalBooks: { type: 'integer' }
// };

booksSchema.response[200] = {
  // type: 'object',
  properties: {
    books: {
      type: 'array',
      items: {
        type: 'object',
        properties: booksResponseItem,
        required: booksGetRequired,
      },
    },
    totalBooks: { type: 'integer' },
  },
};


booksSchema.querystring = {
  type: 'object',
  properties: {
    ...bookQueryBody,
    page: { type: 'integer', minimum: 1 },
    pageSize: { type: 'integer', minimum: 1 },
  },
}


const bookPostSchema = cloneDeep(commonSchema);

bookPostSchema.body = {
  type: 'object',
  properties: bookPostBody,
  required: bookPostRequired,
  additionalProperties: false
};

const bookPutSchema = cloneDeep(commonSchema);

bookPutSchema.body = {
  type: 'object',
  properties: bookPostBody,
  required: bookPostRequired,
  additionalProperties: false
};

export { bookSchema, booksSchema, bookPostSchema, bookPutSchema };
