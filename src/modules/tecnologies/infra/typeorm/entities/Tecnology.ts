import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tecnologies')
class Tecnologies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // YOUR ATRIBUTES e.g.
  // @Column()
  // name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tecnologies;
