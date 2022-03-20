import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { prisma } from '@shared/infra/database/prisma';

import { User, Prisma } from '@prisma/client';

export type UserWithRoleName = Prisma.UserGetPayload<{
  include: {
    role: {
      select: {
        name: true;
      };
    };
  };
}>;

class UsersRepository implements IUsersRepository {
  public async findTotalNumberStudents(): Promise<number> {
    const total = await prisma.user.count({
      where: {
        role: {
          name: 'student',
        },
      },
    });

    return total;
  }

  public async findTotalNumberContentCreators(): Promise<number> {
    const total = await prisma.user.count({
      where: {
        role: {
          name: 'content_creator',
        },
      },
    });

    return total;
  }

  public async findAllContentCreatorsPaginated(page: number): Promise<User[]> {
    const users = (await prisma.user.findMany({
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
        UserTechnology: {
          select: {
            technology: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    })) as [];

    return users;
  }

  public async findById(id: string): Promise<UserWithRoleName | undefined> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    return user;
  }

  public async findByEmail(
    email: string,
  ): Promise<UserWithRoleName | undefined> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = prisma.user.create({ data: userData });

    return user;
  }

  public async update(userData: User): Promise<User> {
    const user = await prisma.user.update({
      where: { id: userData.id },
      data: userData,
    });

    return user;
  }
}

export default UsersRepository;
