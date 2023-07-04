/* eslint-disable @typescript-eslint/indent */
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Post } from './Post';
import { hash } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;
  
  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 12);
  }

  @Column({ unique: true })
  email!: string;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];

  @CreateDateColumn()
  createdAt!: Date;
  
  @UpdateDateColumn()
  updatedAt!: Date;

}