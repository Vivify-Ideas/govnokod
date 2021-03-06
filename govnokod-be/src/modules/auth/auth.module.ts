import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from './../config';
import { UserModule } from './../user';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [
        ConfigModule,
      ],
      useFactory: async (configService: ConfigService) => {
        return {
          secretOrPrivateKey: configService.get('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: Number(configService.get('JWT_EXPIRATION_TIME')),
          },
        };
      },
      inject: [
        ConfigService,
      ],
    }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
  ],
  exports: [
    AuthService,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class AuthModule { }
