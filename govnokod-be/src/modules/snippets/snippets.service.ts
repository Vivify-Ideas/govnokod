import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Snippet } from './snippet.entity';
import { User } from './../user';
import { Language } from './../../graphql.schema';

@Injectable()
export class SnippetsService {

  constructor(
    @InjectRepository(Snippet)
    private snippetsRepository: Repository<Snippet>,
  ) {}

  getSnippets() {
    return this.snippetsRepository.find({
      relations: ['author'],
    });
  }

  getSnippet(id: number) {
    return this.snippetsRepository.findOne(id, { relations: ['author'] });
  }

  getRandomSnippet(id = null) {
    return this.snippetsRepository
      .createQueryBuilder()
      .where(() => {
        if (!id) return '';
        return `id <> ${id}`;
      })
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();
  }

  addSnippet(content: string, language: Language, author: User) {
    const snippet = this.snippetsRepository.create({
      content,
      language,
      author,
    });
    return this.snippetsRepository.save(snippet);
  }
}