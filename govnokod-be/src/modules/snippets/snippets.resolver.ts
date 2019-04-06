import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { SnippetsService } from './snippets.service';

@Resolver('Snippets')
export class SnippetsResolver {

  constructor(
    private snippetsService: SnippetsService,
  ) {}

  @Query()
  getSnippets() {
    return this.snippetsService.getSnippets();
  }

  @Query()
  getSnippet(obj, args) {
    return this.snippetsService.getSnippet(args.id);
  }

  @Query()
  getRandomSnippet(obj, args) {
    return this.snippetsService.getRandomSnippet(args.exclude);
  }

  @Mutation()
  addSnippet(obj, args, context) {
    return this.snippetsService.addSnippet(
      args.snippet.content,
      args.snippet.language,
      context.user,
    );
  }
}