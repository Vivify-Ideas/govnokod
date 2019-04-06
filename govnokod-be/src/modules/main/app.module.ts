import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from './../config';
import { AuthModule, AuthService } from './../auth';
import { SnippetsModule } from './../snippets/snippets.module';
import { countBy, startsWith } from 'lodash';

const EXCLUDED_AUTH_MUTATIONS = [
  'login',
  'register',
];

const shouldCheckAuth = (req) => {
  const data = (req.body.query || '');
  const excludedFound = countBy(EXCLUDED_AUTH_MUTATIONS,
    (excluded) => data.includes(excluded));
  return !excludedFound.true && startsWith(data, 'mutation');
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USERNAME'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DATABASE'),
          entities: [__dirname + './../**/**.entity{.ts,.js}'],
          synchronize: configService.get('APPLICATION_ENV') === 'dev',
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    GraphQLModule.forRootAsync({
      imports: [AuthModule],
      inject: [AuthService],
      useFactory: (authService: AuthService) => {
        return {
          typePaths: ['./**/*.graphql'],
          context: async ({ req }) => {
            const user = await authService.getUserByJwt(req.headers.authorization);
            if (!user && shouldCheckAuth(req)) {
              throw new AuthenticationError('Please login!');
            }

            return {
              user,
            };
          },
        };
      },
    }),
    ConfigModule,
    AuthModule,
    SnippetsModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
