import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UsersService } from './../user';

@Resolver('Auth')
export class AuthResolver {

  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Query()
  getProfile(obj, args, context) {
    return context.user;
  }

  @Mutation()
  async login(obj, args) {
    const user = await this.authService.validateUser(args.data);
    return await this.authService.createToken(user);
  }

  @Mutation()
  async register(obj, args) {
    const user = await this.userService.create(args.data);
    return await this.authService.createToken(user);
  }
}