import { container } from 'tsyringe';

import './providers/StorageProvider';
import '@modules/users/providers';

// import IUsersRepository from '@modules/users/repositories/IUsersRepository';
// import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
// import RolesRepository from '@modules/roles/infra/typeorm/repositories/RolesRepository';

import ITecnologiesRepository from '@modules/tecnologies/repositories/ITecnologiesRepository';
import TecnologiesRepository from '@modules/tecnologies/infra/prisma/repositories/TecnologiesRepository';

// container.registerSingleton<IUsersRepository>(
//   'UsersRepository',
//   UsersRepository,
// );

// container.registerSingleton<IRolesRepository>(
//   'RolesRepository',
//   RolesRepository,
// );

container.registerSingleton<ITecnologiesRepository>(
  'TecnologiesRepository',
  TecnologiesRepository,
);
