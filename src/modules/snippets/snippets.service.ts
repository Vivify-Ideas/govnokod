import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Snippet } from './snippet.entity';
import { User } from 'modules/user';

@Injectable()
export class SnippetsService {

  constructor(
    @InjectRepository(Snippet)
    private snippetsRepository: Repository<Snippet>,
  ) {}

  getSnippets() {
    return this.snippetsRepository.find();
  }

  getSnippet(id: number) {
    return this.snippetsRepository.findOne(id);
  }

  addSnippet(content: string, author: User) {
    const snippet = this.snippetsRepository.create({
      content,
      author,
    });
    return this.snippetsRepository.save(snippet);
  }
}