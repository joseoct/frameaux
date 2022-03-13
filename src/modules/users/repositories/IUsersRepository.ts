import { User } from '@prisma/client';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(userData: ICreateUserDTO): Promise<User>;
  update(userData: User): Promise<User>;
}
