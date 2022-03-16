import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import rolesRouter from '@modules/roles/infra/http/routes/roles.routes';
import tecnologiesRouter from '@modules/tecnologies/infra/http/routes/tecnologies.routes';
import usersTecnologiesRouter from '@modules/users_tecnologies/infra/http/routes/usersTecnologies.routes';
import dashboardsRouter from '@modules/dashboard/infra/http/routes/dashboards.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);

routes.use('/roles', rolesRouter);

routes.use('/tecnologies', tecnologiesRouter);

routes.use('/users-tecnologies', usersTecnologiesRouter);

routes.use('/dashboard', dashboardsRouter);

export default routes;
