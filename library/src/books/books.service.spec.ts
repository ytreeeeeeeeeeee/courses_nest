import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';

import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book, BooksSchema } from './schemas/book.schema';
import { createBookDtoStub } from '../../test/stubs/create-book.dto.stub';
import { updateBookDtoStub } from '../../test/stubs/update-book.dto.stub';

describe('BooksService', () => {
  let service: BooksService;
  let connection: Connection;
  let mongod: MongoMemoryServer;
  let bookModel: Model<Book>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    connection = (await connect(uri)).connection;
    bookModel = connection.model(Book.name, BooksSchema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: getModelToken(Book.name),
          useValue: bookModel,
        },
        BooksService,
      ],
      exports: [BooksService],
    }).compile();

    service = await module.resolve<BooksService>(BooksService);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  });

  describe('create', () => {
    it('should create one document', async () => {
      const newBook = await service.create(createBookDtoStub);
      expect(newBook.title).toBe(createBookDtoStub.title);
    });
  });

  describe('findAll', () => {
    it('should find all books', async () => {
      await service.create(createBookDtoStub);
      const books = await service.findAll();

      expect(books).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('should update one document', async () => {
      const book = await service.create(createBookDtoStub);
      const updatedBook = await service.update(book._id, updateBookDtoStub);

      expect(updatedBook.title).toBe(updateBookDtoStub.title);
    });
  });

  describe('delete', () => {
    it('should delete created document', async () => {
      const book = await service.create(createBookDtoStub);
      const deletedBook = await service.delete(book._id);

      expect(book.title).toBe(deletedBook.title);
    });
  });
});
