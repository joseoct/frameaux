import { Role, User } from '@prisma/client';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<(User & { role: Role }) | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAllContentCreatorsPaginated(page: number): Promise<User[]>;
  findTotalNumberContentCreators(): Promise<number>;
  findTotalNumberStudents(): Promise<number>;
  create(userData: ICreateUserDTO): Promise<User>;
  update(userData: User): Promise<User>;
}
