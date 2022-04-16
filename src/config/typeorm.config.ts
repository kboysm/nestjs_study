import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('DATABASE_HOST'),
    port: Number(configService.get('DATABASE_PORT')),
    username: configService.get('DATABASE_USERNAME'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
  }),
  inject: [ConfigService],
};
