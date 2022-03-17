import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import contentCreatorRouter from '@modules/users/infra/http/routes/contentCreator.routes';
import studentsRouter from '@modules/users/infra/http/routes/students.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import rolesRouter from '@modules/roles/infra/http/routes/roles.routes';
import tecnologiesRouter from '@modules/tecnologies/infra/http/routes/tecnologies.routes';
import studentsTecnologiesRouter from '@modules/users_tecnologies/infra/http/routes/studentsTecnologies.routes';
import contentCreatorsTecnologiesRouter from '@modules/users_tecnologies/infra/http/routes/contentCreatorsTecnologies.routes';
import dashboardsRouter from '@modules/dashboard/infra/http/routes/dashboards.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);

routes.use('/content-creators', contentCreatorRouter);

routes.use('/students', studentsRouter);

routes.use('/roles', rolesRouter);

routes.use('/tecnologies', tecnologiesRouter);

routes.use('/students-tecnologies', studentsTecnologiesRouter);

routes.use('/content-creators-tecnologies', contentCreatorsTecnologiesRouter);

routes.use('/dashboard', dashboardsRouter);

export default routes;
