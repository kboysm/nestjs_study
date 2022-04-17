import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatResolver } from './cats.resolver';

@Module({
  providers: [CatResolver, CatsService],
})
export class CatModule {}
