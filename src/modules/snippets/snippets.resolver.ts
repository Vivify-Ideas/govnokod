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
  getSnippet(id) {
    return this.snippetsService.getSnippet(id);
  }

  @Mutation()
  addSnippet(obj, args, context) {
    return this.snippetsService.addSnippet(
      args.snippet.content,
      args.snippet.authorId,
    );
  }
}