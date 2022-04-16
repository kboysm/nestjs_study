import { ApolloDriver } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { GqlModuleAsyncOptions } from '@nestjs/graphql';
import { join } from 'path';

export const graphQLConfigAsync: GqlModuleAsyncOptions = {
  driver: ApolloDriver,
  useFactory: async (configService: ConfigService) => ({
    typePaths: [configService.get('GRAPHQL_TYPE_PATH')],
    definitions: {
      path: join(process.cwd(), 'src/graphql.ts'),
    },
    context: ({ req, res }) => ({ req, res }),
    cors: {
      origin: ['https://studio.apollographql.com', 'http://localhost:3000'],
      credentials: true,
    },
  }),
  inject: [ConfigService],
};
