/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Book from '../models/book';
import { Op, OrderItem, Sequelize } from 'sequelize';
import { BookPostBody, FilterQueryParam } from '../types/book/book.query.types';
import User from '../models/user';
import BookSubjects from '../models/bookSubjects';
import Subject from '../models/subject';
import { BookModel } from '../types/book/book.model.types';

const getBookById = async (bookId: number) => {
  const response = await Book.findOne({ where: { BookId: bookId } });
  return response;
};

const getBooks = async (query: FilterQueryParam) => {
  console.log('Received query parameters:', query);

  const searchConditions = [];
  if (query.searchQuery) {
    searchConditions.push({
      [Op.or]: [
        { title: { [Op.iLike]: `%${query.searchQuery}%` } },
        { author: { [Op.iLike]: `%${query.searchQuery}%` } },
        { grade: { [Op.iLike]: `%${query.searchQuery}%` } },
        { status: { [Op.iLike]: `%${query.searchQuery}%` } },
        { '$BookSubjects->Subject.Name$': { [Op.iLike]: `%${query.searchQuery}%` } },
        { '$User.Name$': { [Op.iLike]: `%${query.searchQuery}%` } },
      ],
    });
  }

  const orderOptions = {
    newestFirst: [['CreatedAt', 'DESC']],
    oldestFirst: [['CreatedAt', 'ASC']],
    recentlyModified: [['UpdatedAt', 'DESC']],
    oldestModified: [['UpdatedAt', 'ASC']],
    titleAtoZ: [['title', 'ASC']],
    titleZtoA: [['title', 'DESC']],
  };

  const sortByOptions = ['newestFirst', 'oldestFirst', 'recentlyModified', 'oldestModified', 'titleAtoZ', 'titleZtoA'];

  const { sortBy } = query;
  const order = sortBy && sortByOptions.includes(sortBy) ? orderOptions[sortBy] : [['CreatedAt', 'DESC']];

  const gradeCondition = query.grade ? { grade: query.grade } : {};
  const statusCondition = query.status ? { status: query.status } : {};
  const authorCondition = query.author ? { author: query.author } : {};
  let subjectNamesCondition = {};

  if (query.subjectNames && query.subjectNames.length > 0) {
    subjectNamesCondition = { Name: { [Op.in]: query.subjectNames.split(',') } };
  }

  const dbData = await Book.findAll({
    attributes: [
      'BookId',
      'title',
      'author',
      'CreatedAt',
      'grade',
      'status',
      [Sequelize.literal('STRING_AGG("BookSubjects->Subject"."Name", \', \')'), 'subjectNames'],
      [Sequelize.literal('"User"."Name"'), 'userName'],
    ],
    include: [
      {
        model: BookSubjects,
        attributes: [],
        include: [
          {
            model: Subject,
            attributes: [],
            where: subjectNamesCondition,
          },
        ],
      },
      {
        model: User,
        attributes: [],
        on: Sequelize.literal('"Book"."CreatedBy" = "User"."DBUserId"'),
      },
    ],
    where: {
      ...gradeCondition,
      ...statusCondition,
      ...authorCondition,
      [Op.and]: [
        ...searchConditions,
        Sequelize.literal('"Book"."BookId" = "BookSubjects"."BookId"'),
      ],
    },
    group: ['"Book"."BookId"', '"User"."DBUserId"'],
    order: order as OrderItem[],

  });
  const totalBooks = dbData.length;
  console.log("Total books", totalBooks);

  return { dbData, totalBooks };
};

const getAllAuthors = async () => {
  try {
    const authors = await Book.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('Author')), 'Author',],
      ]
    });
    return authors;
  } catch (error) {
    console.error('Error fetching authors:', error);
    return null;
  }
};


const getBooksByPage = async (query: FilterQueryParam, offset: number, pageSize: number): Promise<BookModel[]> => {
  const { dbData } = await getBooks(query);
  const paginatedData = dbData.slice(offset, offset + pageSize);
  return paginatedData
};

const createBook = async (body: BookPostBody) => {
  try {
    return await Book.create({
      ...body,
      createdBy: body.user,
      updatedBy: body.user
    });
  }
  catch (err) {
    return null
  }
};

const updateBook = async (bookId: number, body: BookPostBody) => {
  console.log('update body', body)
  try {
    const book = Book.findByPk(bookId);
    if (!book) {
      return null
    }
    const updatedBook = await Book.update({
      ...body,
      updatedBy: body.user
    },
      { where: { BookId: bookId }, returning: true })
    return updatedBook[1];
  }

  catch (err) {
    return null
  }
};


export default {
  getBookById,
  getBooks,
  createBook,
  updateBook,
  getBooksByPage,
  getAllAuthors
};
