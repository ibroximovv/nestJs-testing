import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { PrismaService } from './../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('BookService', () => {
  let service: BookService;
  let prisma

  beforeEach(async () => {
    const mockPrismaService = {
      book: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      }
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService,
        {
          provide: PrismaService,
          useValue: mockPrismaService
        }
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    prisma = module.get<PrismaService>(PrismaService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create book', async() => {
    const dto: CreateBookDto = { name: 'sadasda', year: 1900, authorId: 1 }

    const createdBook = { id: 1, ...dto };
    prisma.book.create.mockResolvedValue(createdBook);
    expect(await service.create(dto)).toEqual(createdBook)
    expect(prisma.book.create).toHaveBeenCalledWith({ data: dto })
  });

  it('should be findMany book', async() => {
    const findManyBook = [{ id: 1, name: 'A', year: 1900, authorId: 1 }, {id: 2, name: 'B', year: 1970, authorId: 1 }]
    prisma.book.findMany.mockResolvedValue(findManyBook);
    expect(await service.findAll()).toEqual(findManyBook)
    expect(prisma.book.findMany).toHaveBeenCalled()
  })

  it('should be findOne book', async() => {
    const findOneBook = { id: 1, name: 'asadasd', year: 1900, authorId: 1 }
    prisma.book.findFirst.mockResolvedValue(findOneBook);
    expect(await service.findOne(1)).toEqual(findOneBook);
    expect(prisma.book.findFirst).toHaveBeenCalledWith({ where: { id: 1 }})
  })

  it('should be update book', async() => {
    const dto: UpdateBookDto = { name: 'sdfcvghbjasjhabsd' }
    const updatedBook = {id: 1, ...dto }
    
    prisma.book.update.mockResolvedValue(updatedBook)
    expect(await service.update(1, dto)).toEqual(updatedBook)
    expect(prisma.book.update).toHaveBeenCalledWith({ where: { id: 1 }, data: dto})
  })

  it('should be delete book', async() => {
    const deletedBook = { id: 1, name: 'asdasda' }
    
    prisma.book.delete.mockResolvedValue(deletedBook)
    expect(await service.remove(1)).toEqual(deletedBook)
    expect(prisma.book.delete).toHaveBeenCalledWith({ where: { id: 1 }})
  })

  it('should be findByAuthorId book', async() => {
    const findByAuthorId = { id: 1, name: 'asdsa', year: 1900, authorId: 2 }
    prisma.book.findFirst.mockResolvedValue(findByAuthorId)
    expect(await service.findByAuthorId(2)).toEqual(findByAuthorId)
    expect(prisma.book.findFirst).toHaveBeenCalledWith({ where: { authorId: 2}})
  })
});
