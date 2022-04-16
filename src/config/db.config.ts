// import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './typeorm.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// export default TypeOrmModule.forRoot({
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: '1234',
//   database: 'test',
//   entities: [`${__dirname}/../*/entities/*.{js,ts}`],
//   synchronize: true,
// });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
  ],
})
export class DbConfigModule {}
