import {
  Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne,
} from 'typeorm';
import { User } from 'modules/user';

@Entity()
export class Snippet {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @ManyToOne(type => User, author => author.snippets)
  @JoinColumn({name: 'authorId', referencedColumnName: 'id'})
  author: User;

}