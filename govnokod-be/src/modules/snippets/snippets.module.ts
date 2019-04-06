import { Module } from '@nestjs/common';
import { SnippetsResolver } from './snippets.resolver';
import { SnippetsService } from './snippets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snippet } from './snippet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Snippet]),
  ],
  providers: [
    SnippetsResolver,
    SnippetsService,
  ],
})
export class SnippetsModule {}