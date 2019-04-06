import {
  Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne,
} from 'typeorm';
import { User } from 'modules/user';
import { Language } from 'graphql.schema';

@Entity()
export class Snippet {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'language', type: 'varchar' })
  language: Language;

  @ManyToOne(type => User, author => author.snippets)
  @JoinColumn({name: 'authorId', referencedColumnName: 'id'})
  author: User;

}