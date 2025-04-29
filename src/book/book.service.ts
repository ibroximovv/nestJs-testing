import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService){}
  async create(createBookDto: CreateBookDto) {
    return await this.prisma.book.create({ data: createBookDto })
  }

  async findAll() {
    return await this.prisma.book.findMany()
  }

  async findOne(id: number) {
    return await this.prisma.book.findFirst({ where: { id }})
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.prisma.book.update({ where: { id }, data: updateBookDto })
  }

  async remove(id: number) {
    return await this.prisma.book.delete({ where: { id }})
  }

  async findByAuthorId(id: number) {
    return await this.prisma.book.findFirst({ where: { authorId: id }})
  }
}
