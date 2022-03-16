import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import { PrismaClient, User } from '@prisma/client';

class UsersRepository implements IUsersRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async findTotalNumberStudents(): Promise<number> {
    const total = await this.prisma.user.count({
      where: {
        role: {
          name: 'student',
        },
      },
    });

    return total;
  }

  public async findTotalNumberContentCreators(): Promise<number> {
    const total = await this.prisma.user.count({
      where: {
        role: {
          name: 'content_creator',
        },
      },
    });

    return total;
  }

  public async findAllContentCreatorsPaginated(page: number): Promise<User[]> {
    const users = (await this.prisma.user.findMany({
      skip: (page - 1) * 10,
      take: 10,
      where: {
        role: {
          name: 'content_creator',
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    })) as User[];

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.prisma.user.create({ data: userData });

    return user;
  }

  public async update(userData: User): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: userData.id },
      data: userData,
    });

    return user;
  }
}

export default UsersRepository;
