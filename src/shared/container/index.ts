import { container } from 'tsyringe';

import './providers/StorageProvider';
import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';

import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import RolesRepository from '@modules/roles/infra/prisma/repositories/RolesRepository';

import ITecnologiesRepository from '@modules/tecnologies/repositories/ITecnologiesRepository';
import TecnologiesRepository from '@modules/tecnologies/infra/prisma/repositories/TecnologiesRepository';

import IUsersTecnologiesRepository from '@modules/users_tecnologies/repositories/IUsersTecnologiesRepository';
import UsersTecnologiesRepository from '@modules/users_tecnologies/infra/prisma/repositories/UsersTecnologiesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);

container.registerSingleton<ITecnologiesRepository>(
  'TecnologiesRepository',
  TecnologiesRepository,
);

container.registerSingleton<IUsersTecnologiesRepository>(
  'UsersTecnologiesRepository',
  UsersTecnologiesRepository,
);
