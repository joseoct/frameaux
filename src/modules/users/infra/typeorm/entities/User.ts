import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import uploadConfig from '@config/upload';

import { Exclude, Expose } from 'class-transformer';

import Role from '@modules/roles/infra/typeorm/entities/Role';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @Column()
  role_id: string;

  @ManyToOne(() => Role, role => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      // case 's3':
      // return `https://s3.amazonaws.com/${uploadConfig.config.aws.bucket}/${this.avatar}`;
      default:
        return null;
    }
  }

  // Como o ID, neste momento, estamos criando de forma estática nós podemos
  // omiti-lo atraves do Omit<>.
  // constructor({ provider, date }: Omit<User, 'id'>) {
  //   this.id = uuid();
  //   this.provider = provider;
  //   this.date = date;
  // }
}

export default User;
