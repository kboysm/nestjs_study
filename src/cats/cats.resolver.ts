import { Args, Query, Resolver } from '@nestjs/graphql';

import { CatsService } from './cats.service';

@Resolver('Cat')
export class CatResolver {
  constructor(private catsService: CatsService) {}

  @Query()
  async cat(@Args('id') id: number) {
    return this.catsService.findOne(id);
  }

  @Query()
  async cats() {
    return this.catsService.findAll();
  }
}
