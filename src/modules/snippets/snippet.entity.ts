import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'modules/user';

@Entity()
export class Snippet {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @OneToOne(type => User)
  @JoinColumn()
  author: User;

}