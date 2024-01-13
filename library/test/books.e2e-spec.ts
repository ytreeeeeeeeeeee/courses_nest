import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

import { BooksModule } from '../src/books/books.module';
import { BooksService } from '../src/books/books.service';
import { Book } from '../src/books/schemas/book.schema';
import { createBookDtoStub } from './stubs/create-book.dto.stub';
import { updateBookDtoStub } from './stubs/update-book.dto.stub';

describe('Books (e2e)', () => {
  let app: INestApplication;
  const booksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BooksModule],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .overrideProvider(getModelToken(Book.name))
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET books', () => {
    booksService.findAll.mockReturnValueOnce([]);
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual([]);
      });
  });

  it('/POST books', () => {
    const newBook = createBookDtoStub;
    booksService.create.mockReturnValueOnce({ _id: '1', ...newBook });
    return request(app.getHttpServer())
      .post('/books')
      .send(newBook)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({ _id: '1', ...newBook });
      });
  });

  it('/PUT books/:id', () => {
    const updatedBook = updateBookDtoStub;
    booksService.update.mockReturnValueOnce({ _id: '1', ...updatedBook });
    return request(app.getHttpServer())
      .put('/books/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ _id: '1', ...updatedBook });
      });
  });

  it('/DELETE books/:id', () => {
    booksService.delete.mockReturnValueOnce({ _id: '1' });
    return request(app.getHttpServer())
      .delete('/books/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ _id: '1' });
      });
  });
});
