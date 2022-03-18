import { container } from 'tsyringe';

import './providers/StorageProvider';
import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';

import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import RolesRepository from '@modules/roles/infra/prisma/repositories/RolesRepository';

import ITechnologiesRepository from '@modules/technologies/repositories/ITechnologiesRepository';
import TechnologiesRepository from '@modules/technologies/infra/prisma/repositories/TechnologiesRepository';

import IUsersTechnologiesRepository from '@modules/users_technologies/repositories/IUsersTechnologiesRepository';
import UsersTechnologiesRepository from '@modules/users_technologies/infra/prisma/repositories/UsersTechnologiesRepository';

import ITopicsRepository from '@modules/topics/repositories/ITopicsRepository';
import TopicsRepository from '@modules/topics/infra/prisma/repositories/TopicsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);

container.registerSingleton<ITechnologiesRepository>(
  'TechnologiesRepository',
  TechnologiesRepository,
);

container.registerSingleton<IUsersTechnologiesRepository>(
  'UsersTechnologiesRepository',
  UsersTechnologiesRepository,
);

container.registerSingleton<ITopicsRepository>(
  'TopicsRepository',
  TopicsRepository,
);
