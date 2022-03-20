import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import contentCreatorRouter from '@modules/users/infra/http/routes/contentCreator.routes';
import studentsRouter from '@modules/users/infra/http/routes/students.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import rolesRouter from '@modules/roles/infra/http/routes/roles.routes';

import technologiesRouter from '@modules/technologies/infra/http/routes/technologies.routes';
import technologiesByUserRouter from '@modules/technologies/infra/http/routes/technologiesByUser.routes';

import topicsRouter from '@modules/topics/infra/http/routes/topics.routes';

import studentsTechnologiesRouter from '@modules/users_technologies/infra/http/routes/studentsTechnologies.routes';
import contentCreatorsTechnologiesRouter from '@modules/users_technologies/infra/http/routes/contentCreatorsTechnologies.routes';

import dashboardsRouter from '@modules/dashboard/infra/http/routes/dashboards.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);

routes.use('/content-creators', contentCreatorRouter);

routes.use('/students', studentsRouter);

routes.use('/roles', rolesRouter);

routes.use('/technologies', technologiesRouter);
routes.use('/user/technologies', technologiesByUserRouter);

routes.use('/technologies', topicsRouter);

routes.use('/students-technologies', studentsTechnologiesRouter);
routes.use('/content-creators-technologies', contentCreatorsTechnologiesRouter);

routes.use('/dashboard', dashboardsRouter);

export default routes;
