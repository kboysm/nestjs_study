import { Injectable } from '@nestjs/common';
import { Cat } from './cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    {
      id: 1,
      name: 'limsm',
      age: 25,
      breed: 'breed',
    },
  ];

  create(cat: Cat) {
    this.cats.push(cat);
    return this.cats;
  }

  findOne(id: number): Cat {
    const findedCat = this.cats.find((item) => item.id === id);
    return findedCat;
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
